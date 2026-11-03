#!/usr/bin/env bash
# One-time preparation of the AWS Lightsail server (Ubuntu 24.04) for Electrique Valley.
# Safe to run more than once. Does not touch MySQL data, nginx sites or DNS.
# Usage (as ubuntu):  bash deploy/setup-server.sh
set -euo pipefail

echo "==> Clean up the empty root pm2 daemon started by an earlier 'sudo pm2 list'"
if sudo bash -c 'command -v pm2' >/dev/null 2>&1; then sudo pm2 kill || true; fi

echo "==> Node.js 22 (NodeSource)"
if ! node -v 2>/dev/null | grep -q '^v22\.'; then
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

echo "==> ffmpeg (video conversion), certbot (HTTPS)"
sudo apt-get update -y
sudo apt-get install -y ffmpeg certbot python3-certbot-nginx

echo "==> pm2"
sudo npm install -g pm2

echo "==> Folders"
mkdir -p "$HOME/apps/electriquevalley" "$HOME/upload"
sudo mkdir -p /var/www/electriquevalley
sudo chown "$USER":"$USER" /var/www/electriquevalley

echo
echo "Versions:"
echo "  node   $(node -v)   (from $(command -v node))"
echo "  npm    $(npm -v)"
echo "  pm2    $(pm2 -v)"
echo "  nginx  $(nginx -v 2>&1 | cut -d/ -f2)"
echo "  mysql  $(mysql --version | awk '{print $3}')"
echo "  ffmpeg $(ffmpeg -version | head -1 | awk '{print $3}')"
if ! node -v | grep -q '^v22\.'; then
    echo "WARNING: 'node' is still not v22. An older Node (nvm?) may come first in PATH: check 'which -a node'."
fi
