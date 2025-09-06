
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
  },
  allowedDevOrigins: [
      'https://6000-firebase-studio-1755003929444.cluster-44kx2eiocbhe2tyk3zoyo3ryuo.cloudworkstations.dev',
      'https://9000-firebase-studio-1755003929444.cluster-44kx2eiocbhe2tyk3zoyo3ryuo.cloudworkstations.dev',
  ]
};

export default nextConfig;
