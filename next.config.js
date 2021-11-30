module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'links.papareact.com',
      'fakestoreapi.com',
      'links.papareact.com/f90',
      'pngimg.com',
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};
