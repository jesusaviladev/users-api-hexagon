import express from 'express'
import expressApp from './config/expressApp'
import * as http from 'http'

export class Server {
    private readonly _port: string
    private readonly _app: express.Express
    private readonly _httpServer: http.Server

    constructor(port: string) {
        this._port = port
        this._app = expressApp

        this._httpServer = http.createServer(this._app)
    }

    async listen(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._httpServer.listen(this._port, () => {
                console.log(`Server started at port: ${this._port}`)
                console.log(`Use Ctrl + D to stop`)

                resolve()
            })
        })
    }

    async stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this._httpServer) {
                this._httpServer.close((error) => {
                    if (!error) return resolve()

                    return reject('Failed execution')
                })
            }
        })
    }
}
