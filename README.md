# SecureApp: Production-Ready React 19 Application

SecureApp is a high-performance, security-hardened React 19 application optimized for Cloudflare Pages.

## 1. Features
- **Feature-First Architecture:** Domain-isolated modules for high maintainability.
- **Security-Hardened:** Zero-trust API boundary validation using Zod and strict CSP headers.
- **Concurrency Control:** Singleton `p-queue` orchestration for API stability.
- **Edge-Ready:** Native Cloudflare Pages integration with edge-side security headers.

## 2. Deployment
This project is configured for Cloudflare Pages.
- **Build Command:** `npm run build`
- **Output Directory:** `dist/`
- **Security Headers:** Defined in `public/_headers`.
- **SPA Routing:** Managed by `public/_redirects`.

### Setup
1. Install dependencies: `npm install`
2. Set environment variables in `.env` (refer to `.env.example`).
3. Deploy: `npm run deploy` (requires `wrangler` CLI).

## 3. Security Policy
- **Content-Security-Policy (CSP):** Strict enforcement of `object-src 'none'`, `frame-ancestors 'none'`, and restricted `connect-src`.
- **HSTS:** 2-year duration (`max-age=63072000`) with `includeSubDomains` and `preload`.
- **CSRF:** Token-based validation enforced on all state-changing requests via `apiClient` interceptors.

## 4. Architecture
- **State Management:** Zustand with slice pattern and `immer` for immutability.
- **API Layer:** `axios` + `p-queue` for concurrency throttling and type-safe schema validation.
- **Infrastructure:** Containerized environment (`Dockerfile` + `docker-compose.yml`) for local development, and Edge-native security rules for production.

## 5. Deployment Verification
- **Header Injection:** All security headers are managed by `public/_headers` at the edge.
- **Routing:** Deep links are handled by `public/_redirects` ensuring SPA compatibility.
- **Redundancy:** Ensure no `_headers` file exists at the root to avoid deployment conflicts.