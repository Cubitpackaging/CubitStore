# Coolify Deployment Guide - Medusa B2B Backend

## 🎯 Overview

This guide will help you deploy your Medusa B2B backend to Coolify, a self-hosted deployment platform. Coolify allows you to run everything (backend + databases) on a single server.

## 📋 Prerequisites

- VPS server (Ubuntu 22.04 recommended)
  - Minimum: 2 CPU, 4GB RAM, 20GB storage
  - Recommended: 4 CPU, 8GB RAM, 50GB storage
  - Providers: Hetzner, DigitalOcean, Linode, AWS EC2
- Domain name (for admin panel)
- Git repository access
- Basic SSH knowledge

## 🚀 Step 1: Set Up VPS Server

### 1.1 Get a VPS

**Recommended Providers:**
- **Hetzner**: €4-10/month (best value)
- **DigitalOcean**: $6-12/month
- **Linode**: $5-12/month
- **AWS EC2**: $5-15/month

**Minimum Specs:**
- 2 CPU cores
- 4GB RAM
- 20GB SSD storage
- Ubuntu 22.04 LTS

### 1.2 Initial Server Setup

```bash
# SSH into your server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install basic tools
apt install -y curl wget git ufw
```

### 1.3 Configure Firewall

```bash
# Allow SSH
ufw allow 22/tcp

# Allow HTTP/HTTPS (Coolify will handle this)
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw enable
```

---

## 🐳 Step 2: Install Coolify

### 2.1 Install Coolify

Coolify can be installed with a single command:

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

This will:
- Install Docker and Docker Compose
- Install Coolify
- Set up Traefik (reverse proxy)
- Configure SSL certificates

### 2.2 Access Coolify

After installation, you'll see:
```
✅ Coolify is ready!
🌐 Access it at: http://your-server-ip:8000
```

**Important**: 
- Note the admin password shown in the output
- Access Coolify at `http://your-server-ip:8000`
- Login with the credentials provided

### 2.3 Initial Configuration

1. **Login to Coolify**
   - Go to `http://your-server-ip:8000`
   - Use the admin credentials from installation

2. **Set up your domain** (optional but recommended)
   - Go to Settings → General
   - Add your domain
   - Configure DNS (point to your server IP)

---

## 🗄️ Step 3: Provision Databases

### 3.1 Create PostgreSQL Database

1. **In Coolify Dashboard:**
   - Click "New Resource"
   - Select "Database"
   - Choose "PostgreSQL"
   - Fill in:
     - **Name**: `medusa-postgres`
     - **PostgreSQL Version**: `15` or `16`
     - **Database Name**: `cubitstore`
     - **Database User**: `medusa`
     - **Database Password**: (generate strong password)
   - Click "Deploy"

2. **Wait for deployment** (2-3 minutes)

3. **Get Connection Details:**
   - Click on the PostgreSQL service
   - Note the **Internal URL** (for use in Medusa)
   - Format: `postgresql://medusa:password@medusa-postgres:5432/cubitstore`

### 3.2 Create Redis Instance

1. **In Coolify Dashboard:**
   - Click "New Resource"
   - Select "Database"
   - Choose "Redis"
   - Fill in:
     - **Name**: `medusa-redis`
     - **Redis Version**: `7` (latest)
     - **Password**: (generate strong password)
   - Click "Deploy"

2. **Wait for deployment** (1-2 minutes)

3. **Get Connection Details:**
   - Click on the Redis service
   - Note the **Internal URL** (for use in Medusa)
   - Format: `redis://default:password@medusa-redis:6379`

**Important**: Use **internal service names** (e.g., `medusa-postgres`, `medusa-redis`) in connection strings, not IP addresses. Coolify handles internal networking automatically.

---

## 📦 Step 4: Deploy Medusa Backend

### 4.1 Create New Application

1. **In Coolify Dashboard:**
   - Click "New Resource"
   - Select "Docker Compose" or "Dockerfile"
   - Choose "Dockerfile" (recommended)

