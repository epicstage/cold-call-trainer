# API 라우트 설정 가이드

현재 정적 export로 배포되어 API 라우트가 작동하지 않습니다.

## 해결 방법

### 방법 1: Cloudflare Pages Functions 사용 (권장)

API 라우트를 Cloudflare Pages Functions로 변환해야 합니다.

1. `functions/api/call.ts` 생성
2. `functions/api/feedback.ts` 생성
3. `functions/api/persona.ts` 생성
4. `functions/api/voice.ts` 생성

각 파일을 Next.js API 라우트에서 Cloudflare Pages Functions 형식으로 변환합니다.

### 방법 2: @cloudflare/next-on-pages 사용

Next.js 15를 Cloudflare Pages에서 실행하려면:
1. `@cloudflare/next-on-pages` 패키지 설치
2. `next.config.js` 설정 변경
3. 빌드 스크립트 수정

### 방법 3: 별도 Workers로 API 분리

API를 Cloudflare Workers로 분리하고, 프론트엔드는 Pages에서 제공

