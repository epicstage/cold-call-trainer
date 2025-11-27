# 🚀 빠른 배포 가이드

## ✅ 현재 상태

- ✅ GitHub 리포지토리: `epicstage/cold-call-trainer` 생성 완료
- ✅ 코드 푸시: 완료
- ⏳ Cloudflare Pages 프로젝트 생성: 필요

---

## 📋 Cloudflare Pages 배포 (5분 안에 완료)

### 1단계: Cloudflare Dashboard 접속

👉 **https://dash.cloudflare.com** 접속

---

### 2단계: Pages 프로젝트 생성

1. 좌측 메뉴: **"Workers & Pages"** 클릭
2. **"Create application"** 버튼 클릭
3. **"Pages"** 선택
4. **"Connect to Git"** 클릭
5. **"GitHub"** 클릭하여 인증

---

### 3단계: 리포지토리 선택

1. 검색창에 `cold-call-trainer` 입력
2. **"epicstage/cold-call-trainer"** 선택
3. **"Begin setup"** 클릭

---

### 4단계: 빌드 설정 입력

**Project name:**
```
cold-call-trainer
```

**Production branch:**
```
main
```

**Framework preset:**
```
None
```

**Build command:**
```
npm run build
```

**Build output directory:**
```
.next
```

**Root directory:**
```
(비워두기)
```

---

### 5단계: 저장 및 배포

1. **"Save and Deploy"** 버튼 클릭
2. 첫 빌드 완료 대기 (약 2-3분)
3. 배포 URL 확인: `https://cold-call-trainer.pages.dev`

---

### 6단계: 환경변수 설정

1. 프로젝트 → **"Settings"** 탭
2. **"Environment Variables"** 클릭
3. 아래 3개 변수 추가:

#### 환경변수 목록:

```
OPENAI_API_KEY = (실제 OpenAI API 키)
ELEVENLABS_API_KEY = (실제 ElevenLabs API 키)
ELEVENLABS_VOICE_ID = 21m00Tcm4TlvDq8ikWAM
```

**실제 API 키 확인:**
```bash
cat /Users/mac/Desktop/cold-call-trainer/.env.local
```

4. 각 변수 추가 후 **"Save"**
5. **"Deployments"** 탭으로 이동
6. **"Redeploy"** 클릭

---

## ✅ 완료 체크리스트

- [ ] Cloudflare Pages 프로젝트 생성 완료
- [ ] 빌드 성공 확인
- [ ] 환경변수 3개 추가 완료
- [ ] 재배포 완료
- [ ] 배포 URL 접속 테스트: `https://cold-call-trainer.pages.dev`

---

## 📚 더 자세한 가이드

- **DEPLOY_CHECKLIST.md** - 단계별 상세 가이드
- **GITHUB_CLOUDFLARE_DEPLOY.md** - 전체 배포 문서


