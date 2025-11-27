# 🚀 Cloudflare Pages 빠른 설정 가이드

## ⚡ 3단계로 끝내기

### 1️⃣ 일반 브라우저에서 Cloudflare Dashboard 접속

**⚠️ 자동화된 브라우저가 아닌 일반 Chrome/Safari 사용**

1. https://dash.cloudflare.com 접속
2. 로그인 (Google 계정)
3. 왼쪽 메뉴에서 **"Pages"** 클릭

---

### 2️⃣ 프로젝트 생성 (2분)

#### 2-1. 프로젝트 생성 시작
- **"Create a project"** 버튼 클릭
- **"Connect to Git"** 탭 선택 ⚠️ (중요!)

#### 2-2. GitHub 연결
- **GitHub** 선택
- **epicstage/cold-call-trainer** 리포지토리 선택
- **main** 브랜치 선택

#### 2-3. 빌드 설정
```
프로젝트 이름: cold-call-trainer
프레임워크 사전 설정: None (또는 Next.js)

빌드 설정:
  Build command: npm run build:cf
  Root directory: /
  Output directory: .vercel/output/static
  Node.js version: 20
```

#### 2-4. 저장 및 배포
- **"Save and Deploy"** 클릭
- 첫 빌드가 시작됩니다 (약 2-3분 소요)

---

### 3️⃣ 환경 변수 설정 (1분)

프로젝트 생성 후:

1. 프로젝트 페이지에서 **"Settings"** 탭 클릭
2. 왼쪽 메뉴에서 **"Environment variables"** 클릭
3. **"Add variable"** 버튼으로 아래 3개 추가:

#### Production 환경에 추가:

```
이름: OPENAI_API_KEY
값: [.env.local 파일의 값]
```

```
이름: ELEVENLABS_API_KEY
값: [.env.local 파일의 값]
```

```
이름: ELEVENLABS_VOICE_ID
값: [.env.local 파일의 값]
```

4. 각 변수 추가 후 **"Save"** 클릭

#### 5. 재배포
- 프로젝트 페이지로 돌아가기
- **"Retry deployment"** 또는 **"Redeploy"** 버튼 클릭

---

## ✅ 완료 체크리스트

- [ ] 프로젝트 생성됨 (Git 연결 방식)
- [ ] 빌드 설정 완료 (build:cf, output: .vercel/output/static)
- [ ] 환경 변수 3개 추가됨
- [ ] 재배포 완료
- [ ] 배포 URL에서 앱이 정상 작동

---

## 🔗 유용한 링크

- Dashboard: https://dash.cloudflare.com/?to=/:account/pages
- GitHub: https://github.com/epicstage/cold-call-trainer

---

## ⚠️ 문제 해결

### 빌드 실패 시
- Settings → Builds & deployments → Build command 확인
- Output directory가 `.vercel/output/static`인지 확인

### 환경 변수 미적용 시
- Settings → Environment variables에서 Production 체크 확인
- Redeploy 버튼 클릭하여 재배포

### 디자인이 안 보일 때
- 브라우저 캐시 삭제 (Cmd+Shift+R)
- Incognito 모드에서 확인

