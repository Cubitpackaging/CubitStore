# Medusa B2B Deployment Plan

## Overview

This document provides a comprehensive deployment plan for the Medusa B2B Commerce Starter, deploying the **backend to Easypanel** and the **storefront to Vercel**.

## Architecture

```
┌─────────────────┐
│   Vercel        │
│  (Storefront)   │  Next.js 15
│                 │  Port: 8000
└────────┬────────┘
         │
         │ API Calls
         │
┌────────▼────────┐
│   Easypanel     │
│   (Backend)     │  Medusa 2.8.4
│   Port: 9000    │  Custom B2B Modules
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│Postgres│ │ Redis │
│ :5432  │ │ :6379 │
└────────┘ └───────┘
```

## Prerequisites

### Infrastructure Requirements

1. **PostgreSQL Database**
   - Version: PostgreSQL 15+ (recommended)
   - Purpose: Primary database for Medusa
   - Required for: All data storage (products, orders, companies, quotes, approvals, etc.)

2. **Redis Instance**
   - Purpose: Caching, event bus, workflow engine, session storage
   - Required for:
     - Cache module (`@medusajs/cache-redis`)
     - Event bus (`@medusajs/event-bus-redis`)
     - Workflow engine (`@medusajs/workflow-engine-redis`)
     - Session management

3. **SMTP Server** (for email notifications)
   - Required for: Order confirmations, quote notifications, approval workflows
   - Configuration: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM

4. **Domain Names**
   - Storefront domain (e.g., `cubitpackaging.com`)
   - Admin domain (e.g., `admin.cubitpackaging.com`)

### Medusa B2B Specific Requirements

This is a **Medusa B2B** starter with custom modules:
- **Company Module**: Company management, employee invitations
- **Quote Module**: Quote creation, acceptance, rejection
- **Approval Module**: Company and merchant approval workflows

All these modules require proper database migrations and configuration.

---

## Part 1: Backend Deployment to Easypanel

### Step 1: Prepare PostgreSQL Database

1. **Create Database**
   ```sql
   CREATE DATABASE cubitstore;
   ```

2. **Verify Connection**
   - Ensure PostgreSQL is accessible from your Easypanel server
   - Test connection string format:
     ```
     postgres://postgres:password@host:5432/cubitstore?sslmode=disable
     ```

### Step 2: Prepare Redis Instance

1. **Setup Redis**
   - Ensure Redis is accessible from your Easypanel server
   - Test connection string format:
     ```
     redis://default:password@host:6379
     ```
   - URL encode special characters in password (e.g., `@` becomes `%40`)

### Step 3: Configure Easypanel Project

1. **Create New Project in Easypanel**
   - Go to "Projects" → "Create Project"
   - Choose "Import from Git"
   - Repository URL: Your Git repository URL
   - Branch: `main` (or your deployment branch)
   - **Directory**: `backend` (important - this contains the `easypanel.yml`)

2. **Configure Build Settings**
   - Dockerfile path: `backend/Dockerfile`
   - Build context: `backend/`
   - The Dockerfile will:
     - Install dependencies
     - Build admin UI (`yarn build:admin`)
     - Expose port 9000

### Step 4: Set Environment Variables in Easypanel

Configure these environment variables in the Easypanel UI:

#### Core Configuration
```bash
NODE_ENV=production
STORE_CORS=https://your-storefront-domain.com
ADMIN_CORS=https://your-admin-domain.com
AUTH_CORS=https://your-admin-domain.com,https://your-storefront-domain.com
```

#### Database & Redis
```bash
DATABASE_URL=postgres://postgres:password@host:5432/cubitstore?sslmode=disable
DB_NAME=cubitstore
REDIS_URL=redis://default:password@host:6379
```

#### Security
```bash
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
COOKIE_SECRET=your-super-secret-cookie-key-min-32-chars
```

#### Admin Panel
```bash
ADMIN_URL=https://your-admin-domain.com/app
MEDUSA_BACKEND_URL=https://your-admin-domain.com
DISABLE_MEDUSA_ADMIN=false
MEDUSA_WORKER_MODE=server
```

#### Email Configuration (SMTP)
```bash
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@domain.com
SMTP_PASS=your-email-password
SMTP_FROM=your-email@domain.com
```

#### Optional: OpenAI (for AI features)
```bash
OPENAI_API_KEY=your-openai-api-key
AUTO_GENERATE_DESCRIPTIONS=false
```

### Step 5: Configure Domain in Easypanel

