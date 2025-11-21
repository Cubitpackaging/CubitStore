# Quick Deployment Reference

## 🚀 Deployment Overview

**Backend (Medusa)** → Easypanel  
**Storefront (Next.js)** → Vercel

## 📋 Prerequisites Checklist

- [ ] PostgreSQL database (15+) - accessible from Easypanel
- [ ] Redis instance - accessible from Easypanel  
- [ ] SMTP credentials for emails
- [ ] Domain names configured (storefront + admin)
- [ ] Git repository ready

## 🔧 Backend Deployment (Easypanel)

### Step 1: Create Project
```
Easypanel → Create Project → Import from Git
- Repository: Your Git URL
- Branch: main
- Root Directory: backend
```

### Step 2: Environment Variables (Set in Easypanel UI)

**Required:**
```bash
NODE_ENV=production
STORE_CORS=https://your-storefront.com
ADMIN_CORS=https://admin.yourdomain.com
AUTH_CORS=https://admin.yourdomain.com,https://your-storefront.com
DATABASE_URL=postgres://user:pass@host:5432/dbname?sslmode=disable
DB_NAME=cubitstore
REDIS_URL=redis://default:pass@host:6379
JWT_SECRET=your-32-char-secret
COOKIE_SECRET=your-32-char-secret
ADMIN_URL=https://admin.yourdomain.com/app
MEDUSA_BACKEND_URL=https://admin.yourdomain.com
SMTP_HOST=smtp.provider.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=email@domain.com
SMTP_PASS=password
SMTP_FROM=email@domain.com
```

### Step 3: Deploy
- Click Deploy
- Migrations run automatically
- Create admin user if needed: `yarn medusa user -e admin@domain.com -p password -i admin`

### Step 4: Get Publishable Key
- Login to admin: `https://admin.yourdomain.com/app`
- Settings → Publishable API Keys → Create key
- Copy key for Vercel

## 🎨 Storefront Deployment (Vercel)

### Step 1: Create Project
```
Vercel → Add Project → Import Git
- Root Directory: storefront
- Framework: Next.js
```

### Step 2: Environment Variables (Set in Vercel UI)

**Required:**
```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://admin.yourdomain.com
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_key_from_admin
NEXT_PUBLIC_BASE_URL=https://your-storefront.com
NEXT_PUBLIC_DEFAULT_REGION=us
REVALIDATE_SECRET=your-secret
```

### Step 3: Deploy
- Click Deploy
- Vercel builds automatically
- Add domain in settings

## ✅ Verification

### Backend
- Health: `https://admin.yourdomain.com/health` → 200 OK
- Admin: `https://admin.yourdomain.com/app` → Login works

### Storefront  
- Homepage: `https://your-storefront.com` → Loads
- Products: Display correctly
- Cart: Works

## 🔍 Common Issues

| Issue | Solution |
|-------|----------|
| Database connection failed | Check firewall, credentials, connection string |
| Redis connection failed | Verify URL encoding, accessibility |
| CORS errors | Update `STORE_CORS` in backend |
| Admin 404 | Check `ADMIN_URL` environment variable |
| Build fails | Verify Node 20+, dependencies |
| Publishable key invalid | Create new key in admin, update Vercel |

## 📚 Full Documentation

- **Complete Guide**: `DEPLOYMENT_PLAN.md`
- **Easypanel Guide**: `EASYPANEL_DEPLOYMENT.md`
- **Vercel Guide**: `VERCEL_DEPLOYMENT.md`
- **Summary**: `DEPLOYMENT_SUMMARY.md`

## 🔐 Security Notes

⚠️ **Important:**
- Change default `JWT_SECRET` and `COOKIE_SECRET` (use 32+ characters)
- Never commit secrets to Git
- Use environment variables for all sensitive data
- Restrict database/Redis access to server IPs

## 🎯 Medusa B2B Features

This deployment includes:
- ✅ Company Management
- ✅ Quote System
- ✅ Approval Workflows
- ✅ Employee Management

Test all features after deployment!

## 📞 Support

- Medusa Docs: https://docs.medusajs.com/v2
- Easypanel Docs: https://easypanel.io/docs
- Vercel Docs: https://vercel.com/docs
