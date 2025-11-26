import { NextRequest, NextResponse } from 'next/server';
import type { CallAPIRequest, CallAPIResponse } from '@/types';

// Client type personalities
const CLIENT_PERSONALITIES: Record<string, string> = {
  busy_public_officer: '당신은 매우 바쁜 공공기관 담당자입니다. 시간이 없고 짜증이 나 있으며, 업무가 많아 스트레스를 받고 있습니다. 간결하고 직설적으로 응답하며, 시간을 낭비하고 싶지 않습니다.',
  cold_startup_ceo: '당신은 냉담한 스타트업 CEO입니다. 권위적이고 거만하며, 상대방의 제안에 회의적입니다. 비즈니스에 대해 냉정하게 평가하고, 약한 제안은 즉시 거절합니다.',
  defensive_manager: '당신은 방어적인 관리자입니다. 변화를 싫어하고, 새로운 제안에 대해 부정적입니다. 현재 상태를 유지하고 싶어하며, 위험을 감수하고 싶지 않습니다.',
};

const DIFFICULTY_MODIFIERS: Record<string, string> = {
  light: '상대적으로 친절하고 협조적으로 응답하세요. 약간의 관심을 보이지만 여전히 신중합니다.',
  mid: '일반적인 반응을 보이세요. 회의적이지만 완전히 거절하지는 않습니다. 중립적인 태도를 유지하세요.',
  hard: '적대적이고 회피적인 태도를 보이세요. 거절하고, 회의적이며, 불만을 표현하세요. 상대방의 말을 끊고, 짜증을 내며, 시간을 낭비하고 싶지 않다는 태도를 보이세요.',
};

export async function POST(request: NextRequest) {
  try {
    const body: CallAPIRequest = await request.json();
    const { conversationHistory, currentUserMessage, clientType, difficulty } = body;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const personality = CLIENT_PERSONALITIES[clientType] || CLIENT_PERSONALITIES.busy_public_officer;
    const difficultyModifier = DIFFICULTY_MODIFIERS[difficulty] || DIFFICULTY_MODIFIERS.mid;

    // Build conversation history for OpenAI
    const messages = [
      {
        role: 'system' as const,
        content: `${personality}\n\n${difficultyModifier}\n\n당신은 현재 전화 통화 중입니다. 사용자의 말에 자연스럽고 현실적으로 응답하세요. 응답은 1-2문장으로 간결하게 작성하세요.`,
      },
      ...conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content: currentUserMessage,
      },
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 150,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: 'AI 응답 생성 중 오류가 발생했습니다.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || '응답을 생성할 수 없습니다.';

    const result: CallAPIResponse = {
      message: aiMessage.trim(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Call API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

