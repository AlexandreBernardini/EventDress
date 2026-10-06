# READMEVPS.md — Infos VPS (Multi-sites)

Ce VPS peut héberger **plusieurs sites** simultanément via les virtual hosts Nginx (un bloc `server` par domaine, même IP `57.129.77.123`).

**Sites hébergés :**
- `empire-du-chanvre.fr` → `/var/www/empire-du-chanvre/` ✅ en ligne
- `eventdress.fr` → à déployer (DNS pointe encore vers OVH mutualisé — voir section ci-dessous)

---

## Accès SSH

```bash
ssh ubuntu@57.129.77.123
```

- **IP** : `57.129.77.123`
- **Utilisateur** : `ubuntu`
- **OS** : Ubuntu (OVH VPS)

---

## Arborescence sur le VPS

```
/var/www/empire-du-chanvre/       → Racine du site (fichiers statiques React)
/var/www/empire-du-chanvre/api/   → Scripts PHP (ex: create-payment-intent.php)
/etc/nginx/sites-available/empire-du-chanvre  → Config Nginx
/etc/postfix/main.cf              → Config email Postfix
```

---

## Nginx

- **Config** : `/etc/nginx/sites-available/empire-du-chanvre`
- **PHP** : `php8.4-fpm`
- Le site sert les fichiers React statiques + proxifie `/api/*.php` vers PHP-FPM
- Commandes utiles :

```bash
sudo nginx -t                          # Vérifier la config
sudo systemctl reload nginx            # Recharger sans coupure
sudo systemctl restart nginx           # Redémarrer
sudo cat /var/log/nginx/error.log      # Logs d'erreur
```

---

## Déploiement (depuis le PC)

### 1. Build + envoi

```bash
# Sur le PC (dans le dossier du projet)
npm run build
scp -r dist ubuntu@57.129.77.123:~/new-distN    # remplacer N par un numéro incrémental
```

### 2. Mise en place sur le VPS

```bash
ssh ubuntu@57.129.77.123

sudo cp -r ~/new-distN/* /var/www/empire-du-chanvre/
sudo chown -R www-data:www-data /var/www/empire-du-chanvre/
sudo chmod -R 755 /var/www/empire-du-chanvre/

# ⚠️ OBLIGATOIRE après chaque déploiement — re-saisir la clé Stripe
nano /var/www/empire-du-chanvre/api/create-payment-intent.php
# → Remplacer la valeur de STRIPE_SECRET_KEY par sk_test_... ou sk_live_...
# → Ctrl+X → Y → Entrée
```

> **Règle de sécurité absolue** : La clé secrète Stripe (`sk_test_` / `sk_live_`) ne doit **jamais** être dans `.env` ni dans git. Elle se saisit uniquement à la main sur le VPS dans le fichier PHP. Chaque déploiement écrase le fichier PHP depuis le repo — il faut donc **toujours** re-saisir la clé après un déploiement.

---

## Email — Postfix

- **MTA** : Postfix
- **Config** : `/etc/postfix/main.cf`

### Paramètres clés configurés

```ini
myhostname = empire-du-chanvre.fr
myorigin = empire-du-chanvre.fr
inet_protocols = ipv4        # Force IPv4 (l'IPv6 du VPS n'est pas dans le SPF)
```

### Pourquoi ces réglages

- Gmail vérifie le SPF du domaine indiqué dans l'enveloppe FROM — si Postfix envoie depuis `vps-0022c1ab.vps.ovh.net`, Gmail rejette (DSN 5.7.26)
- L'IPv6 du VPS (`2001:41d0:701:1100::22a1`) n'est pas dans le SPF d'`empire-du-chanvre.fr` → on force IPv4

### Commandes utiles

```bash
sudo systemctl restart postfix          # Redémarrer Postfix
sudo systemctl status postfix           # Statut
sudo tail -f /var/log/mail.log          # Logs en temps réel
```

### État actuel des emails

- ✅ Emails reçus (dans le dossier Spam Gmail pour l'instant)
- ❌ DKIM non configuré → raison du classement en spam
- Pour sortir des spams : configurer OpenDKIM + ajouter un enregistrement DNS TXT

---

## Stripe

- **Fichier PHP** : `/var/www/empire-du-chanvre/api/create-payment-intent.php`
- **Clé publique** (`pk_...`) : dans `.env` du projet → variable `VITE_STRIPE_PUBLISHABLE_KEY`
- **Clé secrète** (`sk_...`) : à saisir **manuellement** sur le VPS dans le fichier PHP ci-dessus (ne jamais la mettre dans git)
- Actuellement en mode **test** (`sk_test_...`)
- Pour passer en live : vérifier l'entreprise sur le dashboard Stripe → remplacer par `sk_live_...` + `pk_live_...`

---

## Sanity Studio

Le Studio Sanity est hébergé sur Sanity (pas sur le VPS).

```bash
# Déployer le Studio (toujours depuis le sous-dossier studio/ !)
cd studio && npx sanity deploy
# → Sélectionner le hostname : empire-du-chanvre
```

> **Attention** : Ne jamais lancer `npx sanity deploy` depuis la racine du projet — ça écrase le site avec le Studio Sanity.

---

## DNS & SPF

- **Domaine** : `empire-du-chanvre.fr`
- **SPF record** : contient l'IPv4 du VPS (`57.129.77.123`)
- L'IPv6 du VPS n'est **pas** dans le SPF (et n'a pas besoin de l'être grâce à `inet_protocols = ipv4`)

---

## Ajouter un nouveau site sur le VPS (ex: eventdress.fr)

### Étape 1 — DNS (chez le registrar)
Changer le record A de `eventdress.fr` : `eventde.cluster129.hosting.ovh.net` → `57.129.77.123`

### Étape 2 — Dossier sur le VPS
```bash
sudo mkdir -p /var/www/eventdress
sudo chown -R ubuntu:ubuntu /var/www/eventdress
```

### Étape 3 — Virtual host Nginx
```bash
sudo nano /etc/nginx/sites-available/eventdress
```
Contenu minimal pour un site React (SPA) :
```nginx
server {
    listen 80;
    server_name eventdress.fr www.eventdress.fr;
    root /var/www/eventdress;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/eventdress /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### Étape 4 — HTTPS (Let's Encrypt)
```bash
sudo certbot --nginx -d eventdress.fr -d www.eventdress.fr
```

---

## Tâches VPS en attente

- [ ] **DKIM** : configurer OpenDKIM sur le VPS + enregistrement DNS TXT pour sortir des spams
- [ ] **Stripe live** : remplacer les clés test par les clés live une fois la vérification Stripe terminée
