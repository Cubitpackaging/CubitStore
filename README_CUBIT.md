# Cubit Packaging B2B Commerce Platform

## 🎯 Overview

**Cubit Packaging** is a powerful B2B ecommerce platform built with Medusa 2.0 and Next.js 15, designed specifically for packaging solutions and B2B commerce.

## 🌐 Live URLs

- **Storefront**: https://cubitpackaging.com
- **Admin Panel**: https://admin.cubitpackaging.com/app
- **API**: https://admin.cubitpackaging.com

## 🚀 Features

### B2B Commerce Features
- **Company Management** - Customers can manage their company and invite employees
- **Spending Limits** - Company admins can assign spending limits to employees
- **Bulk Add-to-Cart** - Add multiple product variants to cart at once
- **Quote Management** - Request, manage, and approve quotes
- **Order Editing** - Merchants can edit orders and quotes
- **Company Approvals** - Mandatory approvals before cart finalization
- **Merchant Approvals** - Approval processes for order fulfillment
- **Promotions** - Manual and automatic promotions
- **Free Shipping Nudge** - Progress indicator toward free shipping

### Ecommerce Features
- Product Pages & Collections
- Shopping Cart & Checkout
- User Accounts & Authentication
- Order Management
- Payment Processing (Stripe, PayPal)

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
yarn medusa user -e admin@cubitpackaging.com -p yourpassword -i admin
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

### Key Domains
- Storefront: `cubitpackaging.com`
- Admin: `admin.cubitpackaging.com`

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

- **Website**: https://cubitpackaging.com
- **Admin**: https://admin.cubitpackaging.com/app
- **Built with**: [Medusa](https://medusajs.com) & [Next.js](https://nextjs.org)
