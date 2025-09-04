#!/bin/bash
set -e  # stop if any command fails

echo "📦 Installing dependencies..."
npm install

echo "🧪 Installing Allure Playwright reporter..."
npm install -D allure-playwright

echo "📊 Installing Allure CLI globally..."
npm install -g allure-commandline --force

echo "🎭 Installing Playwright browsers..."
npx playwright install

echo "✅ Setup complete!"