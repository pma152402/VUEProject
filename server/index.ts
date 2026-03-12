import "dotenv/config";
import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const typeDefs = ` 
  type Query {
    projects: [Project!]!
    project(id: Int!): Project
    proyectosUsuario(userId: Int!): [Project!]!
    cards(projectId: Int!): [Card!]!
  }
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
    description: String!
    createdAt: String!
  }
  type Card {
    id: ID!
    title: String!
    projectId: Int!
    createdAt: String!}
    type Query {
    project(id: Int!): Project
    projects: [Project!]!
    cards(projectId: Int!): [Card!]!
  }

  type Mutation {
    createProject(name: String!, ownerId: Int!): Project!
    login(email: String!, password: String!): User 
    createUser(name: String!, email: String!, password: String!): User! 
    createCard(title: String!, projectId: Int!): Card!
  }`;

console.log("SERVIDOR CON SCHEMA NUEVO");

const resolvers = {
  Query: {
    project: async (_: any, args: any) => {
      return prisma.project.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    projects: async () => {
      return prisma.project.findMany();
    },

    proyectosUsuario: async (_: any, args: any) => {
      return prisma.project.findMany({
        where: {
          ownerId: args.userId,
        },
      });
    },
    cards: async (_: any, args: any) => {
      return prisma.card.findMany({
        where: {
          projectId: Number(args.projectId),
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
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("GraphQL running on http://localhost:4000");
});
