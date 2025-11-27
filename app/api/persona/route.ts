import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { PersonaAPIRequest, PersonaAPIResponse } from '@/types';

const ROLE_DESCRIPTIONS: Record<string, string> = {
  insurance_agent: '보험 설계사',
  freelancer_creator: '프리랜서 (디자이너/영상/개발자)',
  startup_founder: '스타트업 대표',
  b2b_sales: 'B2B 영업',
  job_seeker: '구직 중',
  other: '기타',
};

export async function POST(request: NextRequest) {
  try {
    const body: PersonaAPIRequest = await request.json();
    const { role, rawDescription } = body;

    if (!rawDescription || typeof rawDescription !== 'string') {
      return NextResponse.json(
        { error: 'rawDescription is required' },
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

    const roleDesc = ROLE_DESCRIPTIONS[role] || role;

    const systemPrompt = `당신은 콜드콜 연습을 위한 고객 페르소나 생성 전문가입니다.

사용자가 제공한 역할(role)과 고객 유형 설명(rawDescription)을 바탕으로, 현실적이고 구체적인 B2B/B2C 고객 페르소나를 한국어로 생성하세요.

반드시 다음 JSON 형식으로만 응답하세요:
{
  "shortLabel": "6-12자 고객 유형 이름",
  "description": "1-2문장 요약",
  "typicalExcuses": ["회피 멘트1", "회피 멘트2", "회피 멘트3", "회피 멘트4", "회피 멘트5"],
  "tone": "말투 설명 (예: 바쁘고 단답형, 정중하지만 냉정함)",
  "riskSensitivity": "low" | "medium" | "high"
}

중요 지침:
- shortLabel: 6-12자 이내의 간결한 라벨
- description: 이 고객의 특징을 1-2문장으로 요약
- typicalExcuses: 실제로 이 고객이 콜드콜에 반응할 때 쓰는 회피/거절 멘트 4-6개 (각각 10-30자)
- tone: 이 고객의 전화 통화 스타일 (예: "바쁘고 직설적", "정중하지만 거리감 있음", "짜증스럽고 짧게 끊음")
- riskSensitivity: 이 고객이 새로운 제안에 대해 얼마나 신중한지 ("low"=쉽게 관심, "medium"=보통, "high"=매우 신중하고 회의적)

사용자 역할: ${roleDesc}
고객 유형 설명: ${rawDescription}

이 정보를 바탕으로 현실적인 페르소나를 생성하세요.`;

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
            content: '위 정보를 바탕으로 JSON 형식의 페르소나를 생성하세요.',
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
        { error: '페르소나 생성 중 오류가 발생했습니다.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    let personaText = data.choices[0]?.message?.content || '{}';

    // Extract JSON if wrapped
    const jsonMatch = personaText.match(/```json\s*([\s\S]*?)\s*```/) || personaText.match(/```\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      personaText = jsonMatch[1];
    }

    let persona;
    try {
      persona = JSON.parse(personaText.trim());
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json(
        { error: '페르소나 파싱 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // Validate required fields
    if (!persona.shortLabel || !persona.description || !persona.typicalExcuses || !persona.tone) {
      return NextResponse.json(
        { error: '생성된 페르소나에 필수 필드가 없습니다.' },
        { status: 500 }
      );
    }

    // Ensure typicalExcuses is an array
    if (!Array.isArray(persona.typicalExcuses)) {
      persona.typicalExcuses = [persona.typicalExcuses];
    }

    // Validate riskSensitivity
    if (!['low', 'medium', 'high'].includes(persona.riskSensitivity)) {
      persona.riskSensitivity = 'medium';
    }

    const result: PersonaAPIResponse = {
      persona: persona,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Persona API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

