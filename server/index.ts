import "dotenv/config";
import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: String!
  }

  type Project {
    id: ID!
    name: String!
    createdAt: String!
  }

  type Query {
    projects: [Project!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    createProject(name: String!, ownerId: Int!): Project!
  }
`;

const resolvers = {
  Query: {
    projects: async () => {
      return prisma.project.findMany();
    },
  },
  Mutation: {
    createProject: async (_: any, args: any) => {
      return prisma.project.create({
        data: {
          name: args.name,
          ownerId: args.ownerId,
        },
      });
    },
    createUser: async (_: any, args: any) => {
      return prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: args.password,
        },
      });
    },
  },
};

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("🚀 GraphQL running on http://localhost:4000");
});
