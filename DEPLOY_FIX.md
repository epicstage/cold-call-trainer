# Cloudflare Pages 배포 문제 해결

## 문제 상황

Cloudflare Pages 프로젝트가 Git에 연결되지 않아 자동 배포가 안 되고 있습니다.

현재 상태:
- ✅ GitHub 리포지토리: 연결됨
- ❌ Cloudflare Pages Git 연결: 안 됨 ("No" 표시)
- ✅ GitHub Actions workflow: 존재하지만 Secrets 설정 필요

## 해결 방법

### 방법 1: wrangler CLI로 직접 배포 (권장, 빠름)

```bash
# 1. 빌드
npm run build:cf

# 2. wrangler로 배포
npx wrangler pages deploy .vercel/output/static --project-name=cold-call-trainer
```

### 방법 2: Cloudflare Dashboard에서 Git 연결 설정

1. Cloudflare Dashboard 접속
   - https://dash.cloudflare.com/?to=/:account/pages/view/cold-call-trainer

2. Settings → Builds & deployments

3. "Connect to Git" 클릭

4. GitHub 선택 및 권한 승인

5. 리포지토리 선택: `epicstage/cold-call-trainer`

6. 빌드 설정:
   - Build command: `npm run build:cf`
   - Output directory: `.vercel/output/static`
   - Root directory: (비워두기)
   - Node.js version: 20

7. Save 후 자동 배포 시작

## 방법 3: GitHub Actions 사용 (Secrets 설정 필요)

GitHub Secrets에 다음을 설정해야 합니다:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `OPENAI_API_KEY`
- `ELEVENLABS_API_KEY`
- `ELEVENLABS_VOICE_ID`

---

**가장 빠른 해결책: 방법 1 (wrangler CLI 직접 배포)**


