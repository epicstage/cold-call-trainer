# 🚀 GitHub → Cloudflare Pages 자동 배포 가이드

이 문서는 콜드콜 트레이너 앱을 GitHub 리포지토리에 푸시하고 Cloudflare Pages에 자동 배포하는 전체 과정을 안내합니다.

---

## [1] GitHub 리포 생성 준비

### A. Git 상태 확인 및 커밋

프로젝트는 이미 git 초기화가 되어 있습니다. 변경사항을 커밋하겠습니다.

**실행할 명령어:**

```bash
cd /Users/mac/Desktop/cold-call-trainer

# 모든 변경사항 추가
git add .

# 첫 커밋 생성
git commit -m "init: cloudflare deploy version"
```

**참고:** `.env.local` 파일은 `.gitignore`에 의해 자동으로 제외됩니다.

---

### B. GitHub 리포 생성

**✅ GitHub CLI (gh)가 설치되어 있습니다!**

다음 명령어를 복사해서 터미널에 실행하세요:

```bash
cd /Users/mac/Desktop/cold-call-trainer

gh repo create cold-call-trainer \
  --public \
  --description "ColdCall BALANCE – Voice Trainer - 콜드콜 연습을 위한 AI 음성 트레이너" \
  --source=. \
  --remote=origin \
  --push
```

**위 명령어가 실행되면:**
- GitHub에 `cold-call-trainer` 리포지토리가 생성됩니다
- 원격 저장소가 `origin`으로 설정됩니다
- 코드가 자동으로 푸시됩니다

**만약 GitHub CLI 명령어를 사용하지 않으려면:**

#### 수동 생성 방법:

1. **GitHub 웹사이트 접속:**
   - https://github.com/new

2. **리포지토리 정보 입력:**
   - Repository name: `cold-call-trainer`
   - Description: `ColdCall BALANCE – Voice Trainer - 콜드콜 연습을 위한 AI 음성 트레이너`
   - Public 선택 (또는 Private)
   - **"Initialize this repository with a README" 체크 해제**
   - **"Add .gitignore" 체크 해제**
   - **"Choose a license" 선택 안 함**

3. **"Create repository" 버튼 클릭**

4. **리포지토리 생성 후, 다음 명령어 실행:**

```bash
cd /Users/mac/Desktop/cold-call-trainer

# 원격 저장소 추가
git remote add origin https://github.com/YOUR_USERNAME/cold-call-trainer.git

# 브랜치 이름 확인 및 푸시
git branch -M main
git push -u origin main
```

**주의:** `YOUR_USERNAME`을 실제 GitHub 사용자명으로 변경하세요!

---

### C. Git Remote 설정 및 푸시 (GitHub CLI 사용 시 자동 완료됨)

만약 수동으로 진행한 경우:

```bash
cd /Users/mac/Desktop/cold-call-trainer

# 원격 저장소 확인
git remote -v

# 원격 저장소가 없으면 추가
git remote add origin https://github.com/YOUR_USERNAME/cold-call-trainer.git

# 브랜치를 main으로 설정
git branch -M main

# 코드 푸시
git push -u origin main
```

---

## [2] Cloudflare Pages 프로젝트 생성

### A. Next.js 15 → Cloudflare Pages 배포 방법 선택

**⚠️ 중요:** Next.js 15 App Router는 Cloudflare Pages에서 기본적으로 완전히 지원되지 않습니다. 
서버 API 라우트(`/api/*`)를 사용하므로 다음 중 하나를 선택해야 합니다:

#### 옵션 1: Cloudflare Pages Functions 사용 (권장)

Next.js를 Static Export하고, API 라우트를 Cloudflare Pages Functions로 변환합니다.

#### 옵션 2: @cloudflare/next-on-pages 사용 (권장)

Next.js를 Cloudflare Pages용으로 빌드하는 공식 어댑터를 사용합니다.

### B. 빌드 설정 준비

현재 프로젝트는 서버 기능이 필요하므로, **Cloudflare Pages Functions**를 사용해야 합니다.

**빌드 명령어:**
```
npm run build
```

**출력 디렉토리:**
```
.next
```

또는 Static Export를 사용하는 경우:
```
out
```

**함수 디렉토리:**
```
functions
```

