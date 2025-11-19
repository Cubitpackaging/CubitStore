# Vercel Deployment Guide - Medusa B2B Storefront

## Quick Start Checklist

### Pre-Deployment Setup

1. **Backend Ready**
   - [ ] Backend deployed to Easypanel
   - [ ] Admin panel accessible
   - [ ] Publishable API key created
   - [ ] Backend URL confirmed

2. **Repository Ready**
   - [ ] Code pushed to Git repository
   - [ ] `storefront/` directory contains Next.js app
   - [ ] `package.json` exists in storefront directory

### Vercel Configuration Steps

#### Step 1: Create Project
1. Login to Vercel Dashboard
2. Click "Add New Project"
3. Import your Git repository
4. **Important**: Set root directory to `storefront`

#### Step 2: Configure Build Settings
- Framework Preset: **Next.js**
- Build Command: `yarn build` (or `npm run build`)
- Output Directory: `.next` (auto-detected)
- Install Command: `yarn install` (or `npm install`)
- Node.js Version: **20.x** (required)

#### Step 3: Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

##### Required Variables

```bash
# Backend Connection
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://admin.yourdomain.com

# Publishable Key (from Medusa Admin)
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_key_here

# Storefront URL
NEXT_PUBLIC_BASE_URL=https://your-storefront-domain.com

# Default Region (ISO-2 code)
NEXT_PUBLIC_DEFAULT_REGION=us

# Revalidation Secret
REVALIDATE_SECRET=your-secret-key-here
```

##### Optional: Payment Providers

```bash
# Stripe (if using Stripe)
NEXT_PUBLIC_STRIPE_KEY=pk_live_your_stripe_key

# PayPal (if using PayPal)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
```

**Important**: 
- Set these for **Production**, **Preview**, and **Development** environments
- `NEXT_PUBLIC_*` variables are exposed to the browser
- Never put secrets in `NEXT_PUBLIC_*` variables

#### Step 4: Domain Configuration

1. **Add Domain**
   - Go to project settings → Domains
   - Add your storefront domain (e.g., `cubitpackaging.com`)
   - Vercel will automatically configure SSL

2. **Configure DNS**
   - Option A: Use Vercel's nameservers (recommended)
     - Update your domain's nameservers to Vercel's
   - Option B: Add CNAME record
     - Add CNAME: `www` → `c1.vercel-dns.com`
     - Add A record for root domain if needed

#### Step 5: Deploy

1. Click "Deploy" in Vercel
2. Vercel will:
   - Install dependencies
   - Build Next.js application
   - Deploy to edge network
3. Monitor build logs for any errors

### Post-Deployment Steps

#### 1. Verify Deployment

1. **Check Homepage**
   - Visit: `https://your-storefront-domain.com`
   - Should load without errors

2. **Test API Connection**
   - Open browser console
   - Check for API connection errors
   - Verify products load

3. **Test Key Features**
   - Browse products
   - Add to cart
   - Checkout flow
   - User authentication

#### 2. Configure Revalidation (Optional)

If you want on-demand revalidation for product/collection updates:

1. **Create API Route** (if not exists)
   - File: `storefront/src/app/api/revalidate/route.ts`
   - Verify it uses `REVALIDATE_SECRET`

2. **Set up Webhook in Medusa Admin**
   - URL: `https://your-storefront-domain.com/api/revalidate?secret=your-revalidation-secret`
   - Trigger on: Product updates, Collection updates

#### 3. Test B2B Features

1. **Company Management**
   - Create account
   - Create/join company
   - Test employee invitations

2. **Quote Management**
   - Create quote request
   - Verify quote appears in admin

3. **Approval Workflows**
   - Test company approvals
   - Test cart approval process

### Common Issues & Solutions

#### Issue: Build Fails
**Solution**:
- Check Node.js version (requires 20+)
- Verify all dependencies in package.json
- Check build logs for specific errors
- Ensure root directory is set to `storefront`

#### Issue: Cannot Connect to Backend
**Solution**:
- Verify `NEXT_PUBLIC_MEDUSA_BACKEND_URL` is correct
- Check CORS settings in backend
- Verify backend is accessible from internet
- Test backend URL in browser

#### Issue: Publishable Key Invalid
**Solution**:
- Create new publishable key in Medusa Admin
- Ensure key is associated with correct sales channel
- Update `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` in Vercel
- Redeploy after updating

#### Issue: Images Not Loading
**Solution**:
- Check `next.config.js` remote patterns
- Verify image domains are allowed
- Check image URLs in browser console

#### Issue: CORS Errors
**Solution**:
- Update backend `STORE_CORS` to include Vercel domain
- Include both production and preview domains
- Format: `https://yourdomain.com,https://*.vercel.app`

### Environment-Specific Configuration

#### Production
- Use production backend URL
- Use production publishable key
- Use production domain

#### Preview (Branch Deployments)
- Can use same backend or staging backend
- Vercel automatically creates preview URLs
- Update CORS in backend to include `*.vercel.app`

#### Development
- Use local backend: `http://localhost:9000`
- Use development publishable key
- Use local domain: `http://localhost:8000`

### Monitoring & Analytics

#### Vercel Analytics
- Enable Vercel Analytics in project settings
- View performance metrics
- Monitor Core Web Vitals

#### Function Logs
- View serverless function logs
- Check API route logs
- Monitor errors

#### Build Logs
- View deployment logs
- Check build errors
- Monitor build times

### Updating Deployment

1. **Automatic Deployments**
   - Push to main branch → auto-deploy to production
   - Push to other branches → preview deployments

2. **Manual Deployments**
   - Go to Deployments tab
   - Click "Redeploy" if needed

3. **Rollback**
   - Go to Deployments tab
   - Find previous successful deployment
   - Click "Promote to Production"

### Performance Optimization

1. **Image Optimization**
   - Next.js automatically optimizes images
   - Use `next/image` component
   - Configure remote patterns in `next.config.js`

2. **Caching**
   - Vercel automatically caches static assets
   - Configure ISR (Incremental Static Regeneration)
   - Use revalidation for dynamic content

3. **Edge Functions**
   - Consider using Edge Runtime for API routes
   - Faster response times globally

### Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use Vercel environment variables
   - Separate secrets from public variables

2. **API Security**
   - Use publishable keys (not secret keys)
   - Implement rate limiting (consider)
   - Validate all user inputs

3. **Content Security**
   - Configure CSP headers if needed
   - Sanitize user-generated content
   - Keep dependencies updated

### Backup & Recovery

1. **Code Backup**
   - Git repository is your backup
   - Regular commits and pushes

2. **Configuration Backup**
   - Export environment variables
   - Document all settings

3. **Database Backup**
   - Handled by backend (PostgreSQL)
   - Not applicable to storefront

### Scaling Considerations

Vercel automatically scales:
- Handles traffic spikes
- Global edge network
- Serverless functions scale automatically

For high traffic:
- Monitor function execution times
- Optimize API calls
- Consider caching strategies

### Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Medusa Storefront Development](https://docs.medusajs.com/v2/resources/storefront-development)

### Quick Reference

#### Required Environment Variables
```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://admin.yourdomain.com
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_key
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
NEXT_PUBLIC_DEFAULT_REGION=us
REVALIDATE_SECRET=your-secret
```

#### Vercel URLs
- Production: `https://yourdomain.com`
- Preview: `https://your-project-*.vercel.app`
- Admin: Vercel Dashboard

#### Build Commands
- Install: `yarn install`
- Build: `yarn build`
- Start: `yarn start` (local only)
