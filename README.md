<h1 align="center">
  🏪 CubitStore
  <br>
  <br>
  Modern B2B Commerce Platform
</h1>

<p align="center">A powerful B2B ecommerce solution built for modern businesses</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20+-green.svg" alt="Node.js" />
  <img src="https://img.shields.io/badge/PostgreSQL-15+-blue.svg" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Next.js-15+-black.svg" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5+-blue.svg" alt="TypeScript" />
</p>

<br>

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Deployment](#-deployment)
- [Development](#-development)
- [Environment Setup](#-environment-setup)

&nbsp;

## 🔧 Prerequisites

- ✅ Node.js 20+
- ✅ PostgreSQL 15+
- ✅ Redis (optional but recommended)
- ✅ Git

&nbsp;

## 📁 Project Structure

```
CubitStore/
├── backend/          # API & Admin Backend
│   ├── src/          # Source code
│   ├── Dockerfile    # Docker configuration
│   └── package.json  # Backend dependencies
├── storefront/       # Next.js Frontend
│   ├── src/          # Frontend source
│   └── package.json  # Frontend dependencies
└── README.md         # This file
```

&nbsp;

## ✨ Features

### 🏢 **Company Management**
- Multi-company support
- Employee invitation system
- Role-based access control
- Company-specific settings

### 💰 **Advanced Commerce**
- Bulk product ordering
- Quote management system
- Approval workflows
- Spending limits
- Dynamic pricing

### 🔄 **Approval System**
- Company-level approvals
- Merchant approval processes
- Multi-level authorization
- Automated notifications

### 🛒 **Enhanced Shopping**
- Bulk add-to-cart functionality
- Free shipping progress indicator
- Promotional code system
- Order management

### 📱 **Modern Frontend**
- Responsive design
- Server-side rendering
- Real-time updates
- Mobile-optimized

&nbsp;

## 🚀 Quick Start

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
yarn install

# Setup environment
cp .env.template .env

# Configure your database URL in .env file
# DATABASE_URL=postgresql://username:password@localhost:5432/cubitstore

# Run migrations and seed data
yarn build
yarn medusa db:create
yarn medusa db:migrate
yarn run seed

# Create admin user
yarn medusa user -e admin@cubitpackaging.com -p admin123 -i admin

# Start backend server
yarn dev
```

### Storefront Setup

```bash
# Navigate to storefront
cd storefront

# Install dependencies
yarn install

# Setup environment
cp .env.template .env

# Configure your backend URL in .env file
# NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000

# Start development server
yarn dev
```

### Access Your Application

- **Backend API**: http://localhost:9000
- **Admin Dashboard**: http://localhost:9000/app
- **Storefront**: http://localhost:8000

**Default Admin Credentials**:
- Email: `admin@cubitpackaging.com`
- Password: `admin123`

&nbsp;

## 🌐 Deployment

### Using Docker (Recommended)

```bash
# Build and deploy backend
cd backend
docker build -t cubitstore-backend .
docker run -p 9000:9000 cubitstore-backend
```

### Using EasyPanel

1. **Connect Repository**: Link your GitHub repository
2. **Select Root Directory**: `/backend`
3. **Configure Environment Variables**:
   ```env
   DATABASE_URL=your_postgresql_url
   REDIS_URL=your_redis_url
   JWT_SECRET=your_secret_key
   COOKIE_SECRET=your_cookie_secret
   ```
4. **Deploy**: EasyPanel will handle the rest!

&nbsp;

## 💻 Development

### Available Scripts

**Backend**:
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn seed` - Seed database with sample data

**Storefront**:
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server

### Code Structure

- **Backend**: Built with Medusa.js framework
- **Frontend**: Next.js 15 with App Router
- **Database**: PostgreSQL with Mikro-ORM
- **Styling**: Tailwind CSS
- **TypeScript**: Fully typed codebase

&nbsp;

## ⚙️ Environment Setup

### Backend Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/cubitstore
DB_NAME=cubitstore

# Redis (optional)
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your-super-secret-jwt-key
COOKIE_SECRET=your-super-secret-cookie-key

# CORS
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:7000,http://localhost:7001

# Port
PORT=9000
```

### Storefront Environment Variables

```env
# Backend API
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_publishable_key

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:8000
```

&nbsp;

## 📞 Support

For issues and questions:
- Check the documentation
- Review environment setup
- Ensure all services are running

---

**CubitStore** - Built for modern B2B commerce 🚀
