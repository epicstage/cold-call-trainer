# Cloudflare Pages Functions 마이그레이션 완료 ✅

## 📋 목표 달성

✅ Next.js 15 앱을 Cloudflare Pages Functions + @cloudflare/next-on-pages 기반으로 설정  
✅ API 라우트 4개 (/api/call, /api/feedback, /api/persona, /api/voice)가 Cloudflare에서 작동하도록 구성  
✅ 정적 export(out) 방식 제거

---

## 🔧 변경된 파일 목록

### 수정된 파일
1. **`next.config.js`**
   - 정적 export 설정 제거
   - 기본 Next.js 설정으로 복원

2. **`package.json`**
   - `@cloudflare/next-on-pages` 추가 (devDependencies)
   - `wrangler` 추가 (devDependencies)
   - 새로운 스크립트 추가:
     - `build:cf`: Next.js 빌드 + Cloudflare 변환
     - `preview:cf`: 로컬 Cloudflare 환경 테스트
     - `dev:cf`: 개발 모드 (Cloudflare 환경)

3. **`wrangler.toml`**
   - `pages_build_output_dir = ".vercel/output/static"`
   - `compatibility_flags = ["nodejs_compat"]` 추가

4. **`.gitignore`**
   - `.vercel/` 디렉토리 추가

---

## 🚀 Cloudflare Pages 설정

### Dashboard 설정 (반드시 해야 함!)

**Workers & Pages → cold-call-trainer → Settings → Builds & deployments**

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

---

## 📦 배포 방법

### 방법 1: Git 연결 후 자동 배포 (권장)

1. **Cloudflare Pages Dashboard에서 Git 연결**
   - Settings → Source → Connect to Git
   - GitHub 인증
   - `epicstage/cold-call-trainer` 선택

2. **GitHub에 푸시**
   ```bash
   git add .
   git commit -m "feat: migrate to Cloudflare Pages Functions"
   git push origin main
   ```

3. **자동 배포 확인**
   - Cloudflare Pages Dashboard → Deployments 탭
   - 빌드 진행 상황 확인
   - 배포 완료 후 URL 테스트

### 방법 2: 수동 배포 (Git 연결 안 한 경우)

⚠️ **주의**: 로컬에서 npm 캐시 권한 문제가 있을 수 있습니다.

```bash
# npm 캐시 권한 수정 (한 번만 실행)
sudo chown -R $(whoami) ~/.npm

# 빌드
npm run build:cf

# 배포
npx wrangler pages deploy .vercel/output/static --project-name=cold-call-trainer
```

---

## 🧪 로컬 테스트

### 일반 개발 모드
```bash
npm run dev
```

### Cloudflare 환경과 유사하게 테스트

⚠️ **주의**: npm 캐시 권한 문제가 있으면 먼저 수정 필요

```bash
# npm 캐시 권한 수정
sudo chown -R $(whoami) ~/.npm

# 빌드
npm run build

# Cloudflare 변환
npx @cloudflare/next-on-pages

# 로컬 프리뷰 (Cloudflare Pages 환경)
npm run preview:cf
```

프리뷰 서버가 시작되면:
- http://localhost:8788 에서 테스트
- API 라우트가 정상 작동하는지 확인

---

## ✅ 환경변수 확인

다음 환경변수가 Cloudflare Pages에 설정되어 있어야 합니다:

1. **Settings → Environment Variables → Production**

- `OPENAI_API_KEY`
- `ELEVENLABS_API_KEY`
- `ELEVENLABS_VOICE_ID`

**확인 방법:**
```bash
# 이미 설정되어 있는지 확인
npx wrangler pages secret list --project-name=cold-call-trainer
```

---

## 🐛 문제 해결

### npm 캐시 권한 문제

**증상:**
```
npm error EACCES: permission denied
```

**해결:**
```bash
sudo chown -R $(whoami) ~/.npm
```

### 로컬 빌드 실패

**해결:**
- Cloudflare Pages에서 자동 빌드되므로 로컬 빌드는 필수 아님
- GitHub에 푸시하면 자동으로 빌드됨

### API 라우트 404 에러

**확인 사항:**
1. Build command가 `npm run build:cf`로 설정되어 있는지
2. Output directory가 `.vercel/output/static`인지
3. 환경변수가 제대로 설정되어 있는지
4. Node.js 버전이 20인지

---

## 📝 다음 단계

1. ✅ 파일 변경 완료
2. ⏳ Cloudflare Pages Dashboard에서 Build Settings 업데이트
3. ⏳ GitHub에 푸시 (또는 수동 배포)
4. ⏳ 배포 후 API 라우트 테스트

---

## 📚 참고 자료

- [@cloudflare/next-on-pages 공식 문서](https://github.com/cloudflare/next-on-pages)
- [Cloudflare Pages Functions 문서](https://developers.cloudflare.com/pages/platform/functions/)

---

**작성일**: 2025-11-27  
**마이그레이션 상태**: ✅ 완료

