

import { DataSource } from "typeorm"
import { Newsletter } from "../entities/subscriber.model.js"
import { VideoCapsule } from "../entities/video_capsules.model.js"
import dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,  
    logging: process.env.DB_LOGGING === 'true', // set DB_LOGGING=true in .env to see every SQL query
    entities: [Newsletter, VideoCapsule],
    charset: "utf8mb4",
    connectTimeout: 30000,
    extra: {
        connectionLimit: 10
    }
})
