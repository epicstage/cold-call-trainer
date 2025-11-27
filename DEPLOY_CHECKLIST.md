# ✅ 배포 체크리스트

이 문서를 따라 단계별로 진행하세요.

---

## 📋 [1단계] GitHub 리포 생성 준비

### A. Git 상태 확인 및 커밋

**✅ .gitignore 확인 완료**
- `.env.local`이 제외되어 있음
- `.next/`, `node_modules/` 등 빌드 산출물 제외됨

**실행할 명령어 (터미널에 복사/붙여넣기):**

```bash
cd /Users/mac/Desktop/cold-call-trainer

# 모든 변경사항 추가
git add .

# 첫 커밋 생성
git commit -m "init: cloudflare deploy version"
```

---

### B. GitHub 리포 생성

**✅ GitHub CLI (gh) 설치 확인 완료: v2.83.1**

#### 방법 1: GitHub CLI 사용 (권장) ⚡

아래 명령어를 **복사해서 터미널에 실행**하세요:

```bash
cd /Users/mac/Desktop/cold-call-trainer

gh repo create cold-call-trainer \
  --public \
  --description "ColdCall BALANCE – Voice Trainer - 콜드콜 연습을 위한 AI 음성 트레이너" \
  --source=. \
  --remote=origin \
  --push
```

이 명령어는 다음을 자동으로 수행합니다:
- ✅ GitHub에 `cold-call-trainer` 리포 생성
- ✅ 원격 저장소 `origin`으로 설정
- ✅ 현재 브랜치를 `main`으로 푸시

**완료 체크:**
- [ ] 명령어 실행 완료
- [ ] https://github.com/YOUR_USERNAME/cold-call-trainer 접속하여 리포 확인

---

#### 방법 2: 수동 생성 (GitHub CLI 사용 안 할 경우)

**1단계: GitHub 웹에서 리포 생성**

1. 브라우저에서 접속: **https://github.com/new**

2. 리포지토리 정보 입력:
   - **Repository name:** `cold-call-trainer`
   - **Description:** `ColdCall BALANCE – Voice Trainer - 콜드콜 연습을 위한 AI 음성 트레이너`
   - **Public** 선택 (또는 Private 원하면 Private)
   - ❌ **"Initialize this repository with a README"** 체크 해제
   - ❌ **"Add .gitignore"** 체크 해제
   - ❌ **"Choose a license"** 선택 안 함

3. **"Create repository"** 버튼 클릭

**2단계: 로컬에서 원격 저장소 연결 및 푸시**

리포지토리 생성 후, GitHub가 보여주는 페이지에 있는 명령어를 사용하거나,
아래 명령어를 **복사해서 터미널에 실행**하세요:

```bash
cd /Users/mac/Desktop/cold-call-trainer

# 원격 저장소 추가 (YOUR_USERNAME을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/cold-call-trainer.git

# 브랜치를 main으로 설정
git branch -M main

# 코드 푸시
git push -u origin main
```

**⚠️ 중요:** `YOUR_USERNAME`을 실제 GitHub 사용자명으로 변경하세요!

**완료 체크:**
- [ ] GitHub에서 리포지토리 생성 완료
- [ ] 원격 저장소 연결 완료
- [ ] 코드 푸시 완료
- [ ] GitHub에서 파일이 보이는지 확인

---

## 📋 [2단계] Cloudflare Pages 프로젝트 생성

### A. Next.js 15 → Cloudflare Pages 배포 준비

**⚠️ 중요 참고사항:**

Next.js 15 App Router는 Cloudflare Pages에서 완전히 지원되지 않습니다.
현재 프로젝트는 서버 API 라우트(`/api/*`)를 사용하므로, 다음 중 하나가 필요합니다:

1. **@cloudflare/next-on-pages** 사용 (권장)
2. Cloudflare Pages Functions로 API 라우트 변환
3. Static Export + 별도 API 서버

**현재 설정:**
- `wrangler.toml` 파일 생성 완료 ✅
- 빌드 설정은 Cloudflare Dashboard에서 입력 필요

---

