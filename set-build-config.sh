#!/bin/bash

echo "========================================="
echo "Cloudflare Pages 빌드 설정 업데이트"
echo "========================================="
echo ""
echo "⚠️  Cloudflare Pages의 빌드 설정은 Dashboard에서만 변경 가능합니다."
echo ""
echo "하지만 GitHub Actions를 통해 자동 배포되도록 설정할 수 있습니다!"
echo ""

# GitHub Actions workflow 파일 확인
if [ -f ".github/workflows/deploy-cloudflare-pages.yml" ]; then
  echo "✅ GitHub Actions workflow 파일이 이미 있습니다."
  echo "   이 workflow가 올바른 빌드 명령을 사용하는지 확인하겠습니다..."
  echo ""
  
  # workflow 파일 확인
  if grep -q "npm run build:cf" .github/workflows/deploy-cloudflare-pages.yml; then
    echo "✅ workflow 파일에 올바른 빌드 명령이 설정되어 있습니다."
  else
    echo "⚠️  workflow 파일 업데이트가 필요합니다."
  fi
else
  echo "⚠️  GitHub Actions workflow 파일이 없습니다."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Dashboard에서 설정할 값:"
echo ""
echo "Build command: npm run build:cf"
echo "Output directory: .vercel/output/static"
echo "Root directory: (비워두기)"
echo "Node.js version: 20"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔗 바로 가기:"
echo "https://dash.cloudflare.com/?to=/:account/pages/view/cold-call-trainer"
echo ""

