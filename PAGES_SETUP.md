# 📄 Cloudflare Pages 프로젝트 생성 (상세 안내)

Workers 프로젝트 `cold-call-trainer`가 이미 생성되어 있다면, 이제 Pages 프로젝트도 생성해야 합니다.

---

## 🚀 빠른 시작 (3분 안에)

### Cloudflare Dashboard에서:

1. **접속:** https://dash.cloudflare.com
2. **Workers & Pages** 클릭 (좌측 메뉴)
3. **"Create application"** 버튼 클릭
4. **"Pages"** 선택
5. **"Connect to Git"** 클릭
6. **GitHub** 인증
7. **epicstage/cold-call-trainer** 선택
8. 빌드 설정 입력 후 **"Save and Deploy"**

---

## 📋 단계별 상세 안내

### 1단계: Cloudflare Dashboard 접속

👉 **https://dash.cloudflare.com** 브라우저에서 열기

---

### 2단계: Pages 메뉴 이동

**방법 A:**
- 좌측 사이드바에서 **"Workers & Pages"** 클릭
- 상단에 **"Overview"** 탭 표시 확인

**방법 B (직접 URL):**
- `https://dash.cloudflare.com/?to=/:account/pages` 접속

---

### 3단계: 프로젝트 생성 시작

1. 상단 또는 중앙에 있는 **"Create application"** 버튼 클릭
   - 또는 **"Create a project"** 버튼 클릭

2. 팝업에서:
   - **"Pages"** 탭 또는 옵션 선택
   - **"Connect to Git"** 버튼 클릭

---

### 4단계: GitHub 연결

1. **"GitHub"** 아이콘 클릭
2. GitHub OAuth 인증:
   - "Authorize Cloudflare Pages" 클릭
   - 필요시 비밀번호 입력
   - 2단계 인증 확인 (설정된 경우)
3. 권한 허용 완료

---

### 5단계: 리포지토리 선택

1. 리포지토리 목록에서 **"cold-call-trainer"** 검색
   - 검색창에 `cold-call-trainer` 입력

2. **"epicstage/cold-call-trainer"** 선택

3. **"Begin setup"** 또는 **"Install & Authorize"** 버튼 클릭

---

### 6단계: 프로젝트 기본 정보

**Project name:**
```
cold-call-trainer
```

**Production branch:**
```
main
```
(기본값으로 선택되어 있을 수 있음)

---

### 7단계: 빌드 설정

**Framework preset:**
- 드롭다운에서 **"None"** 선택

**Build command:**
```
npm run build
```

**Build output directory:**
```
.next
```

**Root directory (optional):**
```
(비워두기)
```

**Functions directory (optional):**
```
functions
```
(나중에 API 라우트를 Cloudflare Functions로 변환할 때 사용)

---

### 8단계: 환경변수 (나중에 설정)

이 단계에서는 건너뛰고, 프로젝트 생성 후 Settings에서 추가하세요.

---

### 9단계: 저장 및 배포

1. 화면 하단 **"Save and Deploy"** 버튼 클릭
2. 첫 빌드 시작:
   - 배포 로그 확인
   - 약 2-3분 소요
3. 배포 완료 확인:
   - 성공 또는 실패 상태 확인
   - **"View deployment"** 버튼 클릭

---

### 10단계: 배포 URL 확인

배포가 완료되면:

- 배포 URL: `https://cold-call-trainer-XXXXX.pages.dev`
- 또는 `https://cold-call-trainer.pages.dev`

URL을 클릭하여 접속 테스트 (API는 나중에 환경변수 설정 후 작동)

---

## 🔧 환경변수 설정 (배포 후 필수)

### Settings → Environment Variables

1. **cold-call-trainer** 프로젝트 클릭
2. **Settings** 탭 클릭
3. 좌측 메뉴: **"Environment Variables"** 클릭
4. **"Add variable"** 클릭하여 3개 추가:

| Variable name | Value |
|--------------|-------|
| `OPENAI_API_KEY` | (실제 OpenAI API 키) |
| `ELEVENLABS_API_KEY` | (실제 ElevenLabs API 키) |
| `ELEVENLABS_VOICE_ID` | `21m00Tcm4TlvDq8ikWAM` |

**실제 API 키 확인:**
```bash
cat /Users/mac/Desktop/cold-call-trainer/.env.local
```

5. 각 변수 저장 후
6. **Deployments** 탭으로 이동
7. **Redeploy** 클릭

---

## ✅ 완료 체크리스트

- [ ] Cloudflare Dashboard 접속 완료
- [ ] Pages 프로젝트 생성 완료
- [ ] Git 연결 완료 (epicstage/cold-call-trainer)
- [ ] 빌드 설정 입력 완료
- [ ] 첫 배포 성공 확인
- [ ] 배포 URL 확인
- [ ] 환경변수 3개 추가 완료
- [ ] 재배포 완료
- [ ] 배포 URL 접속 테스트

---

## ⚠️ 참고: Next.js API 라우트

현재 프로젝트는 서버 API를 사용하므로, Cloudflare Pages에서 완전히 작동하려면 추가 설정이 필요할 수 있습니다.

자세한 내용은 `DEPLOY_CHECKLIST.md` 참고.

---

**배포 완료 후 URL:** `https://cold-call-trainer.pages.dev`


