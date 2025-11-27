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

    const systemPrompt = `You are a Korean cold-call performance coach. Analyze the transcript and return:

ERS (Emotional Resilience Score),
LS (Logic/Structure Score),
a short summary,
and a one-line next goal.

Base ERS on emotional stability and apology frequency.
Base LS on structure clarity and pivot strength.

Provide your response in JSON format:
{
  "ers": number (0-10, one decimal place),
  "ls": number (0-10, one decimal place),
  "summary": "detailed feedback (3-4 sentences in Korean)",
  "nextGoal": "one-line goal for next session (in Korean)"
}

Call Information:
- Client type: ${callLog.sessionConfig.clientType}
- Difficulty: ${callLog.sessionConfig.difficulty}
- Call duration: ${Math.floor(callLog.duration / 60)}min ${callLog.duration % 60}sec

Conversation transcript:
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

