# Cloudflare Pages 프로젝트 생성 문제 해결

## 현재 상황

프로젝트가 생성되지 않았습니다. Dashboard에서 직접 생성해야 합니다.

## 해결 방법

### 방법 1: Dashboard에서 "Connect to Git"으로 생성 (권장)

1. **Dashboard 접속**
   - https://dash.cloudflare.com/
   - 좌측 메뉴: **Workers & Pages** 클릭
   - 상단 탭: **Pages** 클릭

2. **프로젝트 생성 버튼 찾기**
   - 페이지 상단 오른쪽에 **"Create a project"** 또는 **"Create application"** 버튼 클릭
   - 또는 빈 상태라면 중앙의 **"Get started"** 버튼 클릭

3. **"Connect to Git" 선택**
   - 두 개의 탭이 보입니다:
     - **"Connect to Git"** ← 이걸 선택!
     - "Upload assets" (선택하지 않음)

4. **GitHub 연결**
   - **GitHub** 선택
   - 권한 승인 팝업에서 **"Authorize Cloudflare Pages"** 클릭
   - 리포지토리 선택: `epicstage/cold-call-trainer`
   - 브랜치 선택: `main`

5. **빌드 설정**
   - **Project name**: `cold-call-trainer`
   - **Production branch**: `main`
   - **Build command**: `npm run build:cf`
   - **Build output directory**: `.vercel/output/static`
   - **Root directory**: (비워두기)
   - **Node.js version**: `20`

6. **"Save and Deploy"** 클릭

### 방법 2: 문제 해결

만약 "Create a project" 버튼이 보이지 않는다면:

1. **다른 계정으로 로그인되어 있는지 확인**
2. **올바른 계정(Organization) 선택 확인**
3. **브라우저 캐시 삭제 후 재시도**
4. **다른 브라우저로 시도**

## 환경 변수 설정

프로젝트 생성 후 Settings → Environment variables:

1. **OPENAI_API_KEY**
   ```
   [YOUR_OPENAI_API_KEY]
   ```

2. **ELEVENLABS_API_KEY**
   ```
   sk_7701f7542ac91d62fdd52d7bf314d3490e6c9f7f16e2336c
   ```

3. **ELEVENLABS_VOICE_ID**
   ```
   21m00Tcm4TlvDq8ikWAM
   ```

## 확인 방법

프로젝트 생성 후:
- https://dash.cloudflare.com/?to=/:account/pages/view/cold-call-trainer 접속
- 프로젝트가 보이면 성공!


