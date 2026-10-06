#!/usr/bin/env bash
# Déploie le site en prod sur le VPS (eventdress.fr).
# Usage : ./deploy.sh   (depuis la racine du projet)

set -euo pipefail

SSH_KEY="$HOME/.ssh/eventdress_vps"
VPS_HOST="ubuntu@57.129.77.123"
REMOTE_TMP="~/eventdress-dist-new"
REMOTE_DIR="/var/www/eventdress"

echo "==> Build du site..."
npm run build

echo "==> Envoi vers le VPS..."
ssh -i "$SSH_KEY" "$VPS_HOST" "rm -rf $REMOTE_TMP"
scp -i "$SSH_KEY" -r dist "$VPS_HOST:$REMOTE_TMP"

echo "==> Envoi de l'API PHP..."
ssh -i "$SSH_KEY" "$VPS_HOST" "rm -rf ~/eventdress-api-new && mkdir -p ~/eventdress-api-new"
scp -i "$SSH_KEY" -r api/auth api/lib "$VPS_HOST:~/eventdress-api-new/"

echo "==> Mise en place sur le serveur..."
ssh -i "$SSH_KEY" "$VPS_HOST" "
  set -e
  sudo rm -rf $REMOTE_DIR.old
  sudo mv $REMOTE_DIR $REMOTE_DIR.old
  sudo mv $REMOTE_TMP $REMOTE_DIR
  sudo mkdir -p $REMOTE_DIR/api
  sudo cp -r ~/eventdress-api-new/auth ~/eventdress-api-new/lib $REMOTE_DIR/api/
  sudo chown -R www-data:www-data $REMOTE_DIR
  sudo chmod -R 755 $REMOTE_DIR
  sudo rm -rf $REMOTE_DIR.old ~/eventdress-api-new
"

echo "==> Terminé. https://eventdress.fr est à jour."
