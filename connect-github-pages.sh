#!/bin/bash
# Cloudflare Pages 프로젝트에 GitHub 연결

ACCOUNT_ID="302d0c397fc8af9f8ec5744c45329f5c"
PROJECT_NAME="cold-call-trainer"
REPO_OWNER="epicstage"
REPO_NAME="cold-call-trainer"
BRANCH="main"

echo "========================================="
echo "Cloudflare Pages GitHub 연결"
echo "========================================="
echo ""
echo "프로젝트: $PROJECT_NAME"
echo "리포지토리: $REPO_OWNER/$REPO_NAME"
echo "브랜치: $BRANCH"
echo ""

# GitHub 연결을 위한 Cloudflare API 호출 시도
echo "⚠️  참고: Git 연결은 OAuth 인증이 필요합니다."
echo "   wrangler CLI나 API로 직접 연결하는 것은 제한적입니다."
echo ""
echo "다음 단계:"
echo "1. https://dash.cloudflare.com 접속"
echo "2. Workers & Pages → $PROJECT_NAME 선택"
echo "3. Settings → Source → Connect to Git"
echo "4. GitHub 인증 후 $REPO_OWNER/$REPO_NAME 선택"
echo ""

