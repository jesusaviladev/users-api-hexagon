import './config/env'
import { Server } from './Server'

const bootstrap = async () => {
    try {
        const server = new Server(process.env.PORT ?? '5000')

        await server.listen()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default bootstrap