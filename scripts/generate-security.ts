import fs from 'fs';
const expiry = new Date(Date.now() + 7776000000).toISOString(); // 90 days
const content = `Contact: mailto:security@example.com\nPolicy: https://secure-app.com/policy.html\nExpires: ${expiry}\n`;
fs.writeFileSync('public/.well-known/security.txt', content);