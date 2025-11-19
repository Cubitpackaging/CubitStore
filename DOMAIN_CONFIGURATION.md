# Domain Configuration for Cubit Packaging

## 🌐 Domain Structure

### Production (Main Website)
- **Main Website**: `cubitpackaging.com`
  - Current marketing website
  - Eco-Smart Custom Packaging Solutions
  - Product information, quotes, contact

### Testing/Staging (B2B Platform)
- **B2B Storefront**: `e.cubitpackaging.com`
  - B2B ecommerce platform for testing
  - Custom packaging ordering system
  - Company accounts, quotes, approvals

- **Admin Panel**: `admin.e.cubitpackaging.com`
  - Backend administration
  - Product management
  - Order management
  - Quote management

## 📋 DNS Configuration

### For Testing Subdomain (e.cubitpackaging.com)

**A Record:**
```
Type: A
Name: e
Value: [Your Coolify Server IP]
TTL: 3600
```

**CNAME Record (Alternative):**
```
Type: CNAME
Name: e
Value: [Your server hostname]
TTL: 3600
```

### For Admin Subdomain (admin.e.cubitpackaging.com)

**A Record:**
```
Type: A
Name: admin.e
Value: [Your Coolify Server IP]
TTL: 3600
```

**Or use wildcard:**
```
Type: A
Name: *.e
Value: [Your Coolify Server IP]
TTL: 3600
```

## 🔧 Environment Variables

### Backend (Coolify)

```bash
STORE_CORS=https://e.cubitpackaging.com
ADMIN_CORS=https://admin.e.cubitpackaging.com
AUTH_CORS=https://admin.e.cubitpackaging.com,https://e.cubitpackaging.com
ADMIN_URL=https://admin.e.cubitpackaging.com/app
MEDUSA_BACKEND_URL=https://admin.e.cubitpackaging.com
```

### Storefront (Vercel)

```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://admin.e.cubitpackaging.com
NEXT_PUBLIC_BASE_URL=https://e.cubitpackaging.com
```

## 🚀 Deployment Notes

1. **Testing Phase**: Use `e.cubitpackaging.com` subdomain
2. **Production Phase**: Can switch to `cubitpackaging.com` or keep subdomain
3. **SSL Certificates**: Coolify will auto-generate for subdomains
4. **DNS Propagation**: Allow 5-30 minutes after DNS changes

## 📝 Migration Path

When ready for production:

1. Update environment variables to use `cubitpackaging.com`
2. Update DNS records
3. Update Vercel domain configuration
4. Update Coolify domain configuration
5. Test all endpoints

## ✅ Verification

After DNS configuration:

```bash
# Check DNS resolution
nslookup e.cubitpackaging.com
nslookup admin.e.cubitpackaging.com

# Should return your server IP
```
