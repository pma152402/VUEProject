import { createYoga, createSchema } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const typeDefs = `
  type Project {
    id: ID!
    name: String!
    createdAt: String!
  }

  type Query {
    projects: [Project!]!
  }

  type Mutation {
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
  },
};

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: "/api/graphql",
});

export default yoga;
export const config = {
  runtime: "nodejs",
};