### B. Cloudflare Dashboard에서 프로젝트 생성 (완전 상세 안내)

#### 🔹 단계 1: Cloudflare Dashboard 접속

1. 브라우저 열기
2. **https://dash.cloudflare.com** 접속
3. Cloudflare 계정으로 로그인

**확인 사항:**
- [ ] Cloudflare Dashboard 접속 완료
- [ ] 로그인 완료

---

#### 🔹 단계 2: Pages 메뉴 이동

**방법 A (좌측 메뉴):**
1. 좌측 사이드바에서 **"Workers & Pages"** 클릭
2. 상단에 **"Overview"** 탭이 보이는지 확인
3. **"Create application"** 버튼 찾기

**방법 B (직접 URL):**
1. 브라우저 주소창에 입력: `https://dash.cloudflare.com/?to=/:account/pages`
2. Enter 키 입력

**확인 사항:**
- [ ] Pages 메뉴 접속 완료
- [ ] "Create application" 또는 "Create a project" 버튼 보임

---

#### 🔹 단계 3: 프로젝트 생성 시작

1. 상단 또는 중앙에 있는 **"Create application"** 버튼 클릭
2. 팝업에서 **"Pages"** 선택
3. **"Connect to Git"** 버튼 클릭

또는:

1. **"Create a project"** 버튼 클릭 (직접 표시되는 경우)
2. **"Connect to Git"** 선택

**확인 사항:**
- [ ] "Connect to Git" 화면으로 이동됨

---

#### 🔹 단계 4: GitHub OAuth 연결

1. **"GitHub"** 아이콘 또는 버튼 클릭
2. GitHub OAuth 인증 화면으로 이동
3. **"Authorize Cloudflare Pages"** 버튼 클릭
4. 권한 허용 확인
   - 필요 시 비밀번호 재입력
   - 2단계 인증 확인 (설정된 경우)

**확인 사항:**
- [ ] GitHub OAuth 인증 완료
- [ ] Cloudflare Dashboard로 돌아옴

---

#### 🔹 단계 5: 리포지토리 선택

1. 리포지토리 목록에서 **"cold-call-trainer"** 검색
   - 검색창에 `cold-call-trainer` 입력
2. **"cold-call-trainer"** 리포지토리 클릭
3. **"Begin setup"** 또는 **"Install & Authorize"** 버튼 클릭

**확인 사항:**
- [ ] `cold-call-trainer` 리포지토리 선택 완료
- [ ] 프로젝트 설정 화면으로 이동됨

---

#### 🔹 단계 6: 프로젝트 기본 정보 입력

**Project name:**
```
cold-call-trainer
```

**Production branch:**
```
main
```
(기본값으로 `main`이 선택되어 있을 수 있음)

**확인 사항:**
- [ ] Project name: `cold-call-trainer` 입력
- [ ] Production branch: `main` 선택

---

#### 🔹 단계 7: 빌드 설정 입력

**Framework preset:**
- 드롭다운에서 **"None"** 선택
- (또는 "Next.js" 선택 가능하지만, 완전 지원 안 됨)

**Build command:**
```
npm run build
```

**Build output directory:**
```
.next
```

**또는 Static Export 사용 시:**
```
out
```

**Root directory (optional):**
```
(비워두기)
```

**Functions directory (optional):**
```
functions
```
(나중에 API 라우트를 변환할 때 사용)

**확인 사항:**
- [ ] Framework preset: `None` 선택
- [ ] Build command: `npm run build` 입력
- [ ] Build output directory: `.next` 입력

---

#### 🔹 단계 8: 환경변수 설정 (여기서는 건너뛰기)

**Environment variables:**
- 이 단계에서는 입력하지 않음
- 나중에 Settings에서 추가할 예정

**확인 사항:**
- [ ] 환경변수 섹션은 일단 비워두기

---

#### 🔹 단계 9: 저장 및 배포

1. 화면 하단으로 스크롤
2. **"Save and Deploy"** 버튼 클릭
3. 첫 빌드가 시작됨
4. 배포 진행 상황 확인 (약 2-3분 소요)

