import { connectToDatabase } from './config/database'
import './config/env'
import { Server } from './Server'

const bootstrap = async () => {
    try {
        const server = new Server(process.env.PORT ?? '3001')

        await connectToDatabase(process.env.MONGO_DB_URI as string)
        await server.listen()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default bootstrap
