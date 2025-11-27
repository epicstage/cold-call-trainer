# 🚀 빠른 시작 가이드

## [1단계] GitHub 리포 생성 및 푸시

### 실행할 명령어 (복사해서 터미널에 실행):

```bash
cd /Users/mac/Desktop/cold-call-trainer

# 1. 변경사항 커밋
git add .
git commit -m "init: cloudflare deploy version"

# 2. GitHub 리포 생성 및 푸시 (GitHub CLI 사용)
gh repo create cold-call-trainer \
  --public \
  --description "ColdCall BALANCE – Voice Trainer - 콜드콜 연습을 위한 AI 음성 트레이너" \
  --source=. \
  --remote=origin \
  --push

# 또는 GitHub CLI가 없다면, 아래 명령어로 원격 저장소만 추가 후
# GitHub 웹에서 리포를 먼저 만들고:
# git remote add origin https://github.com/YOUR_USERNAME/cold-call-trainer.git
# git branch -M main
# git push -u origin main
```

**✅ 완료 체크:** GitHub에서 `cold-call-trainer` 리포가 보이는지 확인

---

## [2단계] Cloudflare Pages 프로젝트 생성

### Cloudflare Dashboard에서 할 일:

1. **접속:** https://dash.cloudflare.com
2. **Workers & Pages** 클릭 (좌측 메뉴)
3. **Create a project** 버튼 클릭
4. **Connect to Git** 선택
5. **GitHub** 클릭하여 인증
6. **cold-call-trainer** 리포 선택 → **Begin setup**

### 빌드 설정 입력:

- **Project name:** `cold-call-trainer`
- **Production branch:** `main`
- **Framework preset:** `None`
- **Build command:** `npm run build`
- **Build output directory:** `.next` 또는 `out`
- **Root directory:** (비워두기)
- **Functions directory:** `functions` (선택사항)

7. **Save and Deploy** 클릭

**✅ 완료 체크:** 첫 배포가 시작되고 완료될 때까지 대기 (약 2-3분)

---

## [3단계] 환경변수 설정

### Cloudflare Dashboard에서 할 일:

1. **cold-call-trainer** 프로젝트 클릭
2. **Settings** 탭 클릭
3. **Environment Variables** 클릭 (좌측 메뉴)
4. **Add variable** 클릭하고 아래 3개 추가:

   | Variable name | Value |
   |--------------|-------|
   | `OPENAI_API_KEY` | (실제 키 입력) |
   | `ELEVENLABS_API_KEY` | (실제 키 입력) |
   | `ELEVENLABS_VOICE_ID` | `21m00Tcm4TlvDq8ikWAM` |

5. 각 변수 저장 후, **Deployments** 탭으로 이동
6. **Redeploy** 클릭하여 환경변수 적용

**⚠️ 실제 API 키는 `.env.local` 파일에서 확인:**
```bash
cat /Users/mac/Desktop/cold-call-trainer/.env.local
```

**✅ 완료 체크:** 환경변수 3개 모두 추가 확인

---

## [4단계] 배포 확인

배포 URL: `https://cold-call-trainer.pages.dev`

**✅ 완료 체크:** 
- [ ] 배포 URL 접속 테스트
- [ ] 앱이 정상 작동하는지 확인
- [ ] API 라우트 작동 확인 (필요시 추가 설정)

---

## ⚠️ 중요: Next.js API 라우트 설정

현재 프로젝트는 서버 API를 사용하므로, Cloudflare Pages Functions로 변환이 필요할 수 있습니다.

자세한 내용은 `GITHUB_CLOUDFLARE_DEPLOY.md` 파일 참조.

