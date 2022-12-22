import path from 'path'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { loadFilesSync } from '@graphql-tools/load-files'

const gqlFiles = loadFilesSync(path.join(__dirname, './typedefs'))
const resolverFiles = loadFilesSync(path.join(__dirname, './resolvers'))

const typeDefs = mergeTypeDefs(gqlFiles)
const resolvers = mergeResolvers(resolverFiles)

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})
