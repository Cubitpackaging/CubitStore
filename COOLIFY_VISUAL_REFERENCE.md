# Coolify Visual Reference - Screen by Screen

## 🖥️ Coolify Interface Overview

### Main Navigation (Left Sidebar)

```
┌─────────────────────────┐
│  🏠 Dashboard           │  ← Home/Overview
│  📦 Resources           │  ← Apps, Databases, Services
│  ⚙️  Settings            │  ← Configuration
│  👤 Profile              │  ← User settings
│  📊 Monitoring           │  ← (If enabled)
│  🔔 Notifications        │  ← (If enabled)
└─────────────────────────┘
```

### Resources Page Layout

```
┌─────────────────────────────────────────────────────┐
│  Resources                              [+ New]     │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐  ┌──────────────┐                │
│  │ medusa-      │  │ medusa-      │                │
│  │ postgres     │  │ redis       │                │
│  │              │  │             │                │
│  │ 🟢 Running   │  │ 🟢 Running  │                │
│  └──────────────┘  └──────────────┘                │
│                                                      │
│  ┌──────────────┐                                   │
│  │ medusa-      │                                   │
│  │ backend      │                                   │
│  │              │                                   │
│  │ 🟢 Running   │                                   │
│  └──────────────┘                                   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## 📍 Step-by-Step Screen Locations

### Step 3: Initial Login Screen

```
┌─────────────────────────────────────┐
│         Coolify Logo                │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Email/Username               │   │
│  │ [admin@coolify.io        ]   │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Password                     │   │
│  │ [••••••••••••••••        ]   │   │
│  └─────────────────────────────┘   │
│                                     │
│         [    Login    ]             │
│                                     │
└─────────────────────────────────────┘
```

**Fields to fill:**
- Email: `admin@coolify.io` (or from install output)
- Password: (from installation terminal output)
- Click: **"Login"** button

---

### Step 4: Git Provider Setup

**Navigation Path:**
```
Settings (⚙️) → Source Providers → [Add Provider]
```

**Screen Layout:**
```
┌─────────────────────────────────────┐
│  Source Providers                  │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │  GitHub                      │   │  ← Click this
│  │  GitLab                      │   │
│  │  Bitbucket                   │   │
│  │  Custom Git Server           │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**After clicking GitHub:**
```
┌─────────────────────────────────────┐
│  Add GitHub Provider                │
├─────────────────────────────────────┤
│                                     │
│  Provider Name:                     │
│  [GitHub                        ]   │
│                                     │
│  Personal Access Token:             │
│  [ghp_xxxxxxxxxxxxxxxxxxxx      ]   │  ← Paste token
│                                     │
│  [Connect with OAuth]  [Save]        │
│                                     │
└─────────────────────────────────────┘
```

**Options:**
- **Option 1**: Enter token manually → Click **"Save"**
- **Option 2**: Click **"Connect with OAuth"** → Authorize → Auto-connected

---

### Step 5: Create PostgreSQL Database

**Navigation Path:**
```
Resources (📦) → [+ New Resource] → Database → PostgreSQL
```

**Screen 1: Resource Type Selection**
```
┌─────────────────────────────────────┐
│  New Resource                       │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │          │  │          │        │
│  │ App      │  │ Database │  ← Click
│  │          │  │          │        │
│  └──────────┘  └──────────┘        │
│                                     │
│  ┌──────────┐                      │
│  │ Service  │                      │
│  └──────────┘                      │
│                                     │
└─────────────────────────────────────┘
```

**Screen 2: Database Type Selection**
```
┌─────────────────────────────────────┐
│  Select Database Type               │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │          │  │          │        │
│  │PostgreSQL│  │  MySQL   │        │
│  │          │  │          │        │
│  └──────────┘  └──────────┘        │
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │  Redis   │  │ MongoDB  │        │
│  └──────────┘  └──────────┘        │
│                                     │
└─────────────────────────────────────┘
```

