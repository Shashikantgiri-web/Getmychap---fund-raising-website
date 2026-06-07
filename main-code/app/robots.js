// app/robots.js

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap:
      'https://getmychap-fund-raising-website.vercel.app/sitemap.xml',
  };
}