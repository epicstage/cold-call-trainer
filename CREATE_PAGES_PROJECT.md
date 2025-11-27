# 🚀 Cloudflare Pages 프로젝트 생성 가이드

이미 **cold-call-trainer** Workers가 생성되어 있다면, Pages 프로젝트도 생성해야 합니다.

---

## 방법 1: Cloudflare Dashboard에서 생성 (가장 쉬움) ⭐

### 단계별 안내:

#### 1. Cloudflare Dashboard 접속
- https://dash.cloudflare.com 접속
- 로그인 확인

#### 2. Pages 메뉴로 이동
- 좌측 사이드바에서 **"Workers & Pages"** 클릭
- 또는 직접: https://dash.cloudflare.com/?to=/:account/pages

#### 3. Create a project 클릭
- 상단에 있는 **"Create application"** 버튼 클릭
- 또는 **"Create a project"** 버튼 클릭

#### 4. Git 연결 선택
- **"Connect to Git"** 버튼 클릭

#### 5. GitHub 인증
- **"GitHub"** 아이콘 클릭
- GitHub OAuth 인증 완료
- 권한 허용

#### 6. 리포지토리 선택
- 검색창에 `cold-call-trainer` 입력
- **"epicstage/cold-call-trainer"** 선택
- **"Begin setup"** 버튼 클릭

#### 7. 프로젝트 설정 입력

**Project name:**
```
cold-call-trainer
```

**Production branch:**
```
main
```

**Framework preset:**
```
None
```
(또는 드롭다운에서 "None" 선택)

#### 8. 빌드 설정 입력

**Build command:**
```
npm run build
```

**Build output directory:**
```
.next
```

**Root directory (optional):**
```
(비워두기)
```

**Functions directory (optional):**
```
functions
```
(나중에 API 라우트 변환 시 사용)

#### 9. 저장 및 배포
- **"Save and Deploy"** 버튼 클릭
- 첫 빌드 시작 (약 2-3분 소요)
- 배포 완료 후 URL 확인: `https://cold-call-trainer.pages.dev`

---

## 방법 2: Wrangler CLI로 생성 (고급)

Wrangler CLI가 설치되어 있고 로그인되어 있다면:

### 1. Wrangler 로그인 확인
```bash
cd /Users/mac/Desktop/cold-call-trainer
wrangler whoami
```

### 2. Pages 프로젝트 생성

```bash
# Pages 프로젝트 생성 (Git 연결 포함)
wrangler pages project create cold-call-trainer

# 또는 Git 연결 없이 생성 후 나중에 연결
wrangler pages deployment create --project-name=cold-call-trainer
```

**참고:** Wrangler CLI로 Pages 프로젝트를 생성해도 Git 연결은 Dashboard에서 해야 할 수 있습니다.

---

## 방법 3: Cloudflare API로 생성 (프로그래밍 방식)

Cloudflare API를 사용하여 Pages 프로젝트를 생성할 수 있습니다.

### 필요한 정보:
- Cloudflare Account ID
- Cloudflare API Token (Pages 권한 필요)

### API 호출 예시:

```bash
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "cold-call-trainer",
    "production_branch": "main"
  }'
```

---

## ⚠️ 중요: Next.js 15 → Cloudflare Pages 배포 참고

현재 프로젝트는 Next.js 15 App Router + API Routes를 사용합니다.
Cloudflare Pages에서 완전히 작동하려면 추가 설정이 필요할 수 있습니다.

### 옵션:

1. **@cloudflare/next-on-pages** 사용 (권장)
2. **Static Export + Cloudflare Pages Functions**
3. **Cloudflare Workers와 통합**

자세한 내용은 `DEPLOY_CHECKLIST.md` 파일 참고.

---

## 환경변수 설정 (프로젝트 생성 후)

Pages 프로젝트 생성 후:

1. 프로젝트 → **Settings** 탭
2. **Environment Variables** 클릭
3. 아래 변수 추가:
   - `OPENAI_API_KEY`
   - `ELEVENLABS_API_KEY`
   - `ELEVENLABS_VOICE_ID`

---

## ✅ 완료 체크리스트

- [ ] Cloudflare Dashboard 접속 완료
- [ ] Pages 프로젝트 생성 완료
- [ ] Git 연결 완료 (epicstage/cold-call-trainer)
- [ ] 빌드 설정 입력 완료
- [ ] 첫 배포 성공 확인
- [ ] 환경변수 3개 추가 완료
- [ ] 재배포 완료

---

**배포 URL:** `https://cold-call-trainer.pages.dev`

