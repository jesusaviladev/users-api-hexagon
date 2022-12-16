import { Server } from './infraestructure/driving-adapters/api-rest/server'

const bootstrap = async () => {
    const server = new Server('3000')

    await server.listen()
}

bootstrap()
