# Cloudflare Pages 프로젝트 설정 가이드

## 현재 상태

- 프로젝트: `cold-call-trainer`
- GitHub 리포지토리: `epicstage/cold-call-trainer`
- 브랜치: `main`

---

## 📋 단계별 설정 가이드

### 1단계: Dashboard 접속

👉 **https://dash.cloudflare.com/**

1. 좌측 메뉴에서 **"Workers & Pages"** 클릭
2. 상단 탭에서 **"Pages"** 클릭

### 2단계: 새 프로젝트 생성 (Git 연결)

1. 페이지 우측 상단에 **"Create a project"** 또는 **"Create application"** 버튼 클릭
2. **"Connect to Git"** 탭 선택 ⚠️ (중요: "Upload assets"가 아님)

### 3단계: GitHub 연결

1. **GitHub** 선택
2. 권한 승인 팝업이 나타나면:
   - **"Authorize Cloudflare Pages"** 클릭
   - 필요시 GitHub 계정 로그인
3. 리포지토리 선택:
   - `epicstage/cold-call-trainer` 선택
4. 브랜치 선택:
   - `main` 선택
5. **Continue** 클릭

### 4단계: 빌드 설정

다음 설정을 정확히 입력:

#### 기본 설정
- **Project name**: `cold-call-trainer`
- **Production branch**: `main`

#### 빌드 설정
- **Framework preset**: `None` (또는 수동 설정)
- **Build command**: 
  ```
  npm run build:cf
  ```
- **Build output directory**: 
  ```
  .vercel/output/static
  ```
- **Root directory**: 
  ```
  (비워두기 - 아무것도 입력하지 않음)
  ```

#### 환경 설정
- **Node.js version**: `20`

### 5단계: 저장 및 배포

1. **"Save and Deploy"** 버튼 클릭
2. 첫 배포가 자동으로 시작됩니다
3. **Deployments** 탭에서 빌드 진행 상황 확인

### 6단계: 환경 변수 설정

프로젝트가 생성된 후:

1. 프로젝트 페이지에서 **Settings** 탭 클릭
2. 좌측 메뉴에서 **"Environment variables"** 클릭
3. **"Add variable"** 버튼 클릭

#### 다음 3개의 환경 변수를 추가:

**1. OPENAI_API_KEY**
- Name: `OPENAI_API_KEY`
- Value: `[YOUR_OPENAI_API_KEY]`
- Environments: `Production` 선택
- **Save** 클릭

**2. ELEVENLABS_API_KEY**
- Name: `ELEVENLABS_API_KEY`
- Value: `sk_7701f7542ac91d62fdd52d7bf314d3490e6c9f7f16e2336c`
- Environments: `Production` 선택
- **Save** 클릭

**3. ELEVENLABS_VOICE_ID**
- Name: `ELEVENLABS_VOICE_ID`
- Value: `21m00Tcm4TlvDq8ikWAM`
- Environments: `Production` 선택
- **Save** 클릭

### 7단계: 환경 변수 설정 후 재배포

환경 변수를 모두 추가한 후:

1. **Deployments** 탭으로 이동
2. 최신 배포 옆에 **"Retry deployment"** 버튼 클릭
   - 또는 새 커밋을 푸시하면 자동으로 재배포됩니다

---

## ✅ 완료 체크리스트

- [ ] Dashboard에서 "Connect to Git"으로 프로젝트 생성
- [ ] GitHub 리포지토리 연결 완료 (`epicstage/cold-call-trainer`)
- [ ] 빌드 설정 완료 (`npm run build:cf`, `.vercel/output/static`)
- [ ] 환경 변수 3개 모두 추가 (OPENAI_API_KEY, ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID)
- [ ] 첫 배포 성공 (Deployments 탭에서 확인)

---

## 🔗 링크

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
- 빌드 설정: 1분
- 환경 변수 설정: 3분
- **총 약 6분**

---

## 🔍 문제 해결

### "Connect to Git" 탭이 보이지 않을 때
- 다른 프로젝트를 선택했는지 확인
- 브라우저 새로고침
- 다른 브라우저로 시도

### GitHub 권한이 거부될 때
- GitHub Settings → Applications → Authorized OAuth Apps에서 Cloudflare Pages 권한 확인
- 필요시 권한 재승인

### 빌드가 실패할 때
- Deployments 탭에서 빌드 로그 확인
- 환경 변수가 올바르게 설정되었는지 확인
- 빌드 명령어와 출력 디렉토리가 정확한지 확인

---

## 📝 참고사항

- Git 연결 프로젝트는 `git push`할 때마다 자동으로 배포됩니다
- 환경 변수는 프로젝트별로 설정됩니다
- Production 환경 변수는 프로덕션 배포에만 적용됩니다
- Preview 환경 변수는 Pull Request 미리보기에만 적용됩니다


