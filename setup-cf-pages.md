# Cloudflare Pages 설정 가이드

## 1. 프로젝트 생성 확인

프로젝트가 생성되었는지 확인:
```bash
npx wrangler pages project list
```

## 2. Dashboard에서 GitHub 연결

1. https://dash.cloudflare.com/?to=/:account/pages/view/cold-call-trainer 접속
2. Settings → Builds & deployments
3. "Connect to Git" 클릭
4. GitHub 선택 및 권한 승인
5. 리포지토리: epicstage/cold-call-trainer
6. 브랜치: main

## 3. 빌드 설정

- Build command: `npm run build:cf`
- Output directory: `.vercel/output/static`
- Root directory: (비워두기)
- Node.js version: `20`

## 4. 환경 변수 설정

Settings → Environment variables에서 추가:
- OPENAI_API_KEY
- ELEVENLABS_API_KEY
- ELEVENLABS_VOICE_ID: 21m00Tcm4TlvDq8ikWAM

