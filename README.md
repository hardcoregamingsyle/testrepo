# SecureApp: Production-Ready React 19 Application

SecureApp is a high-performance, security-hardened React 19 application built with Vite, TypeScript, and a "Feature-First" architectural pattern. It is optimized for high-concurrency environments and adheres to strict security standards.

## 1. Project Architecture
- **Feature-First Structure:** Business logic, services, and UI components are co-located in `src/features/` to maximize cohesion and maintainability.
- **Atomic UI:** Shared design system components in `src/components/ui/` use `tailwind-merge` for conflict-free styling.
- **API Layer:** Centralized orchestration using `axios` and a singleton `p-queue` (defined in `src/lib/queue.ts`) to prevent heap exhaustion.
- **Global State:** Zustand-based store using the Slice Pattern, `immer` for immutable updates, and defensive persistence.

## 2. Security Posture
- **Infrastructure:** Containerized with non-root (10001) execution, read-only filesystems, and `tmpfs` mounts for `/tmp` and `/var/cache/nginx`.
- **Headers:** Strict CSP (nonce-based), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Permissions-Policy`.
- **Validation:** Zod-based runtime schema enforcement at all API boundaries.
- **XSS Prevention:** No `dangerouslySetInnerHTML`. Use `SafeText` for sanitized content rendering.

## 3. Getting Started
1. **Install Dependencies:** `npm install`
2. **Development:** `npm run dev` (Runs with HMR).
3. **Testing:** `npm run test` (Vitest suite with 80% coverage enforcement).
4. **Production:** `docker-compose --profile prod up --build`

## 4. API & Concurrency Logic
- All API requests are routed through `src/apiClient.ts`, which uses `p-queue` to limit concurrent outgoing requests to 10.
- All endpoints must be defined with Zod schemas to ensure type safety and prevent prototype pollution.

## 5. Deployment
The project uses a multi-stage Docker build. The final image is a hardened Nginx container running as a non-privileged user. Environment variables are injected at runtime via `docker-entrypoint.sh` using `envsubst` to populate the CSP nonce.

## 6. Environment Variables
- `VITE_API_URL`: The base URL for the backend API.
- `API_ORIGIN`: Used in production for CSP policy definition.