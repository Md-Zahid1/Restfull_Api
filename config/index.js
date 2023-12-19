import dotenv from 'dotenv'

dotenv.config()

export const {
    APP_PORT,
    DB_URL,
    JWT_SECRET,
    APP_URL
} = process.env