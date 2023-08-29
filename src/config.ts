import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export default {
    APP: {
        NAME: 'E-Commerce',
        PORT: process.env.APP_PORT || 3000
    },
    DATABASE: {
        HOST: process.env.DB_HOST,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        DATABASE: process.env.DB_DATABASE,
        PORT: process.env.DB_PORT,
        DRIVER: process.env.DB_DRIVER
    },
    JWT: {
        SECRET_KEY: process.env.JWT_SECRET_KEY,
        EXPIRES_IN: process.env.JWT_EXPIRES_IN
    },
    BCRYPT: {
        ROUNDS: process.env.BCRYPT_ROUND
    },
    MAILER: {
        PROVIDER: process.env.EMAIL_PROVIDER,
        PORT: process.env.EMAIL_PROVIDER_PORT,
        USERNAME: process.env.EMAIL_USERNAME,
        PASSWORD: process.env.EMAIL_PASSWORD,
        FROM: process.env.EMAIL_FROM
    }
}