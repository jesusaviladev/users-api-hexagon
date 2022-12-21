import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

export class GraphQLServer {
    private readonly _port: string
    private readonly _apolloServer: ApolloServer

    constructor(port: string) {
        this._apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
        })
        this._port = port
    }

    async start(): Promise<void> {
        const { url } = await startStandaloneServer(this._apolloServer, {
            listen: { port: Number(this._port) },
        })

        console.log(`🚀  GraphQL Server ready at: ${url}`)
    }

    async stop(): Promise<void> {
        await this._apolloServer.stop()
    }
}
