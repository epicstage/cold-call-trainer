# Cloudflare Pages 빌드 설정 상태

## ✅ 완료된 작업

1. **GitHub Actions Workflow 업데이트**
   - ✅ Build command: `npm run build:cf`
   - ✅ Output directory: `.vercel/output/static`
   - ✅ GitHub에 푸시 완료

2. **코드 변경사항 푸시 완료**
   - ✅ 마이그레이션 커밋 푸시 완료
   - ✅ Workflow 업데이트 커밋 푸시 완료

---

## ⚠️ 현재 상황

**Cloudflare Pages의 빌드 설정은 CLI나 API로 직접 변경할 수 없습니다.**

이는 보안상의 이유로, Dashboard에서만 설정 가능합니다.

---

## 📋 해야 할 일 (Dashboard에서)

### Cloudflare Dashboard 접속

👉 **https://dash.cloudflare.com/?to=/:account/pages/view/cold-call-trainer**

### Build Settings 업데이트

1. **Settings** 탭 클릭
2. **Builds & deployments** 클릭
3. 다음 값 입력:

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

4. **Save** 버튼 클릭

---

## 🚀 설정 후 자동 배포

빌드 설정을 저장하면:

- ✅ 자동으로 새 배포가 시작됩니다
- ✅ Deployments 탭에서 진행 상황 확인 가능
- ✅ 약 3-5분 후 배포 완료

---

## ✅ 확인 방법

배포가 완료되면:

1. **Production URL 접속**
   - `https://cold-call-trainer.pages.dev`

2. **기능 테스트**
   - 홈페이지 확인
   - `/session` 페이지 확인
   - 통화 기능 테스트

---

**마지막 업데이트**: 2025-11-27  
**상태**: ⏳ Dashboard 빌드 설정 대기 중

