# Cloudflare Pages 배포 가이드

이 문서는 콜드콜 트레이너 앱을 GitHub → Cloudflare Pages로 배포하는 전체 과정을 안내합니다.

## ⚠️ 중요 사전 준비

Next.js 15 App Router를 Cloudflare Pages에서 실행하려면 다음 중 하나의 방법을 사용해야 합니다:

1. **Static Export 방식** (권장하지 않음 - 서버 기능 불가)
2. **Cloudflare Pages Functions + Next.js Edge Runtime** (권장)
3. **@cloudflare/next-on-pages** 사용 (권장)

현재 프로젝트는 서버 API 라우트(`/api/call`, `/api/voice`, `/api/feedback`)를 사용하므로, 
Cloudflare Pages Functions를 통해 배포해야 합니다.

## 📋 배포 체크리스트

- [ ] GitHub 리포 생성 및 코드 푸시
- [ ] Cloudflare Pages 프로젝트 생성
- [ ] 환경변수 설정
- [ ] 빌드 설정 확인
- [ ] 첫 배포 완료

