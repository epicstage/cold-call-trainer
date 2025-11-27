#!/bin/bash
# Cloudflare Pages 프로젝트에 Git 연결 설정 스크립트

ACCOUNT_ID="302d0c397fc8af9f8ec5744c45329f5c"
PROJECT_NAME="cold-call-trainer"
REPO_OWNER="epicstage"
REPO_NAME="cold-call-trainer"
BRANCH="main"

echo "========================================="
echo "Cloudflare Pages Git 연결 설정"
echo "========================================="
echo ""
echo "프로젝트: $PROJECT_NAME"
echo "리포지토리: $REPO_OWNER/$REPO_NAME"
echo "브랜치: $BRANCH"
echo ""

# Note: Git 연결은 Cloudflare Dashboard에서 해야 합니다.
# wrangler CLI로는 Git 연결이 제한적입니다.
echo "⚠️  Git 연결은 Cloudflare Dashboard에서 해야 합니다."
echo ""
echo "다음 단계:"
echo "1. https://dash.cloudflare.com 접속"
echo "2. Workers & Pages → cold-call-trainer 프로젝트 선택"
echo "3. Settings → Source → Connect to Git"
echo "4. GitHub 인증 후 epicstage/cold-call-trainer 선택"
echo ""
echo "빌드 설정:"
echo "- Build command: npm run build"
echo "- Output directory: .next"
echo ""