**확인 사항:**
- [ ] "Save and Deploy" 버튼 클릭 완료
- [ ] 빌드가 시작됨
- [ ] 빌드 완료 대기 (성공 또는 실패 확인)

---

#### 🔹 단계 10: 배포 완료 확인

빌드가 완료되면:

1. **"View deployment"** 버튼 클릭
2. 배포 URL 확인: `https://cold-call-trainer-XXXXX.pages.dev`
   - 또는 `https://cold-call-trainer.pages.dev`
3. 배포 URL 클릭하여 접속 테스트

**확인 사항:**
- [ ] 빌드 성공 확인
- [ ] 배포 URL 확인
- [ ] 배포 URL 접속 테스트 (앱이 보이는지 확인 - API는 나중에)

---

## 📋 [3단계] Cloudflare Pages 환경변수 설정

### A. 환경변수 템플릿

Cloudflare Pages → Settings → Environment Variables → Production에서 아래 변수들을 추가하세요:

```
OPENAI_API_KEY="실제_OpenAI_API_키_입력"
ELEVENLABS_API_KEY="실제_ElevenLabs_API_키_입력"
ELEVENLABS_VOICE_ID="21m00Tcm4TlvDq8ikWAM"
```

**⚠️ 실제 API 키 확인 방법:**

로컬 터미널에서 실행:
```bash
cd /Users/mac/Desktop/cold-call-trainer
cat .env.local
```

출력된 값들을 Cloudflare Dashboard에 입력하세요.

---

### B. Cloudflare Dashboard에서 환경변수 설정 (완전 상세 안내)

#### 🔹 단계 1: 프로젝트 Settings로 이동

1. Cloudflare Dashboard에서 **"Workers & Pages"** 클릭
2. **"cold-call-trainer"** 프로젝트 클릭
3. 프로젝트 상단 탭에서 **"Settings"** 클릭

**확인 사항:**
- [ ] `cold-call-trainer` 프로젝트 Settings 페이지 접속 완료

---

#### 🔹 단계 2: Environment Variables 메뉴 찾기

1. Settings 페이지 좌측 메뉴에서 **"Environment Variables"** 클릭
   - 또는 Settings 페이지를 아래로 스크롤하여 **"Environment Variables"** 섹션 찾기

**확인 사항:**
- [ ] Environment Variables 페이지 접속 완료
- [ ] "Add variable" 버튼이 보임

---

#### 🔹 단계 3: 첫 번째 환경변수 추가 (OPENAI_API_KEY)

1. **"Add variable"** 버튼 클릭
2. **Variable name** 입력란에: `OPENAI_API_KEY`
3. **Value** 입력란에: (실제 OpenAI API 키 붙여넣기)
   - `.env.local` 파일에서 복사한 값 입력
4. **Environment** 선택:
   - **Production** 체크 (기본 선택됨)
   - Preview, Branch preview도 필요하면 체크
5. **"Save"** 버튼 클릭

**확인 사항:**
- [ ] `OPENAI_API_KEY` 변수 추가 완료
- [ ] 값이 올바르게 입력됨

---

#### 🔹 단계 4: 두 번째 환경변수 추가 (ELEVENLABS_API_KEY)

1. 다시 **"Add variable"** 버튼 클릭
2. **Variable name** 입력란에: `ELEVENLABS_API_KEY`
3. **Value** 입력란에: (실제 ElevenLabs API 키 붙여넣기)
4. **Environment:** Production 선택
5. **"Save"** 버튼 클릭

**확인 사항:**
- [ ] `ELEVENLABS_API_KEY` 변수 추가 완료

---

#### 🔹 단계 5: 세 번째 환경변수 추가 (ELEVENLABS_VOICE_ID)

1. 다시 **"Add variable"** 버튼 클릭
2. **Variable name** 입력란에: `ELEVENLABS_VOICE_ID`
3. **Value** 입력란에: `21m00Tcm4TlvDq8ikWAM`
   - (또는 원하는 다른 음성 ID)
4. **Environment:** Production 선택
5. **"Save"** 버튼 클릭

