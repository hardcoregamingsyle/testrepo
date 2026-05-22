export const authService = {
  logout: () => {
    localStorage.clear();
    sessionStorage.clear();
    // Clear any persistent state or cookie-based tokens if applicable
    document.cookie.split(";").forEach(c => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  }
};