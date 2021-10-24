import { createConnection } from "typeorm"
import { Student } from '../entities/Student'

export const newConnection = async () => {
    return createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [Student],
        synchronize: true,
        extra: {
            ssl: {
                rejectUnauthorized: false,
            }
        }
    })
}