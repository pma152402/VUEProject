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

type Card {
  id: ID!
  title: String!
  projectId: Int!
}

type Query {
  projects: [Project!]!
  cards(projectId: Int!): [Card!]!
}



type Mutation {
  createProject(name: String!, ownerId: Int!): Project!
  login(email: String!, password: String!): User
  createUser(name: String!, email: String!, password: String!): User!
  createCard(title: String!, projectId: Int!): Card!
}
`;
console.log("SERVIDOR CON SCHEMA NUEVO");

const resolvers = {
  Query: {
    projects: async () => {
      return prisma.project.findMany();
    },

    cards: async (_: any, args: any) => {
      return prisma.card.findMany({
        where: {
          projectId: args.projectId,
        },
      });
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

    createCard: async (_: any, args: any) => {
      return prisma.card.create({
        data: {
          title: args.title,
          projectId: args.projectId,
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
  graphqlEndpoint: "/graphql",
});

export default yoga;
export const config = {
  runtime: "nodejs",
};

