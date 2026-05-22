const { API_URL } = process.env;
const regex = /^https?:\/\/[a-zA-Z0-9.-]+(:\d+)?$/;
if (!API_URL || !regex.test(API_URL)) {
  console.error("Invalid API_URL");
  process.exit(1);
}