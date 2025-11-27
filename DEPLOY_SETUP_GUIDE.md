# 🔧 Cloudflare Pages 배포 설정 가이드

## 문제 상황

- ❌ Cloudflare Pages에 Git 연결이 안 되어 있음
- ❌ 자동 배포가 작동하지 않음

## ✅ 해결 방법: Cloudflare Dashboard에서 Git 연결

### 1단계: Dashboard 접속

👉 **https://dash.cloudflare.com/?to=/:account/pages/view/cold-call-trainer**

### 2단계: Git 연결 설정

1. **Settings** 탭 클릭
2. **Builds & deployments** 섹션 찾기
3. **"Connect to Git"** 또는 **"Link Git repository"** 버튼 클릭

### 3단계: GitHub 연결

1. **GitHub** 선택
2. **권한 승인** (Cloudflare Pages에 GitHub 접근 권한 부여)
3. **리포지토리 선택**: `epicstage/cold-call-trainer`
4. **브랜치 선택**: `main`

### 4단계: 빌드 설정

다음 설정을 입력:

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

- **Environment variables** (Settings → Environment variables에서 설정):
  - `OPENAI_API_KEY`: (값 입력)
  - `ELEVENLABS_API_KEY`: (값 입력)
  - `ELEVENLABS_VOICE_ID`: `21m00Tcm4TlvDq8ikWAM`
  - `NODE_VERSION`: `20`

### 5단계: 저장 및 배포

1. **Save** 버튼 클릭
2. 자동으로 빌드 시작됨
3. Deployments 탭에서 진행 상황 확인

---

## 📋 빌드 설정 요약

```
Build command: npm run build:cf
Output directory: .vercel/output/static
Node.js version: 20
```

---

## 🔗 링크

- **Production URL**: https://cold-call-trainer.pages.dev
- **Dashboard**: https://dash.cloudflare.com/?to=/:account/pages/view/cold-call-trainer
- **GitHub Repo**: https://github.com/epicstage/cold-call-trainer

---

## ✅ 완료 후

Git 연결 설정이 완료되면:
- ✅ `git push` 할 때마다 자동 배포
- ✅ 빌드 로그 확인 가능
- ✅ 배포 히스토리 관리 가능


