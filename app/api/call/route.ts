import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { CallAPIRequest, CallAPIResponse } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body: CallAPIRequest = await req.json();
    const { userMessage, userProfile, userLevel, difficultyBand, persona } = body;

    // 필수 필드 검증
    if (!userMessage || typeof userMessage !== 'string') {
      return NextResponse.json(
        { error: 'userMessage is required and must be a string' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // 발신자 역할 정보 구성
    let callerContext = '';
    if (userProfile?.role) {
      const roleNames: Record<string, string> = {
        insurance_agent: '보험 설계사',
        freelancer_creator: '프리랜서 (디자이너/영상/개발자)',
        startup_founder: '스타트업 대표',
        b2b_sales: 'B2B 영업',
        job_seeker: '구직 중',
        other: userProfile.name || '일반인',
      };
      const roleName = roleNames[userProfile.role] || userProfile.role;
      callerContext = `발신자는 ${roleName}이고, 콜드콜을 걸고 있습니다.`;
    }

    // 난이도에 따른 고객 상태 설명
    let difficultyContext = '';
    let difficultyStyle = '';
    switch (difficultyBand) {
      case 'easy':
        difficultyContext = '당신은 비교적 여유 있고 말은 들어주지만 기본적으로 귀찮아하는 고객입니다.';
        difficultyStyle = '비교적 부드럽고 예의 있게, 유보/보류 느낌으로 응답하세요.';
        break;
      case 'normal':
        difficultyContext = '당신은 바쁘고 빨리 끊고 싶어하는 고객입니다. 대화를 최대한 짧게 유지하려 합니다.';
        difficultyStyle = '바쁘고 회피적인 느낌으로, 시간/일정 핑계를 자주 사용하세요.';
        break;
      case 'hard':
        difficultyContext = '당신은 상당히 짜증 나 있고, 아주 단호하게 끊으려 하는 고객입니다.';
        difficultyStyle = '짧고 차갑게, "필요 없다", "관심 없다", "다른 데와 한다" 등 강한 거절 표현을 사용하세요.';
        break;
      default:
        difficultyContext = '당신은 바쁘고 회피적인 한국의 일반적인 직장인/의사결정권자입니다.';
        difficultyStyle = '바쁘고 회피적인 느낌으로 응답하세요.';
    }

    // 페르소나 컨텍스트 구성
    let personaContext = '';
    let personaExcuses = '';
    if (persona) {
      personaContext = `
고객 페르소나:
- 유형: ${persona.shortLabel || '일반 고객'}
${persona.description ? `- 설명: ${persona.description}` : ''}
${persona.tone ? `- 말투: ${persona.tone}` : ''}
${persona.riskSensitivity ? `- 위험 민감도: ${persona.riskSensitivity}` : ''}
`;
      if (persona.typicalExcuses && persona.typicalExcuses.length > 0) {
        personaExcuses = `- 전형적인 회피 멘트 예시: ${persona.typicalExcuses.join(', ')}
이 회피 멘트들을 참고해서 섞어서 사용하세요. 예: "예전에 말씀드린 것처럼 지금은 예산이 없어서요." 같은 식으로 자연스럽게 변형해서 사용하세요.`;
      }
    } else {
      personaContext = '한국의 일반적인 직장인/의사결정권자처럼 행동하십시오.';
    }

    // System prompt 구성 - 다양한 반응 패턴 포함
    const systemPrompt = `당신은 콜드콜을 받은 고객의 역할을 맡고 있습니다.

${callerContext ? `${callerContext}\n` : ''}
${difficultyContext}

${personaContext}
${personaExcuses ? `\n${personaExcuses}\n` : ''}

**가능한 반응 패턴 (상황에 맞게 무작위로 선택하여 사용):**
다음 패턴 중에서 매번 다른 패턴을 골라 사용하되, 상황에 맞게 자연스럽게 응답하세요:

1. "지금은 바빠서 나중에 연락 달라고 하는 패턴"
   예: "지금은 바빠서요, 다음 주에 다시 연락 주세요"
   예: "아, 지금 시간이 없네요. 나중에 말씀해주시면 될까요?"

2. "메일 주소를 주고 메일로 보내달라고 하는 패턴"
   예: "메일로 보내주시면 검토해볼게요"
   예: "문서는 메일로 받을 수 있을까요?"

3. "이미 다른 업체와 진행 중이라고 말하는 패턴"
   예: "이미 다른 곳과 진행 중이에요"
   예: "비슷한 제안을 이미 받아서요"

4. "결정권자가 자신이 아니라고 말하며 윗사람을 핑계 대는 패턴"
   예: "그건 저보단 윗분께 말씀드려야 할 것 같아요"
   예: "제가 결정할 수 있는 사안이 아니라서요"

5. "예의 있게 완곡하게 거절하는 패턴"
   예: "좋은 제안인데 지금은 조금 어려울 것 같아요"
   예: "검토는 해볼게요만 당장은 힘들 것 같아요"

6. "약간 흥미는 있지만 일정 문제로 미루자는 패턴"
   예: "흥미로운데 지금은 일정이 좀 빡빡해서요"
   예: "나중에 여유 있을 때 다시 얘기해볼 수 있을까요?"

7. "살짝 짜증 섞인 단호한 거절 패턴 (난이도 hard에서 더 자주 사용)"
   예: "지금 필요 없어요"
   예: "관심 없습니다"
   예: "다른 곳이랑 이미 한다고 했잖아요"

**답변 스타일 규칙:**
- 항상 한국어로만 말하세요.
- 한 번에 "한 문장만" 말하세요.
- 6~20글자 정도의 짧은 구어체 문장으로 응답하세요.
- 이전에 했던 멘트와 똑같은 문장을 반복하지 말 것. 같은 의미라도 표현을 조금씩 바꿀 것.
- 자연스러운 망설임 허용: "음...", "아, 지금은 좀...", "어… 바빠서요" 등.
- AI 같은 말투 금지:
  * "첫째, 둘째", "정리하자면", "요약하면" 같은 표현 사용 금지
  * 완전한 문어체 문장 금지, 말하듯이
- 이전에 했던 자기 말/상대 말 반복 금지
- "대화 전체"를 언급하거나 요약하지 말고, 오직 방금 들은 한 줄에만 반응
- 자신이 AI라는 표현 절대 금지
- 매 턴마다 다양한 표현 사용 (똑같은 말 반복 금지)

**난이도별 스타일:**
${difficultyStyle}`;

    // User 메시지 구성
    const userPrompt = `방금 발신자가 이렇게 말했습니다(콜드콜): "${userMessage}"

위의 반응 패턴 중 하나를 골라서, 이 말에 바로 이어서 한 문장만, 짧은 한국어 구어체로 대답하세요.`;

    // OpenAI API 호출 (히스토리 없이 system + user 2개만)
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      temperature: 0.9, // 다양성 우선
      top_p: 0.9,
      max_tokens: 80,
    });

    const aiReply = response.choices[0]?.message?.content || '응답을 생성할 수 없습니다.';
    const reply = aiReply.trim();

    // 응답 형식: reply, text, message 모두 동일한 값
    const result: CallAPIResponse = {
      reply,
      text: reply,
      message: reply,
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Call API error:', error);
    return NextResponse.json(
      {
        error: '서버 오류가 발생했습니다.',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