**Screen 3: PostgreSQL Configuration Form**
```
┌─────────────────────────────────────┐
│  Configure PostgreSQL               │
├─────────────────────────────────────┤
│                                     │
│  Name *                             │
│  [medusa-postgres               ]   │  ← Type this
│                                     │
│  Description                        │
│  [Medusa B2B PostgreSQL Database]   │  ← Optional
│                                     │
│  PostgreSQL Version *               │
│  [15 ▼]                            │  ← Select 15 or 16
│                                     │
│  Database Name *                    │
│  [cubitstore                    ]   │  ← Type this
│                                     │
│  Database User *                     │
│  [medusa                        ]   │  ← Type this
│                                     │
│  Database Password *                 │
│  [••••••••••••••••] [Generate]     │  ← Generate or type
│                                     │
│  ☑ Persistent Volume                │  ← Keep checked
│                                     │
│  Network                             │
│  [coolify ▼]                       │  ← Leave default
│                                     │
│  [Cancel]  [Deploy]                 │  ← Click Deploy
│                                     │
└─────────────────────────────────────┘
```

**Key Fields:**
- **Name**: `medusa-postgres` (internal service name)
- **Version**: `15` (dropdown)
- **Database Name**: `cubitstore`
- **User**: `medusa`
- **Password**: Click "Generate" or type your own
- **Persistent Volume**: ✅ Checked
- Click: **"Deploy"**

---

### Step 6: Create Redis

**Same navigation as PostgreSQL:**
```
Resources → [+ New Resource] → Database → Redis
```

**Configuration Form:**
```
┌─────────────────────────────────────┐
│  Configure Redis                    │
├─────────────────────────────────────┤
│                                     │
│  Name *                             │
│  [medusa-redis                  ]   │  ← Type this
│                                     │
│  Description                        │
│  [Medusa B2B Redis Cache        ]   │  ← Optional
│                                     │
│  Redis Version *                    │
│  [7 ▼]                             │  ← Select 7
│                                     │
│  Redis Password *                    │
│  [••••••••••••••••] [Generate]     │  ← Generate or type
│                                     │
│  ☑ Persistent Volume                │  ← Keep checked
│                                     │
│  Memory Limit (optional)            │
│  [256 MB]                          │  ← Optional
│                                     │
│  Network                             │
│  [coolify ▼]                       │  ← Leave default
│                                     │
│  [Cancel]  [Deploy]                 │  ← Click Deploy
│                                     │
└─────────────────────────────────────┘
```

**Key Fields:**
- **Name**: `medusa-redis`
- **Version**: `7` (dropdown)
- **Password**: Click "Generate"
- **Persistent Volume**: ✅ Checked
- Click: **"Deploy"**

---

### Step 7: Deploy Medusa Backend

**Navigation:**
```
Resources → [+ New Resource] → Application → Git Repository
```

**Screen 1: Source Selection**
```
┌─────────────────────────────────────┐
│  Select Source                      │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │          │  │          │        │
│  │   Git    │  │  Docker  │        │
│  │ Repo     │  │  Image   │  ← Click Git
│  │          │  │          │        │
│  └──────────┘  └──────────┘        │
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │ Docker   │  │Dockerfile │        │
│  │ Compose  │  │  (local)  │        │
│  └──────────┘  └──────────┘        │
│                                     │
└─────────────────────────────────────┘
```

**Screen 2: Git Repository Configuration**
```
┌─────────────────────────────────────┐
│  Connect Git Repository             │
├─────────────────────────────────────┤
│                                     │
│  Source Provider *                  │
│  [GitHub ▼]                        │  ← Select your provider
│                                     │
│  Repository *                       │
│  [your-username/medusa-b2b-repo ▼] │  ← Select your repo
│                                     │
│  Branch *                           │
│  [main ▼]                          │  ← Select branch
│                                     │
│  Build Pack *                       │
│  [Dockerfile ▼]                    │  ← Select Dockerfile
│                                     │
│  Root Directory                     │
│  [backend]                          │  ← Type: backend
│                                     │
│  [Cancel]  [Next →]                 │  ← Click Next
│                                     │
└─────────────────────────────────────┘
```

**Screen 3: Application Details**
```
┌─────────────────────────────────────┐
│  Application Configuration           │
├─────────────────────────────────────┤
│                                     │
│  Name *                             │
│  [medusa-backend                ]   │  ← Type this
│                                     │
│  Description                        │
│  [Medusa B2B Commerce Backend   ]   │  ← Optional
│                                     │
│  Dockerfile Path                    │
│  [backend/Dockerfile            ]   │  ← Auto-filled
│                                     │
│  Build Context                      │
│  [backend]                          │  ← Auto-filled
│                                     │
│  Port *                             │
│  [9000]                            │  ← Type: 9000
│                                     │
│  Network                            │
│  [coolify ▼]                       │  ← Leave default
│                                     │
│  [← Back]  [Next →]                 │  ← Click Next
│                                     │
└─────────────────────────────────────┘
```

