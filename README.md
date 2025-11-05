# Portfolio Backend (minimal)

This is a minimal Node.js + Express backend for serving the static portfolio (`pf.html`) and accepting contact submissions.

Files added:

- `package.json` - project metadata and scripts
- `server.js` - express server (serves static files and endpoints)
- `data/contacts.json` - simple local store for received contact messages
- `.gitignore` - ignores node_modules and local data

Quick start (Windows PowerShell):

```powershell
# 1) install dependencies
npm install

# 2) run in development (requires nodemon) or production
npm run dev
# or
npm start
```

Open the site at http://localhost:3000/pf.html or http://localhost:3000/

API endpoints:

- GET /api/health -> { status: 'ok' }
- POST /api/contact -> accepts JSON or urlencoded body with `name`, `email`, `message` and returns stored entry

Note: Contact messages are stored locally in `data/contacts.json`. For a production-ready site, replace this with a proper database and add validation/rate-limiting and security measures.
