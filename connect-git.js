#!/usr/bin/env node
/**
 * Cloudflare Pages 프로젝트에 Git 연결 및 빌드 설정
 */

const https = require('https');

const ACCOUNT_ID = "302d0c397fc8af9f8ec5744c45329f5c";
const PROJECT_NAME = "cold-call-trainer";
const REPO_OWNER = "epicstage";
const REPO_NAME = "cold-call-trainer";
const BRANCH = "main";

console.log(`
╔══════════════════════════════════════════════════════════════╗
║     Cloudflare Pages Git 연결 및 설정                        ║
╚══════════════════════════════════════════════════════════════╝

⚠️  참고: Git 연결은 Cloudflare Dashboard에서 해야 합니다.
   wrangler CLI나 API로는 OAuth 인증이 필요합니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

다음 단계를 Cloudflare Dashboard에서 진행하세요:

1. https://dash.cloudflare.com 접속
2. Workers & Pages → ${PROJECT_NAME} 클릭
3. Settings → Source → Connect to Git
4. GitHub 인증
5. ${REPO_OWNER}/${REPO_NAME} 선택

빌드 설정 (Settings → Builds & deployments):
- Build command: npm run build
- Output directory: .next
- Production branch: ${BRANCH}

환경변수 (Settings → Environment Variables):
- OPENAI_API_KEY
- ELEVENLABS_API_KEY
- ELEVENLABS_VOICE_ID

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

프로젝트 상태 확인:
`);

// 프로젝트 정보 확인
const { execSync } = require('child_process');
try {
  const result = execSync(`npx wrangler pages project list --format=json`, { encoding: 'utf8' });
  const projects = JSON.parse(result);
  const project = projects.find(p => p.name === PROJECT_NAME);
  
  if (project) {
    console.log(`✅ 프로젝트: ${project.name}`);
    console.log(`📦 URL: ${project.domains[0]}`);
    console.log(`🔗 Git Provider: ${project.source?.type || 'Not connected'}`);
  }
} catch (err) {
  console.log('프로젝트 정보 확인 중...');
}


