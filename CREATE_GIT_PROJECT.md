# Cloudflare Pages Git 연결 프로젝트 생성 가이드

## ❌ 문제
`wrangler pages project create`는 Upload-only 프로젝트를 만듭니다.
Git 연결 기능이 없어서 자동 빌드/배포가 불가능합니다.

## ✅ 해결 방법
Dashboard에서 Git 연결 옵션으로 프로젝트를 새로 만들어야 합니다.

---

## 📋 단계별 가이드

### 1단계: Dashboard에서 새 프로젝트 생성

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com/
   - **Workers & Pages** → **Pages** 클릭

2. **"Create a project"** 또는 **"Create application"** 클릭

3. **"Connect to Git"** 탭 선택 ⚠️ (중요!)
   - "Upload assets"가 아닌 "Connect to Git" 선택

### 2단계: GitHub 연결

1. **GitHub** 선택
2. **권한 승인** (Cloudflare Pages에 GitHub 접근 권한 부여)
3. **리포지토리 선택**: `epicstage/cold-call-trainer`
4. **브랜치 선택**: `main`

### 3단계: 빌드 설정

다음 설정을 입력:

- **Project name:**
  ```
  cold-call-trainer
  ```

- **Production branch:**
  ```
  main
  ```

- **Build command:**
  ```
  npm run build:cf
  ```

- **Build output directory:**
  ```
  .vercel/output/static
  ```

- **Root directory:**
  ```
  (비워두기)
  ```

- **Node.js version:**
  ```
  20
  ```

**"Save and Deploy"** 클릭

### 4단계: 환경 변수 설정

프로젝트가 생성된 후:

1. 프로젝트 페이지에서 **Settings** 탭 클릭
2. **Environment variables** 섹션 찾기
3. **"Add variable"** 클릭하여 다음 추가:

#### Production 환경 변수:

1. **OPENAI_API_KEY**
   - Value: `[YOUR_OPENAI_API_KEY]`

2. **ELEVENLABS_API_KEY**
   - Value: `sk_7701f7542ac91d62fdd52d7bf314d3490e6c9f7f16e2336c`

3. **ELEVENLABS_VOICE_ID**
   - Value: `21m00Tcm4TlvDq8ikWAM`

각 변수 추가 후 **Save** 클릭

### 5단계: 재배포

환경 변수 설정 후:
1. **Deployments** 탭으로 이동
2. **"Retry deployment"** 또는 새 커밋 푸시하여 자동 재배포

---

## ✅ 완료 체크리스트

- [ ] Dashboard에서 "Connect to Git" 옵션으로 프로젝트 생성
- [ ] GitHub 리포지토리 연결 완료
- [ ] 빌드 설정 완료
- [ ] 환경 변수 3개 모두 추가
- [ ] 첫 배포 성공 (Deployments 탭에서 확인)

---

## 🔗 링크

- **Dashboard**: https://dash.cloudflare.com/?to=/:account/pages
- **GitHub Repo**: https://github.com/epicstage/cold-call-trainer
- **Production URL**: https://cold-call-trainer.pages.dev

---

## ⚠️ 중요 참고사항

- Upload-only 프로젝트는 Git 연결이 불가능합니다
- 반드시 Dashboard에서 "Connect to Git" 옵션으로 프로젝트를 만들어야 합니다
- 기존 Upload-only 프로젝트는 삭제하고 새로 만들어야 합니다


