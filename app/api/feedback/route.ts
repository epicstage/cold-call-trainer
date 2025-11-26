import { NextRequest, NextResponse } from 'next/server';
import type { FeedbackAPIRequest, FeedbackAPIResponse, FeedbackReport } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackAPIRequest = await request.json();
    const { callLog } = body;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    // Build conversation summary
    const conversationSummary = callLog.messages
      .map(msg => `${msg.role === 'user' ? '사용자' : '클라이언트'}: ${msg.content}`)
      .join('\n');

    const systemPrompt = `당신은 콜드 콜 연습 전문 코치입니다. 통화 내용을 분석하여 다음 두 가지 점수와 피드백을 제공해야 합니다:

1. **ERS (Emotional Resilience Score)**: 감정적 회복력 점수 (0-10)
   - 스트레스나 부정적 반응에 얼마나 잘 대처했는지
   - 감정 조절 능력
   - 압박 상황에서의 침착함

2. **LS (Logic/Structure Score)**: 논리/구조 점수 (0-10)
   - 대화의 논리성과 구조화된 커뮤니케이션
   - 명확한 메시지 전달
   - 목적 달성을 위한 전략적 접근

다음 형식으로 JSON 응답을 제공하세요:
{
  "ers": 숫자 (0-10, 소수점 1자리),
  "ls": 숫자 (0-10, 소수점 1자리),
  "summary": "상세한 피드백 (3-4문장)",
  "nextGoal": "다음 세션에서 집중할 목표 (1문장)"
}

통화 정보:
- 사전 감정: ${callLog.preEmotion.emotion} (부담도: ${callLog.preEmotion.intensity}/10)
- 클라이언트 유형: ${callLog.sessionConfig.clientType}
- 난이도: ${callLog.sessionConfig.difficulty}
- 통화 시간: ${Math.floor(callLog.duration / 60)}분 ${callLog.duration % 60}초

대화 내용:
${conversationSummary}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: '위 통화 내용을 분석하여 JSON 형식의 피드백을 제공하세요.',
          },
        ],
        response_format: { type: 'json_object' },
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: '피드백 생성 중 오류가 발생했습니다.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    let feedbackText = data.choices[0]?.message?.content || '{}';

    // Extract JSON from response if it's wrapped in markdown code blocks
    const jsonMatch = feedbackText.match(/```json\s*([\s\S]*?)\s*```/) || feedbackText.match(/```\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      feedbackText = jsonMatch[1];
    }

    let feedback: FeedbackReport;
    try {
      feedback = JSON.parse(feedbackText.trim());
    } catch (parseError) {
      console.error('JSON parse error:', parseError, feedbackText);
      // Fallback feedback
      feedback = {
        ers: 7.0,
        ls: 7.0,
        summary: '피드백을 파싱하는 중 오류가 발생했습니다. 통화는 잘 진행되었습니다.',
        nextGoal: '계속 연습하여 실력을 향상시키세요.',
      };
    }

    // Validate and clamp scores
    feedback.ers = Math.max(0, Math.min(10, Number(feedback.ers) || 7.0));
    feedback.ls = Math.max(0, Math.min(10, Number(feedback.ls) || 7.0));
    feedback.summary = feedback.summary || '피드백이 생성되지 않았습니다.';
    feedback.nextGoal = feedback.nextGoal || '계속 연습하세요.';

    const result: FeedbackAPIResponse = {
      report: feedback,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Feedback API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