---

### C. Cloudflare Dashboard에서 프로젝트 생성 (상세 안내)

#### 단계별 절차:

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com 접속
   - 로그인 확인

2. **Pages 메뉴 이동**
   - 좌측 사이드바에서 **"Workers & Pages"** 클릭
   - 또는 직접: https://dash.cloudflare.com/?to=/:account/pages

3. **프로젝트 생성 시작**
   - 상단 또는 중앙에 있는 **"Create a project"** 버튼 클릭
   - 또는 **"Create application"** → **"Pages"** → **"Connect to Git"** 선택

4. **Git 연결**
   - **"Connect to Git"** 버튼 클릭
   - GitHub 아이콘 클릭하여 GitHub OAuth 인증
   - 권한 허용 (리포지토리 접근 권한)

5. **리포지토리 선택**
   - 검색창에서 `cold-call-trainer` 입력
   - `cold-call-trainer` 리포지토리 선택
   - **"Begin setup"** 버튼 클릭

6. **프로젝트 설정**

   **Project name:**
   ```
   cold-call-trainer
   ```

   **Production branch:**
   ```
   main
   ```

   **Framework preset:**
   - **"None"** 또는 **"Next.js"** 선택
   - (Cloudflare Pages가 Next.js를 완전히 지원하지 않으므로 None 권장)

7. **빌드 설정 입력**

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

   **Root directory:**
   ```
   (비워두기 또는 /)
   ```

   **Environment variables:**
   - 여기서는 입력하지 않음 (나중에 설정)

8. **Functions 설정 (중요!)**
   
   Cloudflare Pages에서 API 라우트를 사용하려면 Functions 폴더가 필요합니다.
   
   **Functions directory:**
   ```
   functions
   ```
   
   이 폴더는 나중에 API 라우트를 Cloudflare Pages Functions로 변환할 때 사용됩니다.

9. **저장 및 배포**
   - **"Save and Deploy"** 버튼 클릭
   - 첫 빌드가 시작됩니다 (약 2-3분 소요)

10. **배포 완료 확인**
    - 빌드 완료 후 "View deployment" 클릭
    - 배포 URL 확인: `https://cold-call-trainer.pages.dev`

---

## [3] Cloudflare Pages 환경변수 설정

### A. 환경변수 템플릿 생성

`.env.local` 파일을 기반으로 Cloudflare Pages 환경변수 설정 템플릿을 생성합니다.

**⚠️ 중요:** 실제 `.env.local` 파일의 값은 보안상 표시하지 않습니다. 
아래 템플릿에 실제 값을 입력하세요.

### B. Cloudflare Dashboard에서 환경변수 설정

#### 상세 절차:

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com

2. **Pages 프로젝트 선택**
   - **"Workers & Pages"** → **"cold-call-trainer"** 프로젝트 클릭

3. **Settings 메뉴 이동**
   - 프로젝트 상단 탭에서 **"Settings"** 클릭

4. **Environment Variables 섹션 찾기**
   - 좌측 메뉴에서 **"Environment Variables"** 클릭
   - 또는 설정 페이지를 아래로 스크롤하여 **"Environment Variables"** 섹션 찾기

5. **Production 환경변수 추가**

   **"Add variable"** 버튼을 클릭하고, 아래 변수들을 하나씩 추가합니다:

   | Variable name | Value |
   |--------------|-------|
   | `OPENAI_API_KEY` | `your_openai_api_key_here` (실제 키 입력) |
   | `ELEVENLABS_API_KEY` | `your_elevenlabs_api_key_here` (실제 키 입력) |
   | `ELEVENLABS_VOICE_ID` | `21m00Tcm4TlvDq8ikWAM` (또는 원하는 음성 ID) |

   **각 변수 입력 방법:**
   - Variable name: `OPENAI_API_KEY`
   - Value: (실제 API 키 붙여넣기)
   - **"Save"** 버튼 클릭
   - 다음 변수 추가를 위해 다시 **"Add variable"** 클릭

6. **Preview/Branch 환경변수 (선택사항)**
   
   Preview 배포에서도 테스트하려면:
   - **"Add variable"** 클릭
   - Environment를 **"Preview"** 또는 **"Production"** 선택
   - 동일한 변수 추가

