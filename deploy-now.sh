#!/bin/bash
echo "=== Cloudflare Pages 배포 시작 ==="
echo ""

PROJECT_NAME="cold-call-trainer"

# Next.js는 API 라우트가 있으므로 @cloudflare/next-on-pages가 필요합니다
# 하지만 일단 .next 디렉토리를 배포해봅니다
echo "배포 방법 1: .next 디렉토리 직접 배포 시도..."
npx wrangler pages deploy .next --project-name=$PROJECT_NAME 2>&1 | tail -20

