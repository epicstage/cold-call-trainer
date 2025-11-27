/**
 * Cloudflare Pages 프로젝트 설정 스크립트
 * Git 연결 후 빌드 설정 및 환경변수를 추가합니다.
 */

const ACCOUNT_ID = "302d0c397fc8af9f8ec5744c45329f5c";
const PROJECT_NAME = "cold-call-trainer";

console.log(`
╔══════════════════════════════════════════════════════════════╗
║     Cloudflare Pages 프로젝트 설정 안내                      ║
╚══════════════════════════════════════════════════════════════╝

✅ 프로젝트 생성 완료: ${PROJECT_NAME}
📦 배포 URL: https://${PROJECT_NAME}.pages.dev

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

다음 단계 (Cloudflare Dashboard에서):

1️⃣  Git 연결
   - https://dash.cloudflare.com 접속
   - Workers & Pages → ${PROJECT_NAME} 선택
   - Settings → Source → Connect to Git
   - GitHub 인증 후 epicstage/cold-call-trainer 선택

2️⃣  빌드 설정
   - Settings → Builds & deployments
   - Build command: npm run build
   - Output directory: .next
   - Save

3️⃣  환경변수 설정
   - Settings → Environment Variables
   - Production 환경에 추가:
     * OPENAI_API_KEY
     * ELEVENLABS_API_KEY  
     * ELEVENLABS_VOICE_ID

4️⃣  첫 배포
   - Deployments 탭에서 "Retry deployment" 클릭

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

참고: Git 연결은 wrangler CLI로는 완전히 자동화할 수 없습니다.
Dashboard에서 수동으로 연결해야 합니다.

`);


