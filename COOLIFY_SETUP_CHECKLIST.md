# Coolify Setup Checklist - Step-by-Step

**Use this checklist alongside `COOLIFY_COMPLETE_GUIDE.md` for detailed instructions.**

## Pre-Deployment

### Server Setup
- [ ] VPS server purchased (Hetzner/DigitalOcean/Linode)
- [ ] Server specs: 2+ CPU, 4+ GB RAM, 20+ GB storage
- [ ] Ubuntu 22.04 LTS installed
- [ ] SSH access configured
- [ ] Firewall configured (ports 22, 80, 443)

### Coolify Installation
- [ ] Coolify installed on server
- [ ] Coolify accessible at `http://your-server-ip:8000`
- [ ] Admin credentials saved
- [ ] Domain configured (optional)

## Database Provisioning

### PostgreSQL
- [ ] PostgreSQL service created in Coolify
- [ ] Service name: `medusa-postgres`
- [ ] Database name: `cubitstore`
- [ ] Database user: `medusa`
- [ ] Strong password generated and saved
- [ ] PostgreSQL deployed and running
- [ ] Internal connection URL noted

### Redis
- [ ] Redis service created in Coolify
- [ ] Service name: `medusa-redis`
- [ ] Strong password generated and saved
- [ ] Redis deployed and running
- [ ] Internal connection URL noted

## Medusa Backend Deployment

### Application Setup
- [ ] New Dockerfile application created
- [ ] Git repository connected
- [ ] Branch selected (main/master)
- [ ] Dockerfile path: `backend/Dockerfile`
- [ ] Build context: `backend/`
- [ ] Port: `9000` configured

### Environment Variables
- [ ] `NODE_ENV=production`
- [ ] `STORE_CORS` (storefront domain)
- [ ] `ADMIN_CORS` (admin domain)
- [ ] `AUTH_CORS` (both domains)
- [ ] `DATABASE_URL` (using `medusa-postgres` internal name)
- [ ] `DB_NAME=cubitstore`
- [ ] `REDIS_URL` (using `medusa-redis` internal name)
- [ ] `JWT_SECRET` (32+ characters, strong)
- [ ] `COOKIE_SECRET` (32+ characters, strong)
- [ ] `ADMIN_URL` (full URL with /app)
- [ ] `MEDUSA_BACKEND_URL` (base URL)
- [ ] `MEDUSA_WORKER_MODE=server`
- [ ] `DISABLE_MEDUSA_ADMIN=false`
- [ ] `SMTP_HOST`
- [ ] `SMTP_PORT=465`
- [ ] `SMTP_SECURE=true`
- [ ] `SMTP_USER`
- [ ] `SMTP_PASS`
- [ ] `SMTP_FROM`
- [ ] `OPENAI_API_KEY` (optional)
- [ ] `AUTO_GENERATE_DESCRIPTIONS=false` (optional)

### Pre-Deploy Configuration
- [ ] Pre-deploy command configured:
  ```bash
  yarn install && yarn build:admin && yarn medusa migrations run
  ```

### Domain & SSL
- [ ] Domain added: `admin.yourdomain.com`
- [ ] DNS A record configured: `admin.yourdomain.com` → server IP
- [ ] SSL certificate generation enabled
- [ ] SSL certificate generated successfully

### Deployment
- [ ] Application deployed
- [ ] Build completed successfully
- [ ] Application running
- [ ] Health check passing

## Post-Deployment

### Verification
- [ ] Health endpoint: `https://admin.yourdomain.com/health` → 200 OK
- [ ] Admin panel: `https://admin.yourdomain.com/app` → accessible
- [ ] Store API: `https://admin.yourdomain.com/store` → accessible
- [ ] Admin API: `https://admin.yourdomain.com/admin` → accessible

### Database Setup
- [ ] Migrations run successfully
- [ ] Database tables created
- [ ] No migration errors

### Admin User
- [ ] Admin user created
- [ ] Can login to admin panel
- [ ] Admin permissions verified

### Publishable API Key
- [ ] Logged into admin panel
- [ ] Navigated to Settings → Publishable API Keys
- [ ] Created new key for "Webshop" or "Storefront"
- [ ] Key copied and saved for Vercel deployment

## Security

### Secrets
- [ ] All secrets changed from defaults
- [ ] JWT_SECRET is 32+ characters
- [ ] COOKIE_SECRET is 32+ characters
- [ ] Database passwords are strong
- [ ] Redis password is strong
- [ ] No secrets committed to Git

### Server Security
- [ ] Server updated: `apt update && apt upgrade`
- [ ] Firewall configured properly
- [ ] SSH key authentication enabled
- [ ] Password authentication disabled (optional)

### Application Security
- [ ] HTTPS enabled (SSL certificate)
- [ ] CORS configured correctly
- [ ] Environment variables secured

## Monitoring & Maintenance

### Logs
- [ ] Application logs accessible in Coolify
- [ ] Database logs accessible
- [ ] Error logs monitored

### Backups
- [ ] Database backup strategy planned
- [ ] Backup script/tested
- [ ] Backup storage configured
- [ ] Restoration procedure tested

### Updates
- [ ] Git integration configured for auto-deploy
- [ ] Update procedure documented
- [ ] Migration procedure tested

## Cost Tracking

### Monthly Costs
- [ ] VPS server cost: $____/month
- [ ] Domain cost: $____/month (if applicable)
- [ ] Total: $____/month
- [ ] Budget allocated

## Documentation

### Internal Docs
- [ ] Deployment procedure documented
- [ ] Environment variables documented
- [ ] Backup procedure documented
- [ ] Update procedure documented
- [ ] Troubleshooting guide created

## Next Steps

- [ ] Storefront deployment to Vercel
- [ ] Integration testing
- [ ] Performance monitoring setup
- [ ] Team access configured (if applicable)

---

## Quick Reference

### Internal Service Names
- PostgreSQL: `medusa-postgres:5432`
- Redis: `medusa-redis:6379`

### Connection Strings
- Database: `postgresql://medusa:password@medusa-postgres:5432/cubitstore`
- Redis: `redis://default:password@medusa-redis:6379`

### Important URLs
- Coolify: `http://your-server-ip:8000`
- Admin: `https://admin.yourdomain.com/app`
- Health: `https://admin.yourdomain.com/health`

---

**Status**: ⬜ Not Started | 🟡 In Progress | ✅ Complete