7. **환경변수 입력 완료 후**

   아래에 실제 API 키를 확인하고 입력하세요:

   ```bash
   # 로컬에서 확인 (실제 값은 보안상 표시하지 않음)
   cd /Users/mac/Desktop/cold-call-trainer
   cat .env.local
   ```

   **중요:** `.env.local` 파일의 실제 값을 Cloudflare Dashboard에 입력하세요.

8. **재배포 트리거**
   
   환경변수 추가 후:
   - **"Workers & Pages"** → **"cold-call-trainer"** 프로젝트로 돌아가기
   - **"Deployments"** 탭 클릭
   - 최신 배포 옆의 **"⋯"** (점 3개) 메뉴 클릭
   - **"Retry deployment"** 또는 **"Redeploy"** 클릭
   
   또는:
   - GitHub에 새로운 커밋을 푸시하면 자동으로 재배포됩니다

---

## [4] 환경변수 템플릿

Cloudflare Pages → Settings → Environment Variables → Production에서 아래 변수들을 추가하세요:

```
OPENAI_API_KEY="실제_OpenAI_API_키_입력"
ELEVENLABS_API_KEY="실제_ElevenLabs_API_키_입력"
ELEVENLABS_VOICE_ID="21m00Tcm4TlvDq8ikWAM"
```

**참고:** `.env.local` 파일의 실제 값은 보안상 여기에 표시하지 않습니다.
로컬 파일을 확인하여 값을 복사하세요.

---

## [5] Next.js 15 → Cloudflare Pages 특별 설정

### ⚠️ 중요: API 라우트 변환 필요

현재 프로젝트는 Next.js API 라우트를 사용합니다:
- `/app/api/call/route.ts`
- `/app/api/voice/route.ts`
- `/app/api/feedback/route.ts`
- `/app/api/persona/route.ts`

Cloudflare Pages에서 이들을 작동시키려면:

#### 옵션 1: Cloudflare Pages Functions로 변환 (권장)

1. `functions/api/` 폴더 생성
2. 각 API 라우트를 Cloudflare Pages Functions 형식으로 변환
3. Edge Runtime 사용

#### 옵션 2: @cloudflare/next-on-pages 사용

```bash
npm install --save-dev @cloudflare/next-on-pages
```

`package.json`에 빌드 스크립트 추가:
```json
{
  "scripts": {
    "build": "next build",
    "pages:build": "npx @cloudflare/next-on-pages",
    "preview": "npm run pages:build && wrangler pages dev .vercel/output/static"
  }
}
```

Cloudflare Pages 빌드 설정:
- Build command: `npm run pages:build`
- Output directory: `.vercel/output/static`

---

## [6] 최종 체크리스트

배포 완료 확인:

- [ ] GitHub 리포지토리에 코드 푸시 완료
- [ ] Cloudflare Pages 프로젝트 생성 완료
- [ ] 빌드 설정 입력 완료 (Build command, Output directory)
- [ ] 환경변수 3개 모두 추가 완료
- [ ] 첫 배포 성공 확인
- [ ] 배포 URL 접속 테스트: `https://cold-call-trainer.pages.dev`
- [ ] API 라우트 작동 확인 (필요시 Functions 변환)

---

## [7] 문제 해결

### 빌드 실패 시:
1. Cloudflare Dashboard → Deployments → 실패한 배포 클릭
2. 빌드 로그 확인
3. 환경변수 누락 여부 확인
4. Node.js 버전 확인 (Cloudflare Pages는 자동 감지)

### API 라우트 작동 안 함:
- Next.js API 라우트는 Cloudflare Pages Functions로 변환이 필요합니다
- `functions/api/` 폴더에 변환된 함수 배치
- 또는 `@cloudflare/next-on-pages` 사용

---

## [8] 자동 배포 활성화

GitHub에 코드를 푸시하면 자동으로 Cloudflare Pages에 배포됩니다:
- `main` 브랜치에 푸시 → Production 배포
- 다른 브랜치에 푸시 → Preview 배포

자동 배포는 프로젝트 생성 시 기본으로 활성화됩니다.

---

**배포 완료 후 앱 접속:**
- Production: `https://cold-call-trainer.pages.dev`
- Custom Domain: (설정 시)