2. **Configure Application:**
   - **Name**: `medusa-backend`
   - **Repository**: Your Git repository URL
   - **Branch**: `main` (or your deployment branch)
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Build Context**: `backend/`
   - **Port**: `9000`

### 4.2 Configure Environment Variables

Add these environment variables in Coolify UI:

#### Core Configuration
```bash
NODE_ENV=production
STORE_CORS=https://your-storefront-domain.com
ADMIN_CORS=https://admin.yourdomain.com
AUTH_CORS=https://admin.yourdomain.com,https://your-storefront-domain.com
```

#### Database (Use Internal Service Name)
```bash
DATABASE_URL=postgresql://medusa:your-password@medusa-postgres:5432/cubitstore
DB_NAME=cubitstore
```

#### Redis (Use Internal Service Name)
```bash
REDIS_URL=redis://default:your-redis-password@medusa-redis:6379
```

#### Security (CHANGE THESE!)
```bash
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
COOKIE_SECRET=your-super-secret-cookie-key-min-32-characters-long
```

#### Admin Panel
```bash
ADMIN_URL=https://admin.yourdomain.com/app
MEDUSA_BACKEND_URL=https://admin.yourdomain.com
DISABLE_MEDUSA_ADMIN=false
MEDUSA_WORKER_MODE=server
```

#### Email Configuration
```bash
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@domain.com
SMTP_PASS=your-email-password
SMTP_FROM=your-email@domain.com
```

#### Optional
```bash
OPENAI_API_KEY=your-openai-key
AUTO_GENERATE_DESCRIPTIONS=false
```

### 4.3 Configure Pre-Deploy Hook (Migrations)

In Coolify, you can set up a pre-deploy command:

1. **Go to Application Settings**
2. **Find "Build Command" or "Pre-Deploy Hook"**
3. **Add:**
   ```bash
   yarn install && yarn build:admin && yarn medusa migrations run
   ```

Or use the **docker-compose.yml** approach (see next section) for more control.

### 4.4 Configure Domain

1. **In Application Settings:**
   - Go to "Domains"
   - Add domain: `admin.yourdomain.com`
   - Enable "Generate SSL Certificate"
   - Coolify will automatically configure Let's Encrypt SSL

2. **Configure DNS:**
   - Add A record: `admin.yourdomain.com` → `your-server-ip`
   - Wait for DNS propagation (5-30 minutes)

### 4.5 Deploy

1. **Click "Deploy"**
2. **Monitor build logs** in Coolify
3. **Wait for deployment** (5-10 minutes for first build)

---

## 🔧 Step 5: Post-Deployment Setup

### 5.1 Run Migrations (if not in pre-deploy)

If migrations didn't run automatically:

1. **Access Application Terminal:**
   - Go to your application in Coolify
   - Click "Terminal" or "Execute Command"
   - Run:
   ```bash
   yarn medusa migrations run
   ```

### 5.2 Create Admin User

1. **In Application Terminal:**
   ```bash
   yarn medusa user -e admin@yourdomain.com -p yourpassword -i admin
   ```

### 5.3 Verify Deployment

1. **Health Check:**
   ```bash
   curl https://admin.yourdomain.com/health
   ```
   Should return: `200 OK`

2. **Access Admin Panel:**
   - Go to: `https://admin.yourdomain.com/app`
   - Login with admin credentials

3. **Test API Endpoints:**
   - Store API: `https://admin.yourdomain.com/store`
   - Admin API: `https://admin.yourdomain.com/admin`

### 5.4 Create Publishable API Key

1. **Login to Admin Panel**
2. **Go to**: Settings → Publishable API Keys
3. **Create new key** for "Webshop" or "Storefront"
4. **Copy the key** - you'll need it for Vercel deployment

---

## 🐳 Alternative: Using Docker Compose

If you prefer more control, you can use a `docker-compose.yml` file:

### Create `backend/docker-compose.coolify.yml`

