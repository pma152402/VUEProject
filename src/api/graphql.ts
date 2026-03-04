import { createYoga, createSchema } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  createProject(name: String!, ownerId: Int!): Project!
  login(email: String!, password: String!): User
  createUser(name: String!, email: String!, password: String!): User!
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

    login: async (_: any, args: any) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });

      if (!user) {
        throw new Error("El usuario no se encuentra");
      }

      if (user.password !== args.password) {
        throw new Error("La contraseña no es correcta");
      }

      return user;
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
