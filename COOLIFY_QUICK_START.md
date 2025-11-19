# Coolify Quick Start Guide

## 🚀 Fast Deployment (30 minutes)

### Step 1: Get VPS (5 min)
- Sign up: Hetzner, DigitalOcean, or Linode
- Create Ubuntu 22.04 server (2 CPU, 4GB RAM minimum)
- Note your server IP

### Step 2: Install Coolify (5 min)
```bash
ssh root@your-server-ip
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```
- Note the admin password from output
- Access: `http://your-server-ip:8000`

### Step 3: Provision Databases (10 min)

**PostgreSQL:**
- Coolify → New Resource → Database → PostgreSQL
- Name: `medusa-postgres`
- Database: `cubitstore`
- User: `medusa`
- Password: (generate strong one)
- Deploy

**Redis:**
- Coolify → New Resource → Database → Redis
- Name: `medusa-redis`
- Password: (generate strong one)
- Deploy

### Step 4: Deploy Medusa (10 min)

1. **Create Application:**
   - Coolify → New Resource → Dockerfile
   - Name: `medusa-backend`
   - Repository: Your Git URL
   - Branch: `main`
   - Dockerfile: `backend/Dockerfile`
   - Build Context: `backend/`
   - Port: `9000`

2. **Environment Variables:**
   ```bash
   NODE_ENV=production
   STORE_CORS=https://your-storefront.com
   ADMIN_CORS=https://admin.yourdomain.com
   AUTH_CORS=https://admin.yourdomain.com,https://your-storefront.com
   DATABASE_URL=postgresql://medusa:password@medusa-postgres:5432/cubitstore
   DB_NAME=cubitstore
   REDIS_URL=redis://default:password@medusa-redis:6379
   JWT_SECRET=your-32-char-secret
   COOKIE_SECRET=your-32-char-secret
   ADMIN_URL=https://admin.yourdomain.com/app
   MEDUSA_BACKEND_URL=https://admin.yourdomain.com
   MEDUSA_WORKER_MODE=server
   DISABLE_MEDUSA_ADMIN=false
   SMTP_HOST=smtp.provider.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=email@domain.com
   SMTP_PASS=password
   SMTP_FROM=email@domain.com
   ```

3. **Pre-Deploy Command:**
   ```bash
   yarn install && yarn build:admin && yarn medusa migrations run
   ```

4. **Domain:**
   - Add: `admin.yourdomain.com`
   - Enable SSL
   - Configure DNS: `admin.yourdomain.com` → `your-server-ip`

5. **Deploy!**

### Step 5: Post-Deploy (5 min)

1. **Create Admin User:**
   - Application → Terminal
   ```bash
   yarn medusa user -e admin@yourdomain.com -p password -i admin
   ```

2. **Verify:**
   - Health: `https://admin.yourdomain.com/health`
   - Admin: `https://admin.yourdomain.com/app`

3. **Get Publishable Key:**
   - Login to admin
   - Settings → Publishable API Keys → Create
   - Copy for Vercel

## ✅ Done!

Your backend is live! Deploy storefront to Vercel next.

## 🔑 Key Points

- **Use internal service names**: `medusa-postgres`, `medusa-redis`
- **Connection format**: `postgresql://user:pass@medusa-postgres:5432/dbname`
- **Everything in one place**: Backend + databases on same server
- **Cost**: ~$5-10/month total!

## 📚 Full Guide

See `COOLIFY_DEPLOYMENT.md` for detailed instructions.
