# Cloudflare Pages 빌드 설정 가이드

## ⚠️ 중요: CLI로 빌드 설정 변경 불가

Cloudflare Pages의 빌드 설정(Build command, Output directory 등)은 보안상의 이유로 CLI나 API로 직접 변경할 수 없습니다.

Dashboard에서만 설정 가능합니다.

---

## 📋 Dashboard 설정 방법 (5분)

### 1. Cloudflare Dashboard 접속

👉 **https://dash.cloudflare.com**

### 2. 프로젝트 선택

- **Workers & Pages** → **Pages** → **`cold-call-trainer`** 클릭

### 3. Build Settings 열기

- 상단 탭에서 **Settings** 클릭
- 좌측 메뉴에서 **Builds & deployments** 클릭

### 4. 빌드 설정 입력

다음 값들을 입력하세요:

#### Build command
```
npm run build:cf
```

#### Build output directory
```
.vercel/output/static
```

#### Root directory
```
(비워두기 - 아무것도 입력하지 않음)
```

#### Node.js version
```
20
```
(드롭다운 메뉴에서 선택)

### 5. 저장

- 화면 하단 또는 상단의 **Save** 버튼 클릭

---

## 🚀 설정 후 자동 배포

빌드 설정을 저장하면:

1. **자동으로 새 배포가 시작됩니다**
   - Git 연결이 되어 있으면 최신 커밋 기준으로 빌드
   - Git 연결이 안 되어 있으면 마지막 배포 기준으로 재빌드

2. **Deployments 탭에서 확인**
   - 빌드 진행 상황 확인
   - 로그 확인
   - 성공/실패 여부 확인

---

## ✅ 확인 방법

빌드 설정이 올바르게 적용되었는지 확인:

1. **Settings → Builds & deployments** 다시 확인
   - 입력한 값들이 그대로 있는지 확인

2. **Deployments 탭**에서 새 배포 확인
   - 빌드 로그에 `npm run build:cf` 명령이 실행되는지 확인
   - 빌드가 성공하는지 확인

---

## 🔗 바로 가기

**프로젝트 설정 페이지:**
https://dash.cloudflare.com/?to=/:account/pages/view/cold-call-trainer

**Build Settings 페이지:**
https://dash.cloudflare.com/?to=/:account/pages/view/cold-call-trainer/settings/builds

---

## 📝 참고

- 빌드 설정은 프로젝트별로 저장됩니다
- 설정을 변경하면 자동으로 새 배포가 시작됩니다
- Git 연결이 되어 있으면 main 브랜치 기준으로 빌드됩니다

