import "dotenv/config";

export const dev = {
  app: {
    port: Number(process.env.PORT) || 3003,
    defaultImagePath: process.env.DEFAULT_IMAGE_PATH || 'public/images/users/default.png',
    jwtUserActivationKey: process.env.JWT_USER_ACTIVATION_KEY || 'shhhhh',
  },
  db: {
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017/DB-Ecommerce-backendProject',
  },
}