```yaml
version: '3.8'

services:
  medusa-backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: medusa-backend
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - STORE_CORS=${STORE_CORS}
      - ADMIN_CORS=${ADMIN_CORS}
      - AUTH_CORS=${AUTH_CORS}
      - DATABASE_URL=${DATABASE_URL}
      - DB_NAME=${DB_NAME}
      - REDIS_URL=${REDIS_URL}
      - JWT_SECRET=${JWT_SECRET}
      - COOKIE_SECRET=${COOKIE_SECRET}
      - ADMIN_URL=${ADMIN_URL}
      - MEDUSA_BACKEND_URL=${MEDUSA_BACKEND_URL}
      - MEDUSA_WORKER_MODE=${MEDUSA_WORKER_MODE:-server}
      - DISABLE_MEDUSA_ADMIN=${DISABLE_MEDUSA_ADMIN:-false}
      - SMTP_HOST=${SMTP_HOST}
      - SMTP_PORT=${SMTP_PORT}
      - SMTP_SECURE=${SMTP_SECURE:-true}
      - SMTP_USER=${SMTP_USER}
      - SMTP_PASS=${SMTP_PASS}
      - SMTP_FROM=${SMTP_FROM}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - AUTO_GENERATE_DESCRIPTIONS=${AUTO_GENERATE_DESCRIPTIONS:-false}
    ports:
      - "9000:9000"
    depends_on:
      - medusa-postgres
      - medusa-redis
    networks:
      - coolify

  medusa-postgres:
    image: postgres:15-alpine
    container_name: medusa-postgres
    restart: unless-stopped
    environment:
      - POSTGRES_DB=${DB_NAME:-cubitstore}
      - POSTGRES_USER=${POSTGRES_USER:-medusa}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - medusa-postgres-data:/var/lib/postgresql/data
    networks:
      - coolify

  medusa-redis:
    image: redis:7-alpine
    container_name: medusa-redis
    restart: unless-stopped
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - medusa-redis-data:/data
    networks:
      - coolify

volumes:
  medusa-postgres-data:
  medusa-redis-data:

networks:
  coolify:
    external: true
```

**Note**: Coolify handles networking automatically, so you might not need the `depends_on` and `networks` sections if using Coolify's built-in database provisioning (recommended).

---

## 🔍 Troubleshooting

### Issue: Build Fails

**Solution:**
- Check build logs in Coolify
- Verify Dockerfile path is correct
- Ensure all dependencies are in package.json
- Check Node version (requires 20+)

### Issue: Database Connection Failed

**Solution:**
- Verify you're using **internal service names** (not IPs)
- Format: `postgresql://user:pass@medusa-postgres:5432/dbname`
- Check database is running in Coolify
- Verify database credentials

### Issue: Redis Connection Failed

**Solution:**
- Use **internal service name**: `medusa-redis`
- Format: `redis://default:password@medusa-redis:6379`
- Check Redis is running
- Verify password is correct

### Issue: Migrations Failed

**Solution:**
- Run manually in terminal:
  ```bash
  yarn medusa migrations run
  ```
- Check database permissions
- Verify database exists

### Issue: Admin Panel 404

**Solution:**
- Verify `ADMIN_URL` environment variable
- Check domain configuration in Coolify
- Ensure `DISABLE_MEDUSA_ADMIN=false`
- Check application logs

### Issue: SSL Certificate Not Generated

**Solution:**
- Verify DNS is pointing to server
- Wait for DNS propagation
- Check domain in Coolify settings
- Manually trigger SSL generation

### Issue: Application Won't Start

**Solution:**
- Check application logs in Coolify
- Verify all environment variables are set
- Check port configuration (9000)
- Verify database/Redis connections

---

## 📊 Monitoring & Logs

### View Logs
- **In Coolify**: Go to your application → Logs
- **Real-time**: Logs update in real-time
- **Historical**: View past logs

### Health Checks
- **Endpoint**: `/health`
- **Monitor**: Set up health check in Coolify
- **Alerts**: Configure alerts for failures

### Resource Usage
- **CPU/Memory**: View in Coolify dashboard
- **Database**: Monitor PostgreSQL usage
- **Redis**: Monitor Redis memory

---

## 🔄 Updating Deployment

