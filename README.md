# SecureApp: Production-Ready React 19 Application

SecureApp is a high-performance, security-hardened React 19 application built with Vite, TypeScript, and a "Feature-First" architectural pattern. It is optimized for Cloudflare Pages deployment.

## 1. Project Architecture
- **Feature-First Structure:** Co-located business logic in `src/features/`.
- **API Layer:** Centralized orchestration using `axios` and `p-queue` for concurrency control.
- **Global State:** Zustand-based store using the Slice Pattern and `immer`.

## 2. Security Posture
- **Edge Security:** Enforced via `public/_headers` (CSP, HSTS, X-Frame-Options, Permissions-Policy).
- **Validation:** Zod-based runtime schema enforcement at all API boundaries.
- **XSS Prevention:** Strict CSP, no `dangerouslySetInnerHTML`, and sanitization via `dompurify`.
- **Infrastructure:** Hardened for Cloudflare Pages with SPA routing via `public/_redirects`.

## 3. Deployment (Cloudflare Pages)
This project is configured for seamless deployment via [Wrangler](https://developers.cloudflare.com/workers/wrangler/).

1. **Install Wrangler:** `npm install -g wrangler`
2. **Login:** `wrangler login`
3. **Deploy:** `npm run deploy` (triggers `wrangler pages deploy dist`)

## 4. Environment Variables
Ensure the following are set in the Cloudflare Pages dashboard:
- `VITE_API_URL`: The production API endpoint.

## 5. Development
- **Start Dev:** `npm run dev`
- **Run Tests:** `npm test`
- **Lint:** `npm run lint`