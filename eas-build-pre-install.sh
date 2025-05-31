#!/bin/bash
echo "🔧 Forcing npm install with --legacy-peer-deps"
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