**Screen 4: Build Settings (if shown)**
```
┌─────────────────────────────────────┐
│  Build Configuration                │
├─────────────────────────────────────┤
│                                     │
│  Build Command (optional)           │
│  []                                │  ← Leave empty
│                                     │
│  Docker Build Arguments (optional)  │
│  []                                │  ← Leave empty
│                                     │
│  Dockerfile Location                │
│  [backend/Dockerfile            ]   │  ← Verify correct
│                                     │
│  [← Back]  [Next →]                 │  ← Click Next
│                                     │
└─────────────────────────────────────┘
```

**Screen 5: Deployment Settings**
```
┌─────────────────────────────────────┐
│  Deployment Configuration            │
├─────────────────────────────────────┤
│                                     │
│  ☑ Auto Deploy                      │  ← Check this
│                                     │
│  ☑ Deploy on Push                   │  ← Check this
│                                     │
│  Health Check                        │
│  Path: [/health]                    │  ← Type: /health
│  Port: [9000]                       │  ← Type: 9000
│  Interval: [30] seconds             │  ← Leave default
│                                     │
│  Restart Policy                      │
│  [unless-stopped ▼]                │  ← Select this
│                                     │
│  [← Back]  [Deploy]                 │  ← Click Deploy
│                                     │
└─────────────────────────────────────┘
```

---

### Step 8: Environment Variables

**Navigation:**
```
Resources → medusa-backend → Environment Variables (tab)
```

**Screen Layout:**
```
┌─────────────────────────────────────┐
│  Environment Variables              │
│                          [+ Add]    │
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐  │
│  │ Key          Value            │  │
│  ├───────────────────────────────┤  │
│  │ NODE_ENV    production       │  │
│  │ STORE_CORS  https://...      │  │
│  │ DATABASE_URL postgresql://... │  │
│  │ ...                          │  │
│  └───────────────────────────────┘  │
│                                     │
│  [Add Variable]                    │  ← Click to add
│                                     │
└─────────────────────────────────────┘
```

**Add Variable Dialog:**
```
┌─────────────────────────────────────┐
│  Add Environment Variable          │
├─────────────────────────────────────┤
│                                     │
│  Key *                              │
│  [DATABASE_URL                  ]   │  ← Type key name
│                                     │
│  Value *                            │
│  [postgresql://medusa:pass@...  ]   │  ← Type value
│                                     │
│  ☐ Secret (hide value)              │  ← Optional
│                                     │
│  [Cancel]  [Save]                   │  ← Click Save
│                                     │
└─────────────────────────────────────┘
```

**Important Variables to Add:**
1. `NODE_ENV` = `production`
2. `STORE_CORS` = `https://your-storefront.com`
3. `ADMIN_CORS` = `https://admin.yourdomain.com`
4. `AUTH_CORS` = `https://admin.yourdomain.com,https://your-storefront.com`
5. `DATABASE_URL` = `postgresql://medusa:PASSWORD@medusa-postgres:5432/cubitstore`
6. `DB_NAME` = `cubitstore`
7. `REDIS_URL` = `redis://default:PASSWORD@medusa-redis:6379`
8. `JWT_SECRET` = (32+ character string)
9. `COOKIE_SECRET` = (32+ character string)
10. `ADMIN_URL` = `https://admin.yourdomain.com/app`
11. `MEDUSA_BACKEND_URL` = `https://admin.yourdomain.com`
12. `MEDUSA_WORKER_MODE` = `server`
13. `DISABLE_MEDUSA_ADMIN` = `false`
14. `SMTP_HOST` = `smtp.provider.com`
15. `SMTP_PORT` = `465`
16. `SMTP_SECURE` = `true`
17. `SMTP_USER` = `email@domain.com`
18. `SMTP_PASS` = `password`
19. `SMTP_FROM` = `email@domain.com`

---

### Step 9: Domain Configuration

**Navigation:**
```
Resources → medusa-backend → Domains (tab)
```

