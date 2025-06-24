# Deployment Guide for CubitStore Backend

This guide explains how to deploy the CubitStore backend using EasyPanel and Docker.

## Prerequisites

- EasyPanel installed on your server
- Git repository access
- PostgreSQL database (external)
- Redis instance (external)

## Deployment Steps with EasyPanel

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/StoreCubit.git
cd StoreCubit/backend
```

### 2. Configure Environment Variables

Create a `.env.production` file based on the template:

```bash
cp .env.production.template .env.production
```

Edit the file with your actual values:

```
STORE_CORS=https://your-storefront-domain.com
ADMIN_CORS=https://your-admin-domain.com
AUTH_CORS=https://your-admin-domain.com
REDIS_URL=redis://default:password@your-redis-host:6379
JWT_SECRET=your-jwt-secret
COOKIE_SECRET=your-cookie-secret
DATABASE_URL=postgres://postgres:password@your-postgres-host:5432/your-db-name?sslmode=disable
DB_NAME=your-db-name
OPENAI_API_KEY=your-openai-api-key-here
AUTO_GENERATE_DESCRIPTIONS=false

# Email settings
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SMTP_FROM=your-from-email@example.com

# Base URL for admin panel - Change this to your domain
ADMIN_URL=https://your-domain.com/app
```

### 3. Deploy with EasyPanel

1. In EasyPanel, go to "Projects" and click "Create Project"
2. Choose "Import from Git"
3. Enter your Git repository URL
4. Select the branch (usually `main` or `master`)
5. Choose the directory containing the `easypanel.yml` file (backend folder)
6. Configure environment variables in EasyPanel UI, using values from your `.env.production` file
7. Click "Deploy"

### 4. Configure Nginx for Custom Admin URL

To make the admin panel accessible at admin.cubitpackaging.com, you'll need to configure Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name admin.cubitpackaging.com;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name admin.cubitpackaging.com;

    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    # Admin panel at /app
    location /app {
        proxy_pass http://localhost:9000/app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API endpoints
    location /store {
        proxy_pass http://localhost:9000/store;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /admin {
        proxy_pass http://localhost:9000/admin;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /auth {
        proxy_pass http://localhost:9000/auth;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. Setup Domain in EasyPanel

1. In EasyPanel, go to your project settings
2. Add your domain `admin.cubitpackaging.com` and enable HTTPS
3. EasyPanel will handle the SSL certificate with Let's Encrypt

### 6. Database Migrations

After deployment, you need to run database migrations:

```bash
# SSH into your server or use EasyPanel terminal
docker exec -it cubit-store-backend yarn medusa migrations run
```

## Troubleshooting

### Database Connection Issues

- Check if your PostgreSQL credentials are correct
- Ensure your database server allows connections from your EasyPanel server
- Verify that the database exists and has the correct permissions

### Redis Connection Issues

- Check if your Redis credentials are correct
- Ensure your Redis server allows connections from your EasyPanel server

### Email Configuration Issues

- Test your SMTP credentials with a simple test email
- Check for any firewall rules blocking SMTP traffic

### Admin Panel Not Loading

- Check browser console for errors
- Verify that the ADMIN_URL environment variable is set correctly
- Ensure your Nginx configuration is correct

## Monitoring and Logs

- Use EasyPanel's built-in log viewer to monitor application logs
- Set up alerts for critical errors
- Consider implementing a monitoring solution like Prometheus with Grafana

## Backup Strategy

- Set up regular database backups
- Store backups in a secure, offsite location
- Test restoration procedures regularly 