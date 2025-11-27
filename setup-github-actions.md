# GitHub Actions 자동 배포 설정

GitHub Actions를 통해 Cloudflare Pages에 자동 배포를 설정합니다.

## 1단계: Cloudflare API 토큰 생성

1. **Cloudflare Dashboard** 접속: https://dash.cloudflare.com/profile/api-tokens

2. **Create Token** 클릭

3. **Create Custom Token** 선택

4. 다음 권한 설정:
   - **Account** > **Cloudflare Pages** > **Edit**
   - **Zone** > **Zone Settings** > **Read** (선택사항)

5. **Account Resources**에서:
   - **Include** > **Specific account** > `Pd@epicstage.co.kr's Account` 선택

6. **Continue to summary** > **Create Token** 클릭

7. 생성된 토큰을 복사 (⚠️ 한 번만 표시되므로 안전하게 보관)

## 2단계: GitHub Secrets 설정

1. **GitHub 저장소** 접속: https://github.com/epicstage/cold-call-trainer

2. **Settings** > **Secrets and variables** > **Actions** 클릭

3. **New repository secret** 클릭하여 다음 Secrets 추가:

   ### Secret 1: CLOUDFLARE_API_TOKEN
   - **Name**: `CLOUDFLARE_API_TOKEN`
   - **Value**: 1단계에서 생성한 Cloudflare API 토큰
   - **Add secret** 클릭

   ### Secret 2: CLOUDFLARE_ACCOUNT_ID
   - **Name**: `CLOUDFLARE_ACCOUNT_ID`
   - **Value**: `302d0c397fc8af9f8ec5744c45329f5c`
   - **Add secret** 클릭

   ### Secret 3: OPENAI_API_KEY (이미 있으면 생략)
   - **Name**: `OPENAI_API_KEY`
   - **Value**: OpenAI API 키

   ### Secret 4: ELEVENLABS_API_KEY (이미 있으면 생략)
   - **Name**: `ELEVENLABS_API_KEY`
   - **Value**: ElevenLabs API 키

   ### Secret 5: ELEVENLABS_VOICE_ID (이미 있으면 생략)
   - **Name**: `ELEVENLABS_VOICE_ID`
   - **Value**: `21m00Tcm4TlvDq8ikWAM`

## 3단계: GitHub Actions Workflow 파일 확인

`.github/workflows/deploy-cloudflare-pages.yml` 파일이 생성되었습니다.

## 4단계: 확인

1. GitHub에 푸시하면 자동으로 `cold-call-trainer` 프로젝트에 배포됩니다.

2. 배포 상태 확인:
   - GitHub 저장소의 **Actions** 탭에서 확인
   - Cloudflare Dashboard > **cold-call-trainer** > **Deployments**에서 확인

## 참고

- `GITHUB_TOKEN`은 자동으로 제공되므로 별도 설정 불필요
- main 브랜치에 푸시할 때마다 자동 배포됩니다
- 배포 URL: https://cold-call-trainer.pages.dev

