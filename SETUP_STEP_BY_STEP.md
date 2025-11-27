# 🚀 Cloudflare Pages 설정 - 단계별 가이드

## ✅ 준비 완료

- ✅ 기존 Upload-only 프로젝트 삭제됨
- ✅ GitHub 리포지토리 확인: `epicstage/cold-call-trainer`
- ✅ 빌드 설정 준비 완료

---

## 📋 Dashboard에서 설정하기 (6단계)

### 1️⃣ Dashboard 접속

👉 **https://dash.cloudflare.com/**

1. 좌측 메뉴에서 **"Workers & Pages"** 클릭
2. 상단 탭에서 **"Pages"** 클릭

---

### 2️⃣ 새 프로젝트 생성

1. 페이지 우측 상단 **"Create a project"** 버튼 클릭
2. **"Connect to Git"** 탭 선택 ⚠️ (중요!)
   - "Upload assets" 탭이 아닌 **"Connect to Git"** 탭

---

### 3️⃣ GitHub 연결

1. **GitHub** 선택
2. 권한 승인 팝업:
   - **"Authorize Cloudflare Pages"** 클릭
   - 필요시 GitHub 로그인
3. 리포지토리 선택:
   - `epicstage/cold-call-trainer` 선택
4. 브랜치 선택:
   - `main` 선택
5. **"Begin setup"** 또는 **"Continue"** 클릭

---

### 4️⃣ 빌드 설정 입력

다음 설정을 정확히 입력하세요:

#### 프로젝트 정보
- **Project name**: `cold-call-trainer`
- **Production branch**: `main` (자동 입력됨)

#### 빌드 설정
- **Framework preset**: `None` 또는 `Next.js` 선택 후 수정

**빌드 명령어:**
```
npm run build:cf
```

**빌드 출력 디렉토리:**
```
.vercel/output/static
```

**루트 디렉토리:**
```
(비워두기 - 아무것도 입력하지 않음)
```

#### 환경 설정
- **Node.js version**: `20` (드롭다운에서 선택)

---

### 5️⃣ 저장 및 첫 배포

1. **"Save and Deploy"** 버튼 클릭
2. 첫 배포가 자동으로 시작됩니다
3. **Deployments** 탭에서 진행 상황 확인
   - 빌드 시간: 약 3-5분 소요

---

### 6️⃣ 환경 변수 설정

**프로젝트 생성 후:**

1. 프로젝트 페이지에서 **Settings** 탭 클릭
2. 좌측 메뉴에서 **"Environment variables"** 섹션 찾기
3. **"Add variable"** 버튼 클릭

#### 환경 변수 3개 추가:

**변수 1: OPENAI_API_KEY**
```
Name: OPENAI_API_KEY
Value: [YOUR_OPENAI_API_KEY]
Environment: Production 체크
```
→ **Save** 클릭

**변수 2: ELEVENLABS_API_KEY**
```
Name: ELEVENLABS_API_KEY
Value: sk_7701f7542ac91d62fdd52d7bf314d3490e6c9f7f16e2336c
Environment: Production 체크
```
→ **Save** 클릭

**변수 3: ELEVENLABS_VOICE_ID**
```
Name: ELEVENLABS_VOICE_ID
Value: 21m00Tcm4TlvDq8ikWAM
Environment: Production 체크
```
→ **Save** 클릭

---

### 7️⃣ 환경 변수 추가 후 재배포

환경 변수를 모두 추가한 후:

1. **Deployments** 탭으로 이동
2. 최신 배포를 찾아서 **"Retry deployment"** 버튼 클릭
   - 또는 새 커밋을 GitHub에 푸시하면 자동으로 재배포됩니다

---

## ✅ 완료 확인

모든 설정이 완료되면:

1. **Deployments** 탭에서 빌드 성공 확인 (초록색 체크마크)
2. **Production URL** 접속: https://cold-call-trainer.pages.dev
3. 홈페이지가 정상적으로 로드되는지 확인
4. `/session` 페이지 접속하여 기능 테스트

---

## 🔗 중요한 링크

### Dashboard
- **Pages 목록**: https://dash.cloudflare.com/?to=/:account/pages
- **프로젝트 페이지**: https://dash.cloudflare.com/?to=/:account/pages/view/cold-call-trainer

### GitHub
- **리포지토리**: https://github.com/epicstage/cold-call-trainer

### Production
- **Production URL**: https://cold-call-trainer.pages.dev

---

## ⏱️ 예상 소요 시간

- GitHub 연결: 2분
- 빌드 설정: 2분
- 첫 배포: 3-5분 (자동)
- 환경 변수 설정: 3분
- **총 약 10-12분**

---

## 🎯 핵심 포인트

1. ✅ **"Connect to Git"** 탭을 반드시 선택해야 Git 연결 가능
2. ✅ 빌드 명령어와 출력 디렉토리를 정확히 입력
3. ✅ 환경 변수는 프로젝트 생성 후 별도로 설정
4. ✅ 환경 변수 추가 후 재배포 필요

---

## 🐛 문제 발생 시

### 빌드 실패
- Deployments 탭 → 빌드 로그 확인
- 빌드 명령어와 출력 디렉토리 재확인

### 환경 변수 작동 안 함
- Settings → Environment variables에서 값 재확인
- 재배포 실행

### GitHub 연결 안 됨
- GitHub Settings → Applications에서 Cloudflare Pages 권한 확인
- 필요시 권한 재승인

---

**설정 완료 후 자동 배포가 활성화됩니다!** 🎉


