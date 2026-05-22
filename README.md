# SecureApp

A high-security, production-ready React application optimized for deployment on Cloudflare Pages.

## Features
- **Edge Security:** Enforces strict CSP, HSTS, and X-Frame-Options at the Cloudflare edge via `public/_headers`.
- **SPA Routing:** Seamless client-side navigation handling via `public/_redirects`.
- **Performance:** Optimized for global distribution via Cloudflare's CDN.
- **Security-First:** Includes automated audit pipelines (GitHub Actions), strict Zod-based data validation, and non-root container execution.

## Setup
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Build for production: `npm run build`

## Deployment
This project is configured for **Cloudflare Pages**.
- **Command:** `npm run deploy`
- **Output Directory:** `dist/`
- **Configuration:** Managed via `wrangler.toml`.

## Architecture
- **Framework:** React 19 + Vite
- **State Management:** Zustand (slice pattern, `immer` for immutability)
- **Validation:** Zod (strict runtime schema enforcement)
- **Infrastructure:** Cloudflare Pages (Edge) + Docker (Local/CI/CD)

## Environment Variables
- `VITE_API_URL`: The base URL for the backend API.
- `API_ORIGIN`: Production API endpoint allowed by CSP.

## Security Policies
- **CSP:** Strict directives; `frame-ancestors 'none'` prevents clickjacking.
- **Transport:** HSTS enforced with `includeSubDomains` and `preload`.
- **Integrity:** Subresource Integrity (SRI) hashes generated during build.