# Cloudflare Pages 설정 완전 가이드

## ✅ 프로젝트 생성 완료

프로젝트 이름: `cold-call-trainer`

---

## 📋 다음 단계: Dashboard에서 설정

### 1. Dashboard 접속

👉 **https://dash.cloudflare.com/?to=/:account/pages/view/cold-call-trainer**

### 2. GitHub 연결 설정

1. **Settings** 탭 클릭
2. **Builds & deployments** 섹션 찾기
3. **"Connect to Git"** 버튼 클릭
4. **GitHub** 선택
5. **권한 승인** (Cloudflare Pages에 GitHub 접근 권한 부여)
6. **리포지토리 선택**: `epicstage/cold-call-trainer`
7. **브랜치 선택**: `main`
8. **Save** 클릭

### 3. 빌드 설정

Settings → Builds & deployments에서:

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

**Save** 클릭

### 4. 환경 변수 설정

Settings → Environment variables에서 **"Add variable"** 클릭하여 다음 추가:

#### Production 환경 변수:

1. **OPENAI_API_KEY**
   - Value: `[YOUR_OPENAI_API_KEY]`
   - Environment: Production (선택)

2. **ELEVENLABS_API_KEY**
   - Value: `sk_7701f7542ac91d62fdd52d7bf314d3490e6c9f7f16e2336c`
   - Environment: Production (선택)

3. **ELEVENLABS_VOICE_ID**
   - Value: `21m00Tcm4TlvDq8ikWAM`
   - Environment: Production (선택)

각 변수 추가 후 **Save** 클릭

---

## ✅ 완료 체크리스트

- [ ] Cloudflare Pages 프로젝트 생성됨
- [ ] GitHub 리포지토리 연결됨
- [ ] 빌드 설정 완료
- [ ] 환경 변수 3개 모두 추가됨
- [ ] 첫 배포 시작됨 (Deployments 탭에서 확인)

---

## 🔗 링크

- **Production URL**: https://cold-call-trainer.pages.dev
- **Dashboard**: https://dash.cloudflare.com/?to=/:account/pages/view/cold-call-trainer
- **GitHub Repo**: https://github.com/epicstage/cold-call-trainer

---

## ⏱️ 예상 시간

- GitHub 연결: 2분
- 빌드 설정: 1분
- 환경 변수 설정: 2분
- **총 약 5분 소요**

설정 완료 후 자동으로 첫 배포가 시작됩니다!


