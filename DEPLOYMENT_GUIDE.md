# Cloudflare Pages 배포 가이드

## 현재 설정

- Next.js 15 App Router
- @cloudflare/next-on-pages 사용
- API 라우트: /api/call, /api/feedback, /api/persona, /api/voice

## 빌드 방법

### 로컬 빌드 테스트

```bash
# 1. Next.js 빌드
npm run build

# 2. Cloudflare Pages 변환
npx @cloudflare/next-on-pages

# 3. 로컬에서 테스트
npm run preview:cf
```

### 통합 빌드

```bash
npm run build:cf
```

## 배포

### Cloudflare Pages 설정

1. **Build command:**
   ```
   npm run build:cf
   ```

2. **Output directory:**
   ```
   .vercel/output/static
   ```

3. **Root directory:**
   ```
   (비워두기)
   ```

### 환경변수

다음 환경변수가 Cloudflare Pages에 설정되어 있어야 합니다:
- `OPENAI_API_KEY`
- `ELEVENLABS_API_KEY`
- `ELEVENLABS_VOICE_ID`

## 로컬 개발

### 일반 개발 모드
```bash
npm run dev
```

### Cloudflare 환경과 유사하게 테스트
```bash
npm run preview:cf
```