**Screen Layout:**
```
┌─────────────────────────────────────┐
│  Domains                [+ Add]     │
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐  │
│  │ Domain          Status        │  │
│  ├───────────────────────────────┤  │
│  │ admin.yourdomain.com  Active │  │
│  └───────────────────────────────┘  │
│                                     │
│  [Add Domain]                       │  ← Click to add
│                                     │
└─────────────────────────────────────┘
```

**Add Domain Dialog:**
```
┌─────────────────────────────────────┐
│  Add Domain                         │
├─────────────────────────────────────┤
│                                     │
│  Domain *                           │
│  [admin.yourdomain.com         ]   │  ← Type domain
│                                     │
│  ☑ Generate SSL Certificate         │  ← Check this
│                                     │
│  Port                               │
│  [9000]                            │  ← Auto-filled
│                                     │
│  Path                               │
│  [/]                                │  ← Leave default
│                                     │
│  [Cancel]  [Save]                   │  ← Click Save
│                                     │
└─────────────────────────────────────┘
```

**Domain Status Indicators:**
- 🟡 **Pending**: Waiting for DNS
- 🔵 **Generating...**: Creating SSL certificate
- 🟢 **Active**: Domain ready with SSL

---

### Step 10: Deployment Status

**Navigation:**
```
Resources → medusa-backend → (Overview or Deployments tab)
```

**Deployment Status Screen:**
```
┌─────────────────────────────────────┐
│  medusa-backend                     │
├─────────────────────────────────────┤
│                                     │
│  Status: 🟢 Running                  │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Latest Deployment              │ │
│  │                                 │ │
│  │ 🟢 Running                      │ │
│  │ Deployed: 2 minutes ago        │ │
│  │                                 │ │
│  │ [View Logs]  [Redeploy]        │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Status Indicators:**
- 🔴 **Failed**: Build/deployment failed
- 🟡 **Building...**: Currently building
- 🟡 **Deploying...**: Currently deploying
- 🟢 **Running**: Successfully deployed

---

### Step 11: Terminal Access

**Navigation:**
```
Resources → medusa-backend → Terminal (tab)
```

**Terminal Screen:**
```
┌─────────────────────────────────────┐
│  Terminal                           │
├─────────────────────────────────────┤
│                                     │
│  root@medusa-backend:/app#         │  ← Command prompt
│                                     │
│  (Type commands here)              │
│                                     │
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │  (Command output appears here)│  │
│  │                               │  │
│  └───────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

**Commands to run:**
1. `yarn medusa migrations run`
2. `yarn medusa user -e admin@domain.com -p password -i admin`

---

## 🎯 Quick Navigation Reference

### Common Actions & Where to Find Them

| Action | Navigation Path |
|--------|----------------|
| Add Database | Resources → [+ New Resource] → Database |
| Add Application | Resources → [+ New Resource] → Application |
| View Logs | Resources → [App Name] → Logs (tab) |
| Environment Variables | Resources → [App Name] → Environment Variables (tab) |
| Add Domain | Resources → [App Name] → Domains (tab) |
| Terminal Access | Resources → [App Name] → Terminal (tab) |
| Git Settings | Settings → Source Providers |
| Deploy App | Resources → [App Name] → [Deploy] button |

---

## 🔍 Button & Icon Reference

### Common Buttons
- **`[+ New Resource]`**: Top right, creates new resource
- **`[Deploy]`**: Starts deployment
- **`[Redeploy]`**: Redeploys application
- **`[Save]`**: Saves configuration
- **`[Cancel]`**: Cancels current action
- **`[Next →]`**: Goes to next step
- **`[← Back]`**: Goes to previous step
- **`[Add Variable]`**: Adds environment variable
- **`[Add Domain]`**: Adds domain

### Status Icons
- 🟢 **Green circle**: Running/Active
- 🟡 **Yellow circle**: Pending/Building
- 🔴 **Red circle**: Failed/Stopped
- ⚪ **Gray circle**: Stopped

### Navigation Icons
- 🏠 **House**: Dashboard
- 📦 **Box**: Resources
- ⚙️ **Gear**: Settings
- 👤 **Person**: Profile

---

## 💡 Pro Tips

1. **Always check status indicators** (🟢🟡🔴)
2. **Use internal service names** (`medusa-postgres`, not IP)
3. **Save passwords immediately** when generated
4. **Watch logs** during deployment
5. **Verify DNS** before SSL generation
6. **Test health endpoint** after deployment

---

This visual reference should help you navigate Coolify confidently! 🚀
