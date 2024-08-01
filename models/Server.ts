import express, { Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { router } from '../routes/routes'

dotenv.config()

class Server {
    private app: Express
    private port: number

    constructor() {
        this.app = express()
        this.port = parseInt(process.env.PORT as string) || 3000
        this.middlewares()
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(
                `Server running at ${process.env.BASE_URL}:${this.port}`
            )
        })
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(router)
    }
}

export default Server
