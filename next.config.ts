import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: [
      "dzjmykunmrwofsjewotx.supabase.co", // Seu domínio do Supabase
    ],
  },
};

export default nextConfig;