1. **Add Domain**
   - Go to project settings → Domains
   - Add your admin domain (e.g., `admin.cubitpackaging.com`)
   - Enable HTTPS (Easypanel will handle SSL with Let's Encrypt)

2. **Port Configuration**
   - Port: `9000`
   - Protocol: `HTTP`
   - Public: `true`
   - Path: `/`
   - Secure: `true` (HTTPS)

### Step 6: Deploy and Run Migrations

1. **Initial Deployment**
   - Click "Deploy" in Easypanel
   - Wait for build to complete

2. **Run Database Migrations**
   - After first deployment, run migrations:
   ```bash
   # Via Easypanel terminal or SSH
   docker exec -it <container-name> yarn medusa migrations run
   ```

3. **Create Admin User** (if needed)
   ```bash
   docker exec -it <container-name> yarn medusa user -e admin@yourdomain.com -p yourpassword -i admin
   ```

### Step 7: Verify Backend Deployment

1. **Check Health**
   - Visit: `https://your-admin-domain.com/health`
   - Should return 200 OK

2. **Access Admin Panel**
   - Visit: `https://your-admin-domain.com/app`
   - Login with admin credentials

3. **Verify API Endpoints**
   - Store API: `https://your-admin-domain.com/store`
   - Admin API: `https://your-admin-domain.com/admin`

### Step 8: Configure Publishable API Key

1. **Create Publishable Key**
   - Login to admin panel
   - Go to: Settings → Publishable API Keys
   - Create a new key for "Webshop" or "Storefront"
   - **Copy the key** - you'll need it for Vercel deployment

---

## Part 2: Storefront Deployment to Vercel

### Step 1: Prepare Vercel Project

1. **Connect Repository**
   - Go to Vercel Dashboard
   - Click "Add New Project"
   - Import your Git repository
   - **Root Directory**: `storefront` (important!)

2. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `yarn build` (or `npm run build`)
   - Output Directory: `.next`
   - Install Command: `yarn install` (or `npm install`)

### Step 2: Set Environment Variables in Vercel

Configure these environment variables in Vercel Dashboard:

#### Required Variables
```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-admin-domain.com
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_publishable_key_from_admin
NEXT_PUBLIC_BASE_URL=https://your-storefront-domain.com
NEXT_PUBLIC_DEFAULT_REGION=us
REVALIDATE_SECRET=your-revalidation-secret
```

#### Optional: Payment Providers
```bash
NEXT_PUBLIC_STRIPE_KEY=pk_live_your_stripe_key
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### Step 3: Configure Domain in Vercel

1. **Add Domain**
   - Go to project settings → Domains
   - Add your storefront domain (e.g., `cubitpackaging.com`)
   - Vercel will automatically configure SSL

2. **Configure DNS**
   - Add CNAME record pointing to Vercel
   - Or use Vercel's nameservers

### Step 4: Deploy Storefront

1. **Deploy**
   - Click "Deploy" in Vercel
   - Vercel will automatically build and deploy

2. **Verify Deployment**
   - Visit your storefront domain
   - Check that it connects to backend API
   - Test product pages, cart, checkout

---

## Part 3: Post-Deployment Configuration

### 1. Update CORS Settings

Ensure backend CORS includes your Vercel domain:
```bash
STORE_CORS=https://your-storefront-domain.com,https://your-vercel-domain.vercel.app
AUTH_CORS=https://your-admin-domain.com,https://your-storefront-domain.com
```

### 2. Configure Revalidation

If using Next.js revalidation, set up webhook in Vercel:
- Webhook URL: `https://your-storefront-domain.com/api/revalidate?secret=your-revalidation-secret`
- Configure in Medusa admin for product/collection updates

### 3. Test B2B Features

1. **Company Management**
   - Create a company in admin
   - Invite employees
   - Test company approval settings

2. **Quote Management**
   - Create a quote from storefront
   - Accept/reject from admin

3. **Approval Workflows**
   - Test company approvals
   - Test merchant approvals

### 4. Monitor Logs

- **Easypanel**: Use built-in log viewer
- **Vercel**: Check function logs and build logs
- Set up error monitoring (e.g., Sentry)

---

## Environment Variables Checklist

### Backend (Easypanel) - Required
- [ ] `NODE_ENV=production`
- [ ] `STORE_CORS` (storefront domain)
- [ ] `ADMIN_CORS` (admin domain)
- [ ] `AUTH_CORS` (both domains)
- [ ] `DATABASE_URL` (PostgreSQL connection string)
- [ ] `DB_NAME` (database name)
- [ ] `REDIS_URL` (Redis connection string)
- [ ] `JWT_SECRET` (min 32 characters)
- [ ] `COOKIE_SECRET` (min 32 characters)
- [ ] `ADMIN_URL` (full admin URL with /app)
- [ ] `MEDUSA_BACKEND_URL` (backend base URL)
- [ ] `SMTP_HOST`
- [ ] `SMTP_PORT`
- [ ] `SMTP_SECURE`
- [ ] `SMTP_USER`
- [ ] `SMTP_PASS`
- [ ] `SMTP_FROM`

### Backend (Easypanel) - Optional
- [ ] `OPENAI_API_KEY`
- [ ] `AUTO_GENERATE_DESCRIPTIONS`
- [ ] `MEDUSA_WORKER_MODE` (default: server)
- [ ] `DISABLE_MEDUSA_ADMIN` (default: false)

### Storefront (Vercel) - Required
- [ ] `NEXT_PUBLIC_MEDUSA_BACKEND_URL` (backend URL)
- [ ] `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` (from admin)
- [ ] `NEXT_PUBLIC_BASE_URL` (storefront URL)
- [ ] `NEXT_PUBLIC_DEFAULT_REGION` (ISO-2 code)
- [ ] `REVALIDATE_SECRET` (for on-demand revalidation)

### Storefront (Vercel) - Optional
- [ ] `NEXT_PUBLIC_STRIPE_KEY`
- [ ] `NEXT_PUBLIC_PAYPAL_CLIENT_ID`

---

## Troubleshooting

### Backend Issues

#### Database Connection Failed
- Verify PostgreSQL is accessible from Easypanel server
- Check firewall rules
- Verify connection string format
- Ensure database exists

#### Redis Connection Failed
- Verify Redis is accessible
- Check password encoding (URL encode special chars)
- Test connection manually

#### Admin Panel Not Loading
- Check `ADMIN_URL` environment variable
- Verify domain configuration in Easypanel
- Check browser console for CORS errors
- Ensure `DISABLE_MEDUSA_ADMIN=false`

#### Migrations Failed
- Run migrations manually: `yarn medusa migrations run`
- Check database permissions
- Verify database exists

### Storefront Issues

#### Cannot Connect to Backend
- Verify `NEXT_PUBLIC_MEDUSA_BACKEND_URL` is correct
- Check CORS settings in backend
- Verify backend is accessible

#### Publishable Key Invalid
- Create new publishable key in admin
- Ensure key is associated with correct sales channel
- Update `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` in Vercel

#### Build Failures
- Check Node.js version (requires 20+)
- Verify all dependencies are installed
- Check build logs in Vercel

---

## Security Checklist

- [ ] Use strong, unique `JWT_SECRET` and `COOKIE_SECRET` (32+ characters)
- [ ] Enable HTTPS for all domains
- [ ] Restrict database access to Easypanel server IP
- [ ] Use Redis password authentication
- [ ] Keep dependencies updated
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting (consider adding)
- [ ] Set up regular database backups
- [ ] Monitor logs for suspicious activity

---

## Maintenance

### Regular Tasks

1. **Database Backups**
   - Set up automated PostgreSQL backups
   - Test restoration procedures

2. **Dependency Updates**
   - Regularly update Medusa packages
   - Update Next.js and other dependencies
   - Run migrations after updates

3. **Monitoring**
   - Monitor application logs
   - Set up alerts for errors
   - Track performance metrics

4. **SSL Certificates**
   - Easypanel handles SSL automatically
   - Vercel handles SSL automatically
   - Monitor expiration (usually auto-renewed)

---

## Resources

- [Medusa 2.0 Documentation](https://docs.medusajs.com/v2)
- [Medusa B2B Starter](https://github.com/medusajs/b2b-starter-medusa)
- [Easypanel Documentation](https://easypanel.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

## Quick Reference

### Backend URLs
- Admin Panel: `https://admin.yourdomain.com/app`
- Store API: `https://admin.yourdomain.com/store`
- Admin API: `https://admin.yourdomain.com/admin`
- Health Check: `https://admin.yourdomain.com/health`

### Storefront URLs
- Homepage: `https://yourdomain.com`
- Cart: `https://yourdomain.com/cart`
- Checkout: `https://yourdomain.com/checkout`

### Database Connection Format
```
postgres://username:password@host:5432/database?sslmode=disable
```

### Redis Connection Format
```
redis://default:password@host:6379
```
(URL encode special characters in password)

---

## Notes

- This is a **Medusa B2B** deployment with custom modules
- Ensure all B2B-specific features are tested after deployment
- Company, Quote, and Approval modules require proper database setup
- Worker mode is set to "server" - consider separate worker process for high traffic
- Admin UI is built during Docker build process
