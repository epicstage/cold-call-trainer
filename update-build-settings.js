#!/usr/bin/env node
/**
 * Cloudflare Pages 프로젝트 빌드 설정 업데이트
 */

const https = require('https');

const ACCOUNT_ID = "302d0c397fc8af9f8ec5744c45329f5c";
const PROJECT_NAME = "cold-call-trainer";

const buildConfig = {
  build_command: "npm run build:cf",
  destination_dir: ".vercel/output/static",
  root_dir: "",
  web_analytics_tag: null,
  web_analytics_token: null
};

console.log(`
╔══════════════════════════════════════════════════════════════╗
║     Cloudflare Pages 빌드 설정 업데이트                      ║
╚══════════════════════════════════════════════════════════════╝

프로젝트: ${PROJECT_NAME}
Account ID: ${ACCOUNT_ID}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

빌드 설정:
  - Build command: ${buildConfig.build_command}
  - Output directory: ${buildConfig.destination_dir}
  - Root directory: ${buildConfig.root_dir || "(비워두기)"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  참고: Cloudflare Pages 빌드 설정은 API로 직접 변경할 수 없습니다.
   wrangler CLI도 빌드 설정 변경을 지원하지 않습니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

다음 단계를 Dashboard에서 진행하세요:

1. https://dash.cloudflare.com/?to=/:account/pages/view/${PROJECT_NAME}
2. Settings → Builds & deployments
3. 빌드 설정 업데이트
4. Save

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

