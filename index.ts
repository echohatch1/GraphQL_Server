import * as path from 'path'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { makeSchema, objectType, stringArg, intArg, inputObjectType, arg } from 'nexus'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const Product = objectType({
  name: 'Product',
  definition(t) {
    t.string('id')
    t.string('name')
    t.int('price')
    t.string('desc')
    t.string('weight')
    t.string('manuf')
  },
})

const ProductWhereInput = inputObjectType({
  name: 'ProductWhereInput',
  definition(t) {
    t.string('id')
    t.string('name')
  },
})

const ProductInput = inputObjectType({
  name: 'ProductInput',
  definition(t) {
    t.string('name')
    t.int('price')
    t.string('desc')
    t.string('weight')
    t.string('manuf')
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('products', {
      type: 'Product',
      args: {
        where: arg({ type: 'ProductWhereInput' }),
      },
      resolve: (_, { where }) => {
        if (where) {
          return prisma.product.findMany({
            where,
          })
        } else {
          return prisma.product.findMany()
        }
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('createProduct', {
      type: 'Product',
      args: {
        data: arg({ type: 'ProductInput' }),
      },
      resolve: (_, { data }) => prisma.product.create({ data }),
    })
    t.field('updateProduct', {
      type: 'Product',
      args: {
        where: arg({ type: 'ProductWhereInput' }),
        data: arg({ type: 'ProductInput' }),
      },
      resolve: (_, { where, data }) => prisma.product.update({ where, data }),
    })
    t.field('deleteProduct', {
      type: 'Product',
      args: {
        where: arg({ type: 'ProductWhereInput' }),
      },
      resolve: (_, { where }) => prisma.product.delete({ where }),
    })
  },
})

export const schema = makeSchema({
  types: [Query, Mutation, Product, ProductWhereInput, ProductInput],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
})

const server = new ApolloServer({
  schema,
  context: { prisma },
});

const app = express();

server.start().then(() => {
  server.applyMiddleware({ app, path: '/' });

  app.listen({ port: 5555 }, () =>
    console.log(`🚀 Server ready at http://localhost:5555${server.graphqlPath}`)
  );
});