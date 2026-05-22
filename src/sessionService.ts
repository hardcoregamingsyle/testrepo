import { useAuthStore } from './authStore';

class SessionService {
  private isChecking = false;
  private abortController: AbortController | null = null;

  async checkSession(API_URL: string) {
    if (this.isChecking) return;
    this.isChecking = true;
    if (this.abortController) this.abortController.abort();
    this.abortController = new AbortController();

    try {
      const start = Date.now();
      const response = await fetch(`${API_URL}/auth/session`, { signal: this.abortController.signal });
      if (!response.ok) throw new Error();
      const serverDate = new Date(response.headers.get('Date') || Date.now()).getTime();
      const data = await response.json();
      useAuthStore.getState().setSession(data, serverDate - start);
    } catch (e) {
      if (!(e instanceof DOMException && e.name === 'AbortError')) useAuthStore.getState().reset();
    } finally {
      this.isChecking = false;
    }
  }
}
export const sessionService = new SessionService();