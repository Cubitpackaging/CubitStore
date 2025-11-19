# Coolify Complete Step-by-Step Guide - Medusa B2B

## 🎯 Overview

This is a **complete, baby-step guide** for deploying Medusa B2B to Coolify. Every click, every option, every screen is documented.

**Your Setup:**
- Private Git repository
- Medusa B2B backend
- Need PostgreSQL + Redis
- Admin domain: `admin.yourdomain.com`

---

## 📋 Table of Contents

1. [Server Setup](#step-1-server-setup)
2. [Install Coolify](#step-2-install-coolify)
3. [Initial Coolify Configuration](#step-3-initial-coolify-configuration)
4. [Connect Private Git Repository](#step-4-connect-private-git-repository)
5. [Provision PostgreSQL Database](#step-5-provision-postgresql-database)
6. [Provision Redis](#step-6-provision-redis)
7. [Deploy Medusa Backend](#step-7-deploy-medusa-backend)
8. [Configure Environment Variables](#step-8-configure-environment-variables)
9. [Configure Domain & SSL](#step-9-configure-domain--ssl)
10. [Deploy & Verify](#step-10-deploy--verify)
11. [Post-Deployment Setup](#step-11-post-deployment-setup)

---

## Step 1: Server Setup

### 1.1 Get a VPS Server

**Recommended Providers:**
- **Hetzner** (best value): https://www.hetzner.com/cloud
- **DigitalOcean**: https://www.digitalocean.com
- **Linode**: https://www.linode.com

**Minimum Requirements:**
- **CPU**: 2 cores
- **RAM**: 4 GB
- **Storage**: 20 GB SSD
- **OS**: Ubuntu 22.04 LTS
- **Location**: Choose closest to your users

**Step-by-Step (Hetzner Example):**

1. Go to https://www.hetzner.com/cloud
2. Click **"Sign Up"** (top right)
3. Create account and verify email
4. Click **"New Project"**
5. Name it: `medusa-b2b` (or any name)
6. Click **"Add Server"**
7. **Configuration:**
   - **Location**: Choose closest region
   - **Image**: Click "Ubuntu"
   - **Version**: Select "22.04"
   - **Type**: Click "CPX11" (2 vCPU, 4 GB RAM) - €4.75/month
   - **SSH Keys**: (Optional) Add your SSH key, or use password
   - **Networks**: Leave default
   - **Volumes**: Not needed
   - **Firewalls**: Not needed (we'll configure later)
   - **Backups**: Optional (adds cost)
   - **Labels**: Leave empty
8. Click **"Create & Buy Now"**
9. **Wait 1-2 minutes** for server to be created
10. **Note these details:**
    - **Server IP**: `xxx.xxx.xxx.xxx` (shown on dashboard)
    - **Root Password**: (if you didn't use SSH key, check email or reset)

### 1.2 Connect to Server via SSH

**On Windows (using PowerShell or Git Bash):**
```bash
ssh root@your-server-ip
```
Type `yes` when asked about fingerprint
Enter password when prompted

**On Mac/Linux:**
```bash
ssh root@your-server-ip
```
Type `yes` when asked about fingerprint
Enter password when prompted

**If connection fails:**
- Check firewall on your computer
- Verify server IP is correct
- Wait 2-3 minutes after server creation

### 1.3 Initial Server Configuration

Once connected, you'll see a terminal prompt like:
```
root@your-server-name:~#
```

**Run these commands one by one:**

```bash
# Update system packages
apt update
```
Wait for it to finish (30 seconds - 2 minutes)

```bash
# Upgrade system
apt upgrade -y
```
Wait for it to finish (2-5 minutes). Type `Y` if asked.

```bash
# Install basic tools
apt install -y curl wget git ufw
```
Wait for it to finish (30 seconds - 1 minute)

```bash
# Configure firewall - Allow SSH
ufw allow 22/tcp
```

```bash
# Allow HTTP
ufw allow 80/tcp
```

```bash
# Allow HTTPS
ufw allow 443/tcp
```

```bash
# Enable firewall
ufw enable
```
Type `y` when asked

```bash
# Verify firewall status
ufw status
```
Should show: `Status: active` and rules for ports 22, 80, 443

**✅ Server is ready! Keep this SSH session open.**

---

## Step 2: Install Coolify

### 2.1 Run Installation Script

**In your SSH terminal, run:**

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

**What happens:**
- Downloads and installs Docker
- Downloads and installs Docker Compose
- Installs Coolify
- Sets up Traefik (reverse proxy)
- Configures networking

**Wait time:** 5-10 minutes

**You'll see output like:**
```
[INFO] Installing Docker...
[INFO] Installing Docker Compose...
[INFO] Installing Coolify...
[INFO] Starting Coolify...
✅ Coolify is ready!
🌐 Access it at: http://your-server-ip:8000
🔑 Admin Password: xxxxxxxx
```

### 2.2 Save Important Information

**From the output, note:**
1. **Coolify URL**: `http://your-server-ip:8000`
2. **Admin Password**: The password shown (save this!)

**Example output:**
```
✅ Coolify is ready!
🌐 Access it at: http://123.45.67.89:8000
🔑 Admin Password: abc123xyz789
```

**⚠️ IMPORTANT:** Save the password! You'll need it to login.

### 2.3 Verify Installation

**Check if Coolify is running:**

```bash
docker ps
```

You should see containers running, including:
- `coolify-proxy` (Traefik)
- `coolify-db` (Coolify's database)
- `coolify-redis` (Coolify's Redis)

**If you see errors:**
- Wait 2-3 more minutes
- Run: `docker ps -a` to see all containers
- Check logs: `docker logs coolify-proxy`

---

## Step 3: Initial Coolify Configuration

### 3.1 Access Coolify Web Interface

1. **Open your web browser**
2. **Go to:** `http://your-server-ip:8000`
   - Replace `your-server-ip` with your actual server IP
   - Example: `http://123.45.67.89:8000`

3. **You'll see the Coolify login page**

### 3.2 First Login

**On the login screen:**

1. **Email/Username field:**
   - Type: `admin@coolify.io` (default)
   - Or check your installation output for the username

2. **Password field:**
   - Type the password from Step 2.2
   - (The one shown in terminal output)

3. **Click "Login" button**

**If login fails:**
- Double-check password (copy-paste to avoid typos)
- Check if Coolify is running: `docker ps` in SSH
- Try refreshing the page

### 3.3 Initial Setup Wizard (If Shown)

**If you see a setup wizard:**

1. **Welcome Screen:**
   - Click "Next" or "Get Started"

2. **Server Configuration:**
   - **Server Name**: Type `medusa-server` (or any name)
   - **Description**: Optional, leave empty or type description
   - Click "Next"

3. **Domain Configuration (Optional):**
   - **Do you have a domain?**: Select "No" for now (we'll add later)
   - Or select "Yes" and enter your domain
   - Click "Next"

4. **Finish Setup:**
   - Click "Finish" or "Complete Setup"

### 3.4 Navigate Coolify Dashboard

**After login, you'll see the Coolify dashboard:**

**Left Sidebar Menu:**
- 🏠 **Dashboard** (home icon)
- 📦 **Resources** (box icon) - This is where we'll create databases and apps
- ⚙️ **Settings** (gear icon)
- 👤 **Profile** (user icon)

**Main Area:**
- Welcome message
- Quick stats
- Recent activity

**✅ You're now in Coolify!**

---

## Step 4: Connect Private Git Repository

### 4.1 Access Settings

1. **Click "Settings"** in left sidebar (gear icon ⚙️)
2. **You'll see settings menu:**
   - General
   - Security
   - **Source Providers** ← Click this
   - Docker
   - Email
   - etc.

### 4.2 Add Git Provider

**On Source Providers page:**

1. **You'll see options:**
   - GitHub
   - GitLab
   - Bitbucket
   - Custom Git Server

2. **Click the provider you use** (most likely GitHub)

### 4.3 Configure GitHub (Private Repository)

**If using GitHub:**

#### Option A: Personal Access Token (Recommended)

1. **Create GitHub Personal Access Token:**
   - Open new browser tab
   - Go to: https://github.com/settings/tokens
   - Click **"Generate new token"** → **"Generate new token (classic)"**
   - **Note name**: `Coolify Deployment`
   - **Expiration**: Choose "90 days" or "No expiration"
   - **Select scopes:**
     - ✅ **repo** (Full control of private repositories)
     - ✅ **read:org** (if using organization repos)
   - Scroll down, click **"Generate token"**
   - **⚠️ COPY THE TOKEN IMMEDIATELY** (you won't see it again!)
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

2. **Back in Coolify:**
   - **Provider Name**: Type `GitHub` (or any name)
   - **Personal Access Token**: Paste the token you just copied
   - **Click "Save" or "Add Provider"**

#### Option B: OAuth App (Alternative)

1. **In Coolify:**
   - Click **"Connect with OAuth"** button
   - You'll be redirected to GitHub
   - Click **"Authorize Coolify"**
   - You'll be redirected back to Coolify
   - Provider is now connected

### 4.4 Configure GitLab (If Using GitLab)

**If using GitLab:**

1. **Create GitLab Personal Access Token:**
   - Go to: https://gitlab.com/-/user_settings/personal_access_tokens
   - **Token name**: `Coolify Deployment`
   - **Expiration date**: Set or leave empty
   - **Select scopes:**
     - ✅ **read_repository**
     - ✅ **api**
   - Click **"Create personal access token"**
   - **Copy the token**

2. **Back in Coolify:**
   - **Provider Name**: `GitLab`
   - **Personal Access Token**: Paste token
   - **GitLab URL**: `https://gitlab.com` (or your self-hosted URL)
   - Click **"Save"**

### 4.5 Verify Git Connection

**After adding provider:**

1. **You should see:**
   - Provider listed with green checkmark ✅
   - Status: "Connected" or "Active"

2. **Test connection:**
   - Click on the provider
   - You should see your repositories listed
   - If you see your private repo, it's working! ✅

**If connection fails:**
- Check token permissions (must have `repo` scope)
- Verify token hasn't expired
- Try regenerating token

**✅ Git repository is now connected!**

---

## Step 5: Provision PostgreSQL Database

### 5.1 Navigate to Resources

1. **Click "Resources"** in left sidebar (📦 box icon)
2. **You'll see:**
   - Empty state or list of existing resources
   - **"New Resource"** button (top right or center)

### 5.2 Create New Database Resource

1. **Click "New Resource"** button
2. **You'll see resource type options:**
   - **Application** (for your Medusa backend)
   - **Database** ← Click this
   - **Service** (for other services)

### 5.3 Select PostgreSQL

**After clicking "Database":**

1. **You'll see database options:**
   - PostgreSQL
   - MySQL
   - MongoDB
   - Redis
   - MariaDB
   - etc.

2. **Click "PostgreSQL"**

### 5.4 Configure PostgreSQL

**You'll see a form with these fields:**

1. **Name** (required):
   - Type: `medusa-postgres`
   - This is the internal service name (important!)
   - Must be lowercase, no spaces
   - Use hyphens for separation

2. **Description** (optional):
   - Type: `Medusa B2B PostgreSQL Database`
   - Or leave empty

3. **PostgreSQL Version** (dropdown):
   - Click dropdown
   - Select: **`15`** or **`16`** (recommended: 15)
   - This is the PostgreSQL version

4. **Database Name** (required):
   - Type: `cubitstore`
   - This is the actual database name inside PostgreSQL
   - Can be different from service name

5. **Database User** (required):
   - Type: `medusa`
   - This is the PostgreSQL user
   - Will be used in connection string

6. **Database Password** (required):
   - **Option 1**: Click **"Generate"** button (recommended)
     - Coolify will generate a strong password
     - **⚠️ COPY THIS PASSWORD IMMEDIATELY!**
     - Save it in a secure place (password manager)
   - **Option 2**: Type your own password
     - Must be strong (mix of letters, numbers, symbols)
     - Minimum 12 characters recommended

7. **Persistent Volume** (checkbox):
   - ✅ **Keep this checked** (default)
   - This ensures data persists when container restarts
   - Volume name will be auto-generated

8. **Network** (dropdown):
   - Leave default: `coolify` or `default`
   - This is the Docker network name

9. **Environment Variables** (optional):
   - Leave empty for now
   - Can add custom PostgreSQL configs if needed

10. **Resource Limits** (optional):
    - **CPU**: Leave default or set limit
    - **Memory**: Leave default or set limit (e.g., 512MB)
    - For small deployments, defaults are fine

### 5.5 Review and Deploy

**Before clicking deploy, verify:**

- ✅ Name: `medusa-postgres`
- ✅ Version: `15` or `16`
- ✅ Database Name: `cubitstore`
- ✅ Database User: `medusa`
- ✅ Password: Saved/copied
- ✅ Persistent Volume: Checked

**Click "Deploy" or "Create" button**

### 5.6 Wait for Deployment

**After clicking Deploy:**

1. **You'll see:**
   - Deployment status page
   - Progress indicator
   - Logs showing:
     - Pulling PostgreSQL image
     - Creating container
     - Starting database
     - Health checks

2. **Wait time:** 2-5 minutes

3. **You'll see status change:**
   - "Deploying..." → "Running" ✅

### 5.7 Get Connection Details

**Once deployment is complete:**

1. **Click on the `medusa-postgres` resource** (in resources list)

2. **You'll see details page with:**

   **Connection Information:**
   - **Host**: `medusa-postgres` (internal service name)
   - **Port**: `5432` (default PostgreSQL port)
   - **Database**: `cubitstore`
   - **User**: `medusa`
   - **Password**: (the one you saved)

   **Connection String Format:**
   ```
   postgresql://medusa:YOUR_PASSWORD@medusa-postgres:5432/cubitstore
   ```
   Replace `YOUR_PASSWORD` with the actual password

   **⚠️ IMPORTANT:** 
   - Use **`medusa-postgres`** as host (not IP address)
   - This is the internal Docker service name
   - Works only from within Coolify's network

3. **Save this connection string** - you'll need it for Medusa!

**✅ PostgreSQL is ready!**

---

## Step 6: Provision Redis

### 6.1 Create New Database Resource

1. **Go to Resources** (📦 in sidebar)
2. **Click "New Resource"** button
3. **Click "Database"**

### 6.2 Select Redis

**Database options screen:**
- Click **"Redis"**

### 6.3 Configure Redis

**Form fields:**

1. **Name** (required):
   - Type: `medusa-redis`
   - Internal service name
   - Must be lowercase, no spaces

2. **Description** (optional):
   - Type: `Medusa B2B Redis Cache`
   - Or leave empty

3. **Redis Version** (dropdown):
   - Click dropdown
   - Select: **`7`** or **`7-alpine`** (latest, recommended)
   - Alpine is smaller, 7 is standard

4. **Redis Password** (required):
   - **Option 1**: Click **"Generate"** button (recommended)
     - **⚠️ COPY THIS PASSWORD IMMEDIATELY!**
     - Save it securely
   - **Option 2**: Type your own password
     - Strong password recommended

5. **Persistent Volume** (checkbox):
   - ✅ **Keep checked** (default)
   - Redis data will persist

6. **Network** (dropdown):
   - Leave default: `coolify` or `default`

7. **Resource Limits** (optional):
   - **Memory**: Can set limit (e.g., 256MB)
   - Redis uses memory, so limit is useful
   - Default is usually fine

### 6.4 Review and Deploy

**Verify:**
- ✅ Name: `medusa-redis`
- ✅ Version: `7` or `7-alpine`
- ✅ Password: Saved/copied
- ✅ Persistent Volume: Checked

**Click "Deploy" button**

### 6.5 Wait for Deployment

**Status:**
- "Deploying..." → "Running" ✅
- **Wait time:** 1-3 minutes (Redis is faster than PostgreSQL)

### 6.6 Get Connection Details

**Click on `medusa-redis` resource:**

**Connection Information:**
- **Host**: `medusa-redis` (internal service name)
- **Port**: `6379` (default Redis port)
- **Password**: (the one you saved)

**Connection String Format:**
```
redis://default:YOUR_PASSWORD@medusa-redis:6379
```
Replace `YOUR_PASSWORD` with actual password

**⚠️ IMPORTANT:**
- Use **`medusa-redis`** as host (not IP)
- Format: `redis://default:password@medusa-redis:6379`

**✅ Redis is ready!**

---

## Step 7: Deploy Medusa Backend

### 7.1 Create New Application

1. **Go to Resources** (📦 in sidebar)
2. **Click "New Resource"** button
3. **Click "Application"** (not Database)

### 7.2 Select Source

**You'll see source options:**

1. **Git Repository** ← Click this (for your private repo)
2. Docker Image
3. Docker Compose
4. Dockerfile (local)

### 7.3 Connect Git Repository

**Git Repository screen:**

1. **Source Provider** (dropdown):
   - Click dropdown
   - Select the provider you configured in Step 4
   - Should show: `GitHub`, `GitLab`, etc.

2. **Repository** (dropdown):
   - Click dropdown
   - You'll see list of your repositories
   - **Select your Medusa B2B repository**
   - If it's an organization repo, it will show under organization name

3. **Branch** (dropdown or input):
   - Click dropdown or type
   - Select: `main` or `master` (your default branch)
   - Or type specific branch name

4. **Build Pack** (dropdown):
   - Click dropdown
   - Select: **"Dockerfile"** (not Node.js, not Nixpacks)
   - This tells Coolify to use your Dockerfile

5. **Root Directory** (input field):
   - Type: `backend`
   - This is the folder containing your Dockerfile
   - Coolify will look for `backend/Dockerfile`

6. **Click "Next" or "Continue" button**

### 7.4 Configure Application Details

**Application configuration screen:**

1. **Name** (required):
   - Type: `medusa-backend`
   - This is the application name in Coolify
   - Will be used for container name

2. **Description** (optional):
   - Type: `Medusa B2B Commerce Backend`
   - Or leave empty

3. **Dockerfile Path** (input):
   - Should auto-fill: `backend/Dockerfile`
   - If not, type: `backend/Dockerfile`
   - This is relative to repository root

4. **Build Context** (input):
   - Should auto-fill: `backend`
   - If not, type: `backend`
   - This is the directory where Docker build runs

5. **Port** (input):
   - Type: `9000`
   - This is the port Medusa runs on
   - Must match your Dockerfile EXPOSE port

6. **Docker Network** (dropdown):
   - Leave default: `coolify` or `default`
   - Must be same network as databases

7. **Click "Next" or "Continue"**

### 7.5 Configure Build Settings (If Shown)

**Build configuration screen:**

1. **Build Command** (optional):
   - Leave empty (Dockerfile handles build)
   - Or if you need custom build:
     ```
     yarn install && yarn build:admin
     ```

2. **Docker Build Arguments** (optional):
   - Leave empty (usually not needed)

3. **Dockerfile Location**:
   - Should show: `backend/Dockerfile`
   - Verify it's correct

4. **Click "Next" or "Continue"**

### 7.6 Configure Deployment Settings

**Deployment configuration:**

1. **Auto Deploy** (toggle/checkbox):
   - ✅ **Enable this** (recommended)
   - Automatically redeploys on Git push
   - Or leave disabled for manual deploys

2. **Deploy on Push** (if auto-deploy enabled):
   - ✅ **Enable** (recommended)
   - Deploys when you push to selected branch

3. **Health Check** (optional):
   - **Path**: Type `/health`
   - **Port**: `9000`
   - **Interval**: `30` (seconds)
   - This checks if app is running

4. **Restart Policy** (dropdown):
   - Select: **"unless-stopped"** (recommended)
   - Or "always"

5. **Click "Next" or "Save"**

### 7.7 Review Configuration

**Before deploying, verify:**

- ✅ Repository: Your Medusa repo
- ✅ Branch: `main` or correct branch
- ✅ Dockerfile: `backend/Dockerfile`
- ✅ Build Context: `backend`
- ✅ Port: `9000`
- ✅ Network: `coolify` (same as databases)

**Click "Deploy" or "Create" button**

### 7.8 Initial Build

**After clicking Deploy:**

1. **You'll see build page:**
   - Status: "Building..."
   - Progress logs:
     - Cloning repository
     - Building Docker image
     - Installing dependencies
     - Building admin UI
     - Creating container

2. **Wait time:** 5-15 minutes (first build is slow)

3. **Watch the logs:**
   - You'll see Docker build output
   - Watch for errors
   - Build will fail if there are issues

4. **Status changes:**
   - "Building..." → "Deploying..." → "Running" ✅

**⚠️ Don't close this page!** Wait for build to complete.

**If build fails:**
- Check logs for error messages
- Common issues:
  - Wrong Dockerfile path
  - Wrong build context
  - Missing dependencies
  - Network issues

**✅ Application is created (but not fully configured yet)!**

---

## Step 8: Configure Environment Variables

### 8.1 Access Application Settings

1. **Go to Resources** (📦 sidebar)
2. **Click on `medusa-backend`** application
3. **You'll see application details page**

**Tabs/Sections:**
- Overview
- **Environment Variables** ← Click this
- Domains
- Deployments
- Logs
- Terminal
- Settings

### 8.2 Add Environment Variables

**On Environment Variables page:**

**You'll see:**
- List of current environment variables (probably empty)
- **"Add Variable"** or **"+"** button
- Or form fields to add variables

**Add each variable one by one:**

#### Variable 1: NODE_ENV

1. **Click "Add Variable" or "+" button**
2. **Key field**: Type `NODE_ENV`
3. **Value field**: Type `production`
4. **Click "Save" or "Add"**

#### Variable 2: STORE_CORS

1. **Click "Add Variable"**
2. **Key**: `STORE_CORS`
3. **Value**: `https://your-storefront-domain.com`
   - Replace with your actual storefront domain
   - Example: `https://e.cubitpackaging.com` (testing subdomain)
4. **Click "Save"**

#### Variable 3: ADMIN_CORS

1. **Click "Add Variable"**
2. **Key**: `ADMIN_CORS`
3. **Value**: `https://admin.yourdomain.com`
   - Replace with your admin domain
   - Example: `https://admin.e.cubitpackaging.com` (testing subdomain)
4. **Click "Save"**

#### Variable 4: AUTH_CORS

1. **Click "Add Variable"**
2. **Key**: `AUTH_CORS`
3. **Value**: `https://admin.yourdomain.com,https://your-storefront-domain.com`
   - Both domains, separated by comma
   - Example: `https://admin.e.cubitpackaging.com,https://e.cubitpackaging.com` (testing subdomains)
4. **Click "Save"**

#### Variable 5: DATABASE_URL

1. **Click "Add Variable"**
2. **Key**: `DATABASE_URL`
3. **Value**: `postgresql://medusa:YOUR_POSTGRES_PASSWORD@medusa-postgres:5432/cubitstore`
   - Replace `YOUR_POSTGRES_PASSWORD` with the password from Step 5.6
   - **Important**: Use `medusa-postgres` as host (not IP!)
   - Format: `postgresql://user:password@host:port/database`
4. **Click "Save"**

#### Variable 6: DB_NAME

1. **Click "Add Variable"**
2. **Key**: `DB_NAME`
3. **Value**: `cubitstore`
4. **Click "Save"**

#### Variable 7: REDIS_URL

1. **Click "Add Variable"**
2. **Key**: `REDIS_URL`
3. **Value**: `redis://default:YOUR_REDIS_PASSWORD@medusa-redis:6379`
   - Replace `YOUR_REDIS_PASSWORD` with password from Step 6.6
   - **Important**: Use `medusa-redis` as host (not IP!)
   - Format: `redis://default:password@host:port`
4. **Click "Save"**

#### Variable 8: JWT_SECRET

1. **Click "Add Variable"**
2. **Key**: `JWT_SECRET`
3. **Value**: Generate a strong secret (32+ characters)
   - Use password generator or run: `openssl rand -base64 32`
   - Example: `your-super-secret-jwt-key-minimum-32-characters-long-abc123`
   - **⚠️ Save this securely!**
4. **Click "Save"**

#### Variable 9: COOKIE_SECRET

1. **Click "Add Variable"**
2. **Key**: `COOKIE_SECRET`
3. **Value**: Generate another strong secret (32+ characters)
   - Different from JWT_SECRET
   - Example: `your-super-secret-cookie-key-minimum-32-characters-long-xyz789`
   - **⚠️ Save this securely!**
4. **Click "Save"**

#### Variable 10: ADMIN_URL

1. **Click "Add Variable"**
2. **Key**: `ADMIN_URL`
3. **Value**: `https://admin.yourdomain.com/app`
   - Full URL with `/app` path
   - Example: `https://admin.cubitpackaging.com/app`
4. **Click "Save"**

#### Variable 11: MEDUSA_BACKEND_URL

1. **Click "Add Variable"**
2. **Key**: `MEDUSA_BACKEND_URL`
3. **Value**: `https://admin.yourdomain.com`
   - Base URL without `/app`
   - Example: `https://admin.e.cubitpackaging.com` (testing subdomain)
4. **Click "Save"**

#### Variable 12: MEDUSA_WORKER_MODE

1. **Click "Add Variable"**
2. **Key**: `MEDUSA_WORKER_MODE`
3. **Value**: `server`
   - Options: `server`, `worker`, `shared`
   - Use `server` for single instance
4. **Click "Save"**

#### Variable 13: DISABLE_MEDUSA_ADMIN

1. **Click "Add Variable"**
2. **Key**: `DISABLE_MEDUSA_ADMIN`
3. **Value**: `false`
   - Keep admin panel enabled
4. **Click "Save"**

#### Variable 14: SMTP_HOST

1. **Click "Add Variable"**
2. **Key**: `SMTP_HOST`
3. **Value**: Your SMTP server
   - Example: `smtp.gmail.com` or `smtp.hostinger.com`
   - Get this from your email provider
4. **Click "Save"**

#### Variable 15: SMTP_PORT

1. **Click "Add Variable"**
2. **Key**: `SMTP_PORT`
3. **Value**: `465` (for SSL) or `587` (for TLS)
   - Usually `465` for secure SMTP
4. **Click "Save"**

#### Variable 16: SMTP_SECURE

1. **Click "Add Variable"**
2. **Key**: `SMTP_SECURE`
3. **Value**: `true`
   - Use SSL/TLS
4. **Click "Save"**

#### Variable 17: SMTP_USER

1. **Click "Add Variable"**
2. **Key**: `SMTP_USER`
3. **Value**: Your email address
   - Example: `info@yourdomain.com`
4. **Click "Save"**

#### Variable 18: SMTP_PASS

1. **Click "Add Variable"**
2. **Key**: `SMTP_PASS`
3. **Value**: Your email password or app password
   - For Gmail, use App Password (not regular password)
4. **Click "Save"**

#### Variable 19: SMTP_FROM

1. **Click "Add Variable"**
2. **Key**: `SMTP_FROM`
3. **Value**: Your from email address
   - Usually same as SMTP_USER
   - Example: `info@yourdomain.com`
4. **Click "Save"**

#### Variable 20: OPENAI_API_KEY (Optional)

1. **Click "Add Variable"**
2. **Key**: `OPENAI_API_KEY`
3. **Value**: Your OpenAI API key (if using AI features)
   - Or leave empty if not using
4. **Click "Save"**

#### Variable 21: AUTO_GENERATE_DESCRIPTIONS (Optional)

1. **Click "Add Variable"**
2. **Key**: `AUTO_GENERATE_DESCRIPTIONS`
3. **Value**: `false`
   - Disable AI descriptions
4. **Click "Save"**

### 8.3 Verify All Variables

**Check your environment variables list:**

**Required variables (must have all):**
- ✅ NODE_ENV
- ✅ STORE_CORS
- ✅ ADMIN_CORS
- ✅ AUTH_CORS
- ✅ DATABASE_URL
- ✅ DB_NAME
- ✅ REDIS_URL
- ✅ JWT_SECRET
- ✅ COOKIE_SECRET
- ✅ ADMIN_URL
- ✅ MEDUSA_BACKEND_URL
- ✅ MEDUSA_WORKER_MODE
- ✅ DISABLE_MEDUSA_ADMIN
- ✅ SMTP_HOST
- ✅ SMTP_PORT
- ✅ SMTP_SECURE
- ✅ SMTP_USER
- ✅ SMTP_PASS
- ✅ SMTP_FROM

**Optional:**
- OPENAI_API_KEY
- AUTO_GENERATE_DESCRIPTIONS

**✅ All environment variables configured!**

---

## Step 9: Configure Domain & SSL

### 9.1 Access Domain Settings

1. **In application page** (`medusa-backend`)
2. **Click "Domains" tab** (or section)
3. **You'll see domain configuration**

### 9.2 Add Domain

**On Domains page:**

1. **Click "Add Domain" or "+" button**

2. **Domain input field:**
   - Type: `admin.yourdomain.com`
   - Replace with your actual domain
   - Example: `admin.e.cubitpackaging.com` (testing subdomain)
   - **Don't include** `http://` or `https://`
   - **Don't include** trailing slash

3. **SSL/TLS options:**
   - **Generate SSL Certificate**: ✅ **Check this** (recommended)
   - Coolify will use Let's Encrypt for free SSL
   - Automatic renewal

4. **Port** (if shown):
   - Should auto-fill: `9000`
   - Verify it's correct

5. **Path** (if shown):
   - Leave empty or `/`
   - Medusa serves from root

6. **Click "Save" or "Add Domain"**

### 9.3 Configure DNS

**Before SSL can work, configure DNS:**

1. **Go to your domain registrar** (where you bought domain)
   - Examples: Namecheap, GoDaddy, Cloudflare, etc.

2. **Access DNS Management:**
   - Find "DNS Settings" or "DNS Management"
   - Or "Advanced DNS"

3. **Add A Record:**
   - **Type**: `A`
   - **Name/Host**: `admin` (for admin.yourdomain.com)
     - Or `@` if you want root domain
   - **Value/Points to**: Your server IP address
     - The IP from Step 1.1
   - **TTL**: `3600` or default
   - **Click "Save" or "Add Record"**

4. **Wait for DNS propagation:**
   - Usually 5-30 minutes
   - Can take up to 48 hours (rare)
   - Check with: https://dnschecker.org

### 9.4 Verify DNS

**Check if DNS is working:**

1. **Open terminal/command prompt**
2. **Run:**
   ```bash
   ping admin.yourdomain.com
   ```
   Or:
   ```bash
   nslookup admin.yourdomain.com
   ```

3. **Should show your server IP**

**If not working:**
- Wait 10-15 more minutes
- Check DNS settings again
- Verify you saved the record

### 9.5 Generate SSL Certificate

**Back in Coolify:**

1. **Go to Domains section** (if not already there)
2. **You should see your domain listed**
3. **Status might show:**
   - "Pending" (waiting for DNS)
   - "Generating..." (creating certificate)
   - "Active" ✅ (certificate ready)

4. **If status is "Pending":**
   - Wait for DNS to propagate (check with ping)
   - Coolify will automatically retry
   - Or click "Retry" or "Generate" button

5. **Once DNS is working:**
   - Coolify will automatically generate SSL certificate
   - Wait 1-2 minutes
   - Status will change to "Active" ✅

**✅ Domain and SSL configured!**

---

## Step 10: Deploy & Verify

### 10.1 Trigger Deployment

**If you haven't deployed yet, or need to redeploy:**

1. **Go to application page** (`medusa-backend`)
2. **Click "Deployments" tab** (or "Deploy" button)
3. **Click "Deploy" or "Redeploy" button**
4. **Wait for deployment** (5-10 minutes)

**Or if auto-deploy is enabled:**
- Push to Git repository
- Coolify will automatically deploy

### 10.2 Monitor Deployment

**During deployment:**

1. **Watch the logs:**
   - Click "Logs" tab
   - You'll see real-time logs
   - Watch for errors

2. **Status indicators:**
   - "Building..." → "Deploying..." → "Running" ✅

3. **Common log messages:**
   - "Starting Medusa..."
   - "Database connection established"
   - "Redis connection established"
   - "Server running on port 9000"

### 10.3 Verify Health Check

**Once deployment shows "Running":**

1. **Open new browser tab**
2. **Go to:** `https://admin.yourdomain.com/health`
   - Replace with your actual domain
3. **Should see:**
   - `200 OK` or JSON response
   - Or health check status

**If you see error:**
- Wait 1-2 more minutes (app might still be starting)
- Check logs for errors
- Verify environment variables

### 10.4 Test Admin Panel

1. **Go to:** `https://admin.yourdomain.com/app`
2. **You should see:**
   - Medusa admin login page
   - Or redirect to login

**If you see 404 or error:**
- Check `ADMIN_URL` environment variable
- Verify domain is correct
- Check application logs

**✅ Application is running!**

---

## Step 11: Post-Deployment Setup

### 11.1 Access Application Terminal

1. **In Coolify, go to `medusa-backend` application**
2. **Click "Terminal" tab** (or "Execute Command")
3. **You'll see terminal interface**

### 11.2 Run Database Migrations

**In terminal, run:**

```bash
yarn medusa migrations run
```

**What happens:**
- Connects to database
- Runs all pending migrations
- Creates tables for Medusa + B2B modules
- Shows progress

**Wait for completion** (1-3 minutes)

**You'll see:**
- "Running migrations..."
- List of migrations
- "Migrations completed successfully" ✅

**If errors:**
- Check DATABASE_URL is correct
- Verify database is running
- Check connection string format

### 11.3 Create Admin User

**In terminal, run:**

```bash
yarn medusa user -e admin@yourdomain.com -p yourpassword -i admin
```

**Replace:**
- `admin@yourdomain.com` with your email
- `yourpassword` with strong password

**Example:**
```bash
yarn medusa user -e admin@e.cubitpackaging.com -p MySecurePass123! -i admin
```

**What happens:**
- Creates admin user
- Sets email and password
- Assigns admin role

**You'll see:**
- "User created successfully" ✅

**⚠️ Save these credentials!**

### 11.4 Login to Admin Panel

1. **Go to:** `https://admin.yourdomain.com/app`
2. **Login page appears**
3. **Enter credentials:**
   - **Email**: The email from Step 11.3
   - **Password**: The password from Step 11.3
4. **Click "Login"**

**You should see:**
- Medusa admin dashboard
- Products, Orders, Settings, etc.

**✅ Admin panel is working!**

### 11.5 Create Publishable API Key

**In admin panel:**

1. **Click "Settings"** (left sidebar, gear icon)
2. **Click "Publishable API Keys"** (in settings menu)
3. **Click "Create Publishable API Key"** button (top right)
4. **Fill form:**
   - **Title**: `Webshop` or `Storefront`
   - **Description**: Optional
5. **Click "Create"**
6. **Copy the key:**
   - You'll see: `pk_xxxxxxxxxxxxxxxxxxxxx`
   - **⚠️ Copy this immediately!**
   - You'll need it for Vercel deployment
   - Save it securely

**✅ Publishable key created!**

### 11.6 Verify API Endpoints

**Test API endpoints:**

1. **Store API:**
   - URL: `https://admin.yourdomain.com/store`
   - Should return API response or documentation

2. **Admin API:**
   - URL: `https://admin.yourdomain.com/admin`
   - Should require authentication

3. **Health:**
   - URL: `https://admin.yourdomain.com/health`
   - Should return 200 OK

**✅ All endpoints working!**

---

## 🎉 Deployment Complete!

**Your Medusa B2B backend is now live on Coolify!**

### What You Have:
- ✅ PostgreSQL database running
- ✅ Redis cache running
- ✅ Medusa backend deployed
- ✅ Admin panel accessible
- ✅ SSL certificate active
- ✅ Admin user created
- ✅ Publishable API key ready

### Next Steps:
1. **Deploy storefront to Vercel** (see `VERCEL_DEPLOYMENT.md`)
2. **Use publishable key** in Vercel environment variables
3. **Test B2B features** (companies, quotes, approvals)
4. **Set up backups** (database backups)
5. **Monitor logs** regularly

### Important URLs:
- **Coolify Dashboard**: `http://your-server-ip:8000`
- **Admin Panel**: `https://admin.yourdomain.com/app`
- **Health Check**: `https://admin.yourdomain.com/health`
- **Store API**: `https://admin.yourdomain.com/store`

### Cost:
- **VPS Server**: $5-10/month
- **Total**: ~$5-10/month (everything included!)

---

## 🔧 Troubleshooting Common Issues

### Issue: Can't connect to Git repository

**Symptoms:**
- Repository not showing in list
- "Authentication failed" error

**Solutions:**
1. Check Git provider token has `repo` scope
2. Regenerate token if expired
3. Verify repository is accessible with token
4. Try reconnecting provider in Settings

### Issue: Build fails

**Symptoms:**
- Build status shows "Failed"
- Error in build logs

**Solutions:**
1. Check Dockerfile path is correct: `backend/Dockerfile`
2. Verify build context: `backend`
3. Check for syntax errors in Dockerfile
4. Verify all dependencies in package.json
5. Check Node version (requires 20+)

### Issue: Database connection failed

**Symptoms:**
- Application won't start
- "Connection refused" in logs

**Solutions:**
1. Verify DATABASE_URL uses `medusa-postgres` (not IP)
2. Check password is correct
3. Verify PostgreSQL is running (check Resources)
4. Check network is `coolify` (same as databases)
5. Test connection string format

### Issue: Redis connection failed

**Symptoms:**
- "Redis connection error" in logs
- Cache not working

**Solutions:**
1. Verify REDIS_URL uses `medusa-redis` (not IP)
2. Check password is correct
3. Verify Redis is running
4. Check connection string format: `redis://default:pass@medusa-redis:6379`

### Issue: SSL certificate not generating

**Symptoms:**
- Domain shows "Pending" status
- SSL error in browser

**Solutions:**
1. Verify DNS is pointing to server IP (use ping)
2. Wait for DNS propagation (5-30 minutes)
3. Check domain doesn't have CAA records blocking Let's Encrypt
4. Manually trigger SSL generation
5. Check Let's Encrypt rate limits (if many attempts)

### Issue: Admin panel 404

**Symptoms:**
- Can't access `/app` endpoint
- 404 Not Found error

**Solutions:**
1. Check `ADMIN_URL` environment variable
2. Verify format: `https://admin.yourdomain.com/app`
3. Check `DISABLE_MEDUSA_ADMIN=false`
4. Verify application is running
5. Check logs for errors

### Issue: Migrations fail

**Symptoms:**
- Migration command fails
- Database errors

**Solutions:**
1. Verify DATABASE_URL is correct
2. Check database is running
3. Verify database user has permissions
4. Check database exists: `cubitstore`
5. Try connecting manually to test

---

## 📚 Additional Resources

- **Coolify Documentation**: https://coolify.io/docs
- **Coolify Discord**: https://discord.gg/coolify
- **Medusa Documentation**: https://docs.medusajs.com/v2
- **Medusa B2B Starter**: https://github.com/medusajs/b2b-starter-medusa

---

**Need help?** Check the troubleshooting section or Coolify Discord community!
