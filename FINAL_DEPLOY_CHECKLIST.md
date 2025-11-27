# 🚀 최종 배포 체크리스트

## ✅ 완료된 항목

- ✅ 정적 export 제거
- ✅ @cloudflare/next-on-pages 설정 완료
- ✅ wrangler.toml 설정 완료
- ✅ package.json 빌드 스크립트 추가
- ✅ Git Push 완료 (main 브랜치)

---

## ⏳ 지금 바로 해야 할 일

### 1️⃣ Cloudflare Pages Build 설정 업데이트 (필수!)

**브라우저에서 실행:**

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com

2. **Workers & Pages → Pages → `cold-call-trainer`** 프로젝트 선택

3. **Settings → Builds & deployments** (또는 Build Settings) 클릭

4. **다음 설정 입력:**

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

5. **Save 버튼 클릭**

---

## 📋 배포 확인

### 배포 진행 확인

1. **Cloudflare Pages → `cold-call-trainer` → Deployments 탭**

2. **새 배포 확인:**
   - ✅ `npm run build:cf` 로그 확인
   - ✅ 초록불로 `Success` 표시 확인

3. **배포 완료 시간:**
   - 약 3-5분 소요

---

## 🧪 실전 테스트

### Production URL 테스트

배포 완료 후:

1. **Production URL 접속**
   - `https://cold-call-trainer.pages.dev`

2. **기능 테스트:**
   - ✅ 홈페이지 로드 확인
   - ✅ `/session` 페이지 접속
   - ✅ 온보딩 → 역할 선택
   - ✅ 고객 페르소나 생성 (AI 도움)
   - ✅ 레벨 확인
   - ✅ "통화 시작하기" 클릭

3. **통화 기능 테스트:**
   - ✅ 전화 연결음 (dial tone)
   - ✅ 마이크 권한 요청
   - ✅ 음성 인식 (STT)
   - ✅ AI 텍스트 응답
   - ✅ ElevenLabs 음성 재생 (TTS)
   - ✅ EXP 증가 확인

---

## 🐛 문제 발생 시

### 에러가 발생하면?

1. **브라우저 개발자도구 열기**
   - F12 또는 Cmd+Option+I

2. **Network 탭 확인**
   - 에러 발생한 API 요청 찾기
   - `/api/call`, `/api/voice`, `/api/feedback`, `/api/persona`

3. **에러 정보 수집:**
   - Status 코드 (500, 404, 403 등)
   - Response 내용
   - Console 에러 메시지

4. **스크린샷 찍어서 공유**

---

## ✅ 완료 기준

다음 기능들이 모두 정상 작동하면 완료:

- ✅ 홈페이지 접속
- ✅ 온보딩 화면
- ✅ 페르소나 생성 (AI)
- ✅ 통화 시작
- ✅ 전화 연결음
- ✅ 음성 인식 (STT)
- ✅ AI 응답 (텍스트)
- ✅ 음성 재생 (TTS)
- ✅ 피드백 리포트
- ✅ EXP 증가

---

**마지막 업데이트**: 2025-11-27  
**배포 상태**: ⏳ Build 설정 업데이트 대기 중

