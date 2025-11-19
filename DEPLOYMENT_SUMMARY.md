# Medusa B2B Deployment Summary

## Quick Overview

This repository contains a **Medusa B2B Commerce Starter** that needs to be deployed:
- **Backend** → **Easypanel** (Medusa 2.8.4 with custom B2B modules)
- **Storefront** → **Vercel** (Next.js 15)

## What You Need

### Infrastructure
1. **PostgreSQL Database** (required)
   - Version: 15+
   - For: All data storage
   - Connection: `postgres://user:pass@host:5432/dbname?sslmode=disable`

2. **Redis Instance** (required)
   - For: Caching, events, workflows, sessions
   - Connection: `redis://default:pass@host:6379`

3. **SMTP Server** (required)
   - For: Email notifications
   - Configuration: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

4. **Domains** (required)
   - Storefront domain (e.g., `cubitpackaging.com`)
   - Admin domain (e.g., `admin.cubitpackaging.com`)

## Deployment Files

### Main Documentation
- **`DEPLOYMENT_PLAN.md`** - Complete deployment guide with all details
- **`EASYPANEL_DEPLOYMENT.md`** - Step-by-step Easypanel guide
- **`VERCEL_DEPLOYMENT.md`** - Step-by-step Vercel guide

### Configuration Files
- **`backend/easypanel.yml`** - Easypanel configuration
- **`backend/Dockerfile`** - Backend container build
- **`backend/medusa-config.ts`** - Medusa configuration

## Quick Start

### 1. Backend to Easypanel

1. **Create Easypanel Project**
   - Import from Git
   - Root directory: `backend`
   - Use `backend/easypanel.yml`

2. **Set Environment Variables** (see `EASYPANEL_DEPLOYMENT.md` for full list)
   - Database: `DATABASE_URL`, `DB_NAME`
   - Redis: `REDIS_URL`
   - Security: `JWT_SECRET`, `COOKIE_SECRET`
   - Admin: `ADMIN_URL`, `MEDUSA_BACKEND_URL`
   - Email: `SMTP_*` variables
   - CORS: `STORE_CORS`, `ADMIN_CORS`, `AUTH_CORS`

3. **Configure Domain**
   - Add admin domain in Easypanel
   - Enable HTTPS

4. **Deploy & Migrate**
   - Deploy in Easypanel
   - Migrations run automatically via `predeploy`
   - Create admin user if needed

5. **Create Publishable Key**
   - Login to admin panel
   - Create publishable API key
   - Copy for Vercel

### 2. Storefront to Vercel

1. **Create Vercel Project**
   - Import from Git
   - Root directory: `storefront`
   - Framework: Next.js

2. **Set Environment Variables** (see `VERCEL_DEPLOYMENT.md` for full list)
   - `NEXT_PUBLIC_MEDUSA_BACKEND_URL` (backend URL)
   - `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` (from admin)
   - `NEXT_PUBLIC_BASE_URL` (storefront URL)
   - `NEXT_PUBLIC_DEFAULT_REGION` (e.g., "us")
   - `REVALIDATE_SECRET` (for revalidation)

3. **Configure Domain**
   - Add storefront domain in Vercel
   - Configure DNS

4. **Deploy**
   - Click deploy
   - Vercel handles build automatically

## Environment Variables Checklist

### Backend (Easypanel) - 20+ variables
See `EASYPANEL_DEPLOYMENT.md` for complete list.

Key ones:
- Database & Redis connection strings
- JWT & Cookie secrets
- Admin URLs
- SMTP configuration
- CORS settings

### Storefront (Vercel) - 5+ variables
See `VERCEL_DEPLOYMENT.md` for complete list.

Key ones:
- Backend URL
- Publishable key
- Base URL
- Default region

## Medusa B2B Specific Features

This deployment includes custom B2B modules:
- **Company Module**: Company management, employees
- **Quote Module**: Quote requests and management
- **Approval Module**: Company and merchant approvals

All modules require:
- Proper database migrations (auto-run via predeploy)
- Correct environment configuration
- Testing after deployment

## Testing After Deployment

1. **Backend**
   - Health check: `https://admin.yourdomain.com/health`
   - Admin panel: `https://admin.yourdomain.com/app`
   - API endpoints: `/store`, `/admin`

2. **Storefront**
   - Homepage loads
   - Products display
   - Cart works
   - Checkout flow

3. **B2B Features**
   - Company creation
   - Quote requests
   - Approval workflows

## Troubleshooting

### Common Issues
- **Database connection**: Check firewall, credentials, connection string
- **Redis connection**: Verify URL encoding, accessibility
- **CORS errors**: Update CORS settings in backend
- **Build failures**: Check Node version (20+), dependencies
- **Admin 404**: Verify `ADMIN_URL` environment variable

See individual deployment guides for detailed troubleshooting.

## Next Steps

1. Read `DEPLOYMENT_PLAN.md` for comprehensive guide
2. Follow `EASYPANEL_DEPLOYMENT.md` for backend
3. Follow `VERCEL_DEPLOYMENT.md` for storefront
4. Test all features after deployment
5. Set up monitoring and backups

## Support

- [Medusa Documentation](https://docs.medusajs.com/v2)
- [Medusa B2B Starter](https://github.com/medusajs/b2b-starter-medusa)
- [Easypanel Docs](https://easypanel.io/docs)
- [Vercel Docs](https://vercel.com/docs)
