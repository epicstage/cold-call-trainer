# Cloudflare Pages 마이그레이션 완료 요약

## ✅ 완료된 작업

### 1. 정적 export 설정 제거 ✅
- `next.config.js`에서 `output: 'export'` 제거
- 정적 빌드 디렉토리(`out/`) 삭제

### 2. @cloudflare/next-on-pages 설정 ✅
- `package.json`에 `@cloudflare/next-on-pages` 추가 (devDependencies)
- `package.json`에 빌드 스크립트 추가:
  - `build:cf`: Next.js 빌드 + Cloudflare 변환
  - `preview:cf`: 로컬에서 Cloudflare 환경 테스트
  - `dev:cf`: 개발 모드 (Cloudflare 환경)

### 3. wrangler.toml 업데이트 ✅
- `pages_build_output_dir = ".vercel/output/static"`
- `compatibility_flags = ["nodejs_compat"]` 추가

### 4. .gitignore 업데이트 ✅
- `.vercel/` 디렉토리 추가

## ⚠️ 현재 문제

npm 캐시 권한 문제로 인해 로컬에서 `@cloudflare/next-on-pages` 실행 시 vercel 패키지 설치가 실패합니다.

### 해결 방법 1: npm 캐시 권한 수정 (권장)

```bash
sudo chown -R $(whoami) ~/.npm
```

### 해결 방법 2: Cloudflare Pages에서 자동 빌드

GitHub에 푸시하면 Cloudflare Pages에서 자동으로 빌드되므로, 로컬 빌드가 필요 없습니다.

## 📋 Cloudflare Pages 설정

### Build Settings

1. **Build command:**
   ```
   npm run build:cf
   ```

2. **Output directory:**
   ```
   .vercel/output/static
   ```

3. **Root directory:**
   ```
   (비워두기)
   ```

4. **Node.js version:**
   ```
   20
   ```

## 🚀 배포 방법

### 방법 1: Git 연결 후 자동 배포 (권장)

1. Cloudflare Pages Dashboard에서 Git 연결
2. main 브랜치에 푸시하면 자동 배포

### 방법 2: 수동 배포

```bash
# 빌드 및 배포
npm run build:cf
npx wrangler pages deploy .vercel/output/static --project-name=cold-call-trainer
```

## 📝 변경된 파일 목록

1. `next.config.js` - 정적 export 제거
2. `package.json` - 빌드 스크립트 및 패키지 추가
3. `wrangler.toml` - output 디렉토리 및 호환성 플래그 설정
4. `.gitignore` - `.vercel/` 추가

## 🔧 로컬 테스트 (권한 수정 후)

```bash
# 1. Next.js 빌드
npm run build

# 2. Cloudflare 변환
npx @cloudflare/next-on-pages

# 3. 로컬 프리뷰
npm run preview:cf
```

## ✅ 확인 사항

- [ ] Cloudflare Pages Build command 설정
- [ ] Cloudflare Pages Output directory 설정  
- [ ] 환경변수 설정 확인 (OPENAI_API_KEY, ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID)
- [ ] Git 연결 또는 수동 배포

