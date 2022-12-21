import path from 'path'
import { readFileSync, readdirSync } from 'fs'
import { makeExecutableSchema } from '@graphql-tools/schema'

const gqlFiles = readdirSync(path.join(__dirname, './typedefs'))

let typeDefs = ''

console.log(__dirname)

gqlFiles.forEach((file) => {
    typeDefs += readFileSync(path.join(__dirname, './typedefs', file), {
        encoding: 'utf-8',
    })
})

console.log(typeDefs)

const schema = makeExecutableSchema({ typeDefs, resolvers })
