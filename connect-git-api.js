#!/usr/bin/env node
/**
 * Cloudflare Pages 프로젝트에 GitHub 연결 시도
 * 참고: Git 연결은 OAuth 인증이 필요하므로 Dashboard에서 하는 것이 가장 안전합니다.
 */

const https = require('https');
const { execSync } = require('child_process');

const ACCOUNT_ID = "302d0c397fc8af9f8ec5744c45329f5c";
const PROJECT_NAME = "cold-call-trainer";
const REPO_OWNER = "epicstage";
const REPO_NAME = "cold-call-trainer";
const BRANCH = "main";

console.log(`
╔══════════════════════════════════════════════════════════════╗
║     Cloudflare Pages GitHub 연결                              ║
╚══════════════════════════════════════════════════════════════╝

프로젝트: ${PROJECT_NAME}
리포지토리: ${REPO_OWNER}/${REPO_NAME}
브랜치: ${BRANCH}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  GitHub 연결은 OAuth 인증이 필요하므로 Dashboard에서 진행해야 합니다.

하지만 GitHub Actions를 통해 자동 배포를 설정할 수 있습니다!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// 현재 프로젝트 상태 확인
try {
  const result = execSync(`npx wrangler pages project list`, { encoding: 'utf8' });
  console.log('현재 Pages 프로젝트 상태:');
  const lines = result.split('\n').filter(line => line.includes(PROJECT_NAME));
  if (lines.length > 0) {
    console.log(lines[0]);
    if (lines[0].includes('Yes')) {
      console.log('\n✅ 이미 Git 연결되어 있습니다!');
      process.exit(0);
    }
  }
} catch (err) {
  console.log('프로젝트 상태 확인 중...');
}

console.log(`
📋 다음 옵션:

옵션 1: Dashboard에서 수동 연결 (권장)
   → https://dash.cloudflare.com/?to=/:account/pages/view/${PROJECT_NAME}
   → Settings → Source → Connect to Git

옵션 2: GitHub Actions로 자동 배포 설정
   → GitHub Actions workflow 파일 생성
   → main 브랜치 푸시 시 자동 배포

어떤 방법을 원하시나요?
`);