### Automatic Updates (Git Integration)

1. **Push changes to Git**
2. **Coolify detects changes** (if auto-deploy enabled)
3. **Rebuilds and redeploys automatically**

### Manual Updates

1. **Go to application in Coolify**
2. **Click "Redeploy"**
3. **Monitor build logs**

### Running Migrations After Update

If you update Medusa and need to run migrations:

1. **Access terminal**
2. **Run**: `yarn medusa migrations run`
3. **Restart application** if needed

---

## 🔐 Security Best Practices

### 1. Environment Variables
- Never commit secrets to Git
- Use Coolify's environment variables
- Rotate secrets regularly

### 2. Database Security
- Use strong database passwords
- Restrict database access (internal only)
- Regular backups

### 3. Redis Security
- Use password authentication
- Keep Redis internal (not exposed)

### 4. Application Security
- Use strong JWT_SECRET and COOKIE_SECRET (32+ chars)
- Enable HTTPS (automatic with Coolify)
- Keep dependencies updated
- Monitor logs for suspicious activity

### 5. Server Security
- Keep server updated: `apt update && apt upgrade`
- Use SSH keys (disable password auth)
- Configure firewall properly
- Regular security audits

---

## 💾 Backup Strategy

### Database Backups

1. **Manual Backup:**
   ```bash
   # In Coolify terminal or via SSH
   docker exec medusa-postgres pg_dump -U medusa cubitstore > backup.sql
   ```

2. **Automated Backups:**
   - Set up cron job for daily backups
   - Store backups off-server
   - Test restoration procedures

### Application Backups

- **Code**: Git repository is your backup
- **Configuration**: Export environment variables
- **Volumes**: Backup Docker volumes

### Redis Backups

- Redis data is less critical (cache)
- Can be regenerated
- Still good to backup periodically

---

## 📈 Scaling Considerations

### Vertical Scaling (More Resources)

1. **Upgrade VPS:**
   - More CPU cores
   - More RAM
   - More storage

2. **Update in Coolify:**
   - Adjust resource limits
   - Restart services

### Horizontal Scaling (More Servers)

1. **Add more Coolify instances**
2. **Use load balancer**
3. **Separate database server** (if needed)

### Database Scaling

- **PostgreSQL**: Can upgrade to larger instance
- **Connection pooling**: Configure in Medusa
- **Read replicas**: For high read traffic

---

## 🎯 Quick Reference

### Internal Service Names
- PostgreSQL: `medusa-postgres:5432`
- Redis: `medusa-redis:6379`

### Connection Strings
- Database: `postgresql://user:pass@medusa-postgres:5432/dbname`
- Redis: `redis://default:pass@medusa-redis:6379`

### Important URLs
- Coolify Dashboard: `http://your-server-ip:8000`
- Admin Panel: `https://admin.yourdomain.com/app`
- Health Check: `https://admin.yourdomain.com/health`

### Common Commands
```bash
# Run migrations
yarn medusa migrations run

# Create admin user
yarn medusa user -e admin@domain.com -p password -i admin

# Check logs
# (via Coolify UI or docker logs)
```

---

## 📚 Resources

- [Coolify Documentation](https://coolify.io/docs)
- [Medusa Documentation](https://docs.medusajs.com/v2)
- [Medusa B2B Starter](https://github.com/medusajs/b2b-starter-medusa)
- [Docker Documentation](https://docs.docker.com)

---

## ✅ Deployment Checklist

- [ ] VPS server set up
- [ ] Coolify installed
- [ ] PostgreSQL provisioned
- [ ] Redis provisioned
- [ ] Medusa backend deployed
- [ ] Environment variables configured
- [ ] Domain configured with SSL
- [ ] Migrations run
- [ ] Admin user created
- [ ] Health check passing
- [ ] Admin panel accessible
- [ ] Publishable API key created
- [ ] Backups configured
- [ ] Monitoring set up

---

**Congratulations!** Your Medusa B2B backend is now deployed on Coolify! 🎉

Next step: Deploy your storefront to Vercel using the publishable API key.
