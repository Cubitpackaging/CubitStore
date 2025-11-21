# Cubit Packaging B2B Commerce Platform

## 🎯 Overview

**Cubit Packaging** is an Eco-Smart Custom Packaging Solutions company offering beautifully printed, sustainable boxes, mailers, and pouches with built-in digital experiences. This B2B ecommerce platform enables businesses to order custom packaging with low minimums, fast U.S. production, and free design support.

**Specialties:**
- Custom boxes with full-color printing
- Eco-friendly and sustainable materials
- Smart packaging with QR codes and NFC tags
- Mylar bags (food-grade safe, resealable)
- Tech-integrated packaging solutions
- Spot UV, foil stamping, embossing

## 🌐 Testing URLs (Subdomain)

- **B2B Storefront**: https://e.cubitpackaging.com
- **Admin Panel**: https://admin.e.cubitpackaging.com/app
- **API**: https://admin.e.cubitpackaging.com

## 🚀 Features

### B2B Commerce Features
- **Company Management** - Businesses can manage their company accounts and invite employees
- **Spending Limits** - Company admins control employee purchasing limits
- **Bulk Add-to-Cart** - Add multiple packaging variants (boxes, bags, sizes) to cart at once
- **Quote Management** - Request custom packaging quotes, manage approvals, and track orders
- **Order Editing** - Modify packaging orders (quantities, designs, specifications)
- **Company Approvals** - Multi-level approval workflows for large packaging orders
- **Merchant Approvals** - Internal approval processes for custom packaging requests
- **Promotions** - Volume discounts, seasonal promotions for packaging orders
- **Free Shipping Nudge** - Progress indicator toward free shipping thresholds

### Ecommerce Features
- **Product Catalog** - Custom boxes, mylar bags, mailers, pouches
- **Product Collections** - Organized by packaging type, material, size
- **Shopping Cart & Checkout** - Streamlined ordering for packaging solutions
- **User Accounts** - Business accounts with company management
- **Order Management** - Track packaging orders from quote to delivery
- **Payment Processing** - Stripe and PayPal integration
- **Quote Requests** - Custom packaging quote system for unique requirements

## 🛠️ Tech Stack

- **Backend**: Medusa 2.8.4 (Node.js, TypeScript)
- **Frontend**: Next.js 15 (React, TypeScript)
- **Database**: PostgreSQL 15+
- **Cache**: Redis
- **Deployment**: 
  - Backend: Coolify (self-hosted)
  - Frontend: Vercel

## 📦 Project Structure

```
.
├── backend/          # Medusa backend (API + Admin)
├── storefront/      # Next.js storefront
└── docs/            # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Redis
- Yarn 4.4.0

### Backend Setup

```bash
cd backend
cp .env.template .env
# Edit .env with your configuration
yarn install
yarn medusa db:create
yarn medusa db:migrate
yarn medusa user -e admin@e.cubitpackaging.com -p yourpassword -i admin
yarn dev
```

### Storefront Setup

```bash
cd storefront
cp .env.template .env
# Edit .env with backend URL and publishable key
yarn install
yarn dev
```

## 📚 Documentation

- [Coolify Deployment Guide](./COOLIFY_COMPLETE_GUIDE.md) - Complete step-by-step deployment
- [Coolify Quick Start](./COOLIFY_QUICK_START.md) - Fast 30-minute setup
- [Vercel Deployment](./VERCEL_DEPLOYMENT.md) - Storefront deployment
- [Deployment Summary](./DEPLOYMENT_SUMMARY.md) - Overview

## 🔧 Configuration

### Environment Variables

See deployment guides for complete environment variable configuration.

### Key Domains (Testing)
- B2B Storefront: `e.cubitpackaging.com` (testing subdomain)
- Admin Panel: `admin.e.cubitpackaging.com` (testing subdomain)
- Production: `cubitpackaging.com` (main website)

## 🏗️ Deployment

### Backend (Coolify)
1. Set up VPS server
2. Install Coolify
3. Provision PostgreSQL and Redis
4. Deploy backend application
5. Configure domains and SSL

See [COOLIFY_COMPLETE_GUIDE.md](./COOLIFY_COMPLETE_GUIDE.md) for detailed instructions.

### Storefront (Vercel)
1. Connect Git repository
2. Configure environment variables
3. Deploy

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

## 📝 License

Proprietary - Cubit Packaging

## 🔗 Links

- **Main Website**: https://cubitpackaging.com (Eco-Smart Custom Packaging)
- **B2B Storefront (Testing)**: https://e.cubitpackaging.com
- **Admin Panel (Testing)**: https://admin.e.cubitpackaging.com/app
- **Built with**: [Medusa](https://medusajs.com) & [Next.js](https://nextjs.org)