**확인 사항:**
- [ ] `ELEVENLABS_VOICE_ID` 변수 추가 완료
- [ ] 총 3개의 환경변수가 모두 추가됨

---

#### 🔹 단계 6: 환경변수 확인

Environment Variables 페이지에서 아래 3개가 모두 보이는지 확인:

- ✅ `OPENAI_API_KEY`
- ✅ `ELEVENLABS_API_KEY`
- ✅ `ELEVENLABS_VOICE_ID`

**확인 사항:**
- [ ] 3개 환경변수 모두 목록에 표시됨
- [ ] 값이 올바르게 설정됨 (키는 마스킹되어 보임)

---

#### 🔹 단계 7: 재배포 트리거

환경변수를 추가한 후에는 **재배포**해야 적용됩니다.

**방법 1: Cloudflare Dashboard에서 재배포**

1. 프로젝트 페이지로 돌아가기 (좌측 상단 "cold-call-trainer" 클릭 또는 "← Back" 버튼)
2. **"Deployments"** 탭 클릭
3. 최신 배포 옆의 **"⋯"** (점 3개) 메뉴 클릭
4. **"Retry deployment"** 또는 **"Redeploy"** 클릭
5. 재배포 완료 대기

**방법 2: GitHub에 새 커밋 푸시 (자동 재배포)**

1. 로컬에서 작은 변경사항 추가 (예: README 수정)
2. 커밋 및 푸시:
   ```bash
   git add .
   git commit -m "chore: trigger redeploy"
   git push
   ```
3. Cloudflare Pages가 자동으로 재배포 시작

**확인 사항:**
- [ ] 재배포 시작됨
- [ ] 재배포 완료 대기
- [ ] 재배포 성공 확인

---

## 📋 [4단계] 배포 확인 및 테스트

### 배포 URL 확인

1. Cloudflare Dashboard → `cold-call-trainer` 프로젝트
2. **"Deployments"** 탭
3. 최신 배포의 URL 확인:
   - `https://cold-call-trainer-XXXXX.pages.dev`
   - 또는 `https://cold-call-trainer.pages.dev`

### 기능 테스트

- [ ] 홈 화면 접속 확인
- [ ] 세션 페이지 접속 확인
- [ ] API 라우트 작동 확인 (필요시 추가 설정)

---

## 📋 [5단계] Next.js API 라우트 설정 (필요 시)

### ⚠️ 중요: API 라우트 작동 안 할 수 있음

현재 프로젝트는 Next.js API 라우트를 사용합니다:
- `/app/api/call/route.ts`
- `/app/api/voice/route.ts`
- `/app/api/feedback/route.ts`
- `/app/api/persona/route.ts`

Cloudflare Pages에서 이들을 작동시키려면 추가 설정이 필요합니다.

### 해결 방법

자세한 내용은 `GITHUB_CLOUDFLARE_DEPLOY.md` 파일의 "[5] Next.js 15 → Cloudflare Pages 특별 설정" 섹션을 참조하세요.

**옵션:**
1. `@cloudflare/next-on-pages` 사용 (권장)
2. Cloudflare Pages Functions로 API 라우트 변환
3. Static Export + 별도 API 서버

---

## ✅ 최종 체크리스트

배포 완료 확인:

- [ ] ✅ GitHub 리포지토리에 코드 푸시 완료
- [ ] ✅ Cloudflare Pages 프로젝트 생성 완료
- [ ] ✅ 빌드 설정 입력 완료
- [ ] ✅ 환경변수 3개 모두 추가 완료
- [ ] ✅ 첫 배포 성공 확인
- [ ] ✅ 배포 URL 접속 테스트
- [ ] ✅ 환경변수 재배포 완료
- [ ] ✅ API 라우트 작동 확인 (필요시 추가 설정)

---

## 📚 참고 문서

- 상세 가이드: `GITHUB_CLOUDFLARE_DEPLOY.md`
- 빠른 시작: `GITHUB_CLOUDFLARE_STEPS.md`
- 배포 가이드: `DEPLOYMENT.md`

---

**🎉 모든 단계 완료 후 배포 URL:**
`https://cold-call-trainer.pages.dev`


