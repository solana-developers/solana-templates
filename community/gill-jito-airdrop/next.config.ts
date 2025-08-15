import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    // Server-side environment variables that should be available at runtime
    USER_PRIVATE_KEY: process.env.USER_PRIVATE_KEY,
  },

  // Enable server-side environment variables in client components when needed
  serverExternalPackages: [],
}

export default nextConfig
