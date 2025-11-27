#!/usr/bin/env node
/**
 * .env.local 파일에서 환경변수를 읽어서 Cloudflare Pages에 설정
 */

const fs = require('fs');
const { execSync } = require('child_process');

const PROJECT_NAME = 'cold-call-trainer';
const ENV_FILE = '.env.local';

console.log('📋 .env.local 파일에서 환경변수 읽는 중...\n');

// .env.local 파일 읽기
let envVars = {};
if (fs.existsSync(ENV_FILE)) {
  const content = fs.readFileSync(ENV_FILE, 'utf8');
  const lines = content.split('\n');
  
  lines.forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#') && line.includes('=')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').replace(/^["']|["']$/g, ''); // 따옴표 제거
      envVars[key.trim()] = value.trim();
    }
  });
}

console.log('✅ 찾은 환경변수:');
Object.keys(envVars).forEach(key => {
  console.log(`   - ${key}`);
});
console.log('');

// Cloudflare Pages에 환경변수 설정
const targetVars = ['OPENAI_API_KEY', 'ELEVENLABS_API_KEY', 'ELEVENLABS_VOICE_ID'];

console.log('🚀 Cloudflare Pages에 환경변수 설정 중...\n');

targetVars.forEach(varName => {
  if (envVars[varName]) {
    const value = envVars[varName];
    console.log(`설정 중: ${varName}...`);
    
    try {
      // wrangler pages secret put 명령어 사용
      execSync(
        `echo "${value}" | npx wrangler pages secret put ${varName} --project-name=${PROJECT_NAME}`,
        { stdio: 'inherit' }
      );
      console.log(`✅ ${varName} 설정 완료\n`);
    } catch (error) {
      console.log(`❌ ${varName} 설정 실패: ${error.message}\n`);
    }
  } else {
    console.log(`⚠️  ${varName}를 .env.local에서 찾을 수 없습니다.\n`);
  }
});

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('✨ 환경변수 설정 완료!\n');

