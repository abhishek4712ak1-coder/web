# Weblytics Studio

A full-stack MERN application for a digital transformation company focused on websites, automation, analytics, and custom business software.

## Overview

Weblytics Studio combines a public marketing website, a secure admin dashboard, a MongoDB-powered content layer, and a lead management workflow. The public website is driven by real content stored in MongoDB, while the admin panel controls services, projects, solutions, FAQs, leads, and website settings.

## Features

- Public website with pages for Home, About, Services, Solutions, Projects, Contact, and FAQ
- Secure admin panel at /admin with protected routes and JWT-based authentication
- REST API built with Express and MongoDB
- Lead capture and enquiry management
- Sender acknowledgement and full enquiry notifications by email
- Dynamic services, projects, solutions, FAQs, testimonials, and blog content
- Dashboard analytics using real data from MongoDB
- Responsive dark-first SaaS design
- Local upload-friendly architecture for future storage integration
- Seed script for demo content and admin credentials

## Tech Stack

- MongoDB + Mongoose
- Express.js
- React + Vite
- Node.js
- JWT + bcryptjs
- Axios
- React Router
- Lucide icons

## Project Structure

```text
weblytics-studio/
├── client/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── app.js
│   ├── server.js
│   └── seed.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── package-lock.json
```

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a local MongoDB database or use MongoDB Atlas.
4. Copy `.env.example` to `.env` and update the values.

## Environment Variables

Example values are defined in `.env.example`:

```bash
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/weblytics-studio
JWT_SECRET=replace_with_secure_random_string
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=team.weblytics@outlook.com
ADMIN_PASSWORD=replace_with_a_secure_admin_password
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=replace_with_brevo_smtp_login
SMTP_PASS=replace_with_brevo_smtp_key
NODE_ENV=development
UPLOAD_DIR=./server/uploads
```

Note: Use a strong JWT secret and a secure admin password in production. The demo credentials are intended for local development only.
Configure `SMTP_USER` and `SMTP_PASS` with the SMTP credentials from Brevo. The sender address is `team.weblytics@outlook.com`, which must be verified as a sender in Brevo. Each contact submission is stored in the admin Messages inbox, acknowledged to its sender, and emailed with all submitted details to that admin mailbox. SMTP acceptance confirms handoff to Brevo; check the mailbox's junk folder and Brevo's transactional email logs if a message is not visible.

## MongoDB setup

### Local MongoDB

Install MongoDB locally and start the service:

```bash
mongod
```

Then confirm the database is reachable via the `MONGODB_URI` in `.env`.

### MongoDB Atlas

Set `MONGODB_URI` to your Atlas connection string and ensure your IP address is whitelisted.

## Seed data and admin login

To seed demo services, projects, solutions, FAQs, and the development admin user:

```bash
npm run seed
```

Development demo login:

- Email: admin@weblyticsstudio.dev
- Password: Weblytics@123

> DEMO CREDENTIALS — DEVELOPMENT ONLY

## Development commands

Run the frontend and backend together:

```bash
npm run dev
```

Run only the backend:

```bash
npm run dev:server
```

Run only the frontend:

```bash
npm run dev:client
```

The frontend runs at http://localhost:5173 and the backend at http://localhost:5000.

## Production build

```bash
npm run build
```

## CI/CD

The GitHub Actions workflow at `.github/workflows/ci-cd.yml` runs on pull requests to `main`, pushes to `main`, and manual dispatches. It installs the locked dependencies, checks backend JavaScript syntax, builds the frontend, and stores the build output as a seven-day artifact.

Pushes to `main` also trigger production deploy hooks when configured. Add these repository Actions secrets to enable deployments:

- `FRONTEND_DEPLOY_HOOK_URL`: deploy hook URL for the frontend host.
- `BACKEND_DEPLOY_HOOK_URL`: deploy hook URL for the backend host.

Each deploy hook is optional; unset hooks are skipped. Configure production environment variables, including database credentials and `CLIENT_URL`, directly in the hosting providers rather than in GitHub workflow files.

## Deployment notes

- Frontend: deploy the client build to Vercel, Netlify, or a static host.
- Backend: deploy the server to Render, Railway, or a VPS.
- Database: use MongoDB Atlas or another managed MongoDB service.
- Set production environment variables securely through your hosting platform.

## Admin setup

1. Start the backend and MongoDB.
2. Visit http://localhost:5173/admin/login.
3. Sign in with the demo admin credentials or a production admin account created through the application or seed flow.
4. Use the admin dashboard to manage leads, services, projects, and site settings.

## API overview

Key endpoints include:

- /api/auth/login
- /api/auth/me
- /api/auth/logout
- /api/services
- /api/projects
- /api/solutions
- /api/faqs
- /api/testimonials
- /api/blog
- /api/leads
- /api/contact
- /api/settings
- /api/analytics/summary

All protected admin routes require JWT-based authentication and an HTTP-only cookie session.

## Notes

This is a production-oriented starting point for a digital agency or technology company CMS. It can be extended with image uploads, richer analytics, blog editorial flows, and external object storage providers such as Cloudinary.
