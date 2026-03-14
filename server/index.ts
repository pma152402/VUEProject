import "dotenv/config";
import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const typeDefs = ` 
  type Query {
    project(id: Int!): Project
    projects: [Project!]!
    cards(projectId: Int!): [Card!]!
    proyectosUsuario(userId: Int!): [Project!]!
    tasks: [Task!]!
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
    createdAt: String!
    tasks: [Task!]!
  }

  type Task {
    id: ID!
    text: String!
    cardId: Int!
  }

  type Mutation {
    deleteProject(projectId: Int!): Project!
    login(email: String!, password: String!): User 
    createUser(name: String!, email: String!, password: String!): User! 
    createCard(title: String!, projectId: Int!): Card!
    updateCardTitle(cardId: Int!, title: String!): Card!
    deleteCard(cardId: Int!): Card
    createTask(text: String!, cardId: Int!): Task!
    updateTask(taskId: Int!, text: String!): Task!
    deleteTask(taskId: Int!): Task!
    createProject(name: String!, description: String!, ownerId: Int!): Project!
    updateProjectDescription(projectId: Int!, description: String!): Project!
  }`;

console.log("SERVIDOR CON SCHEMA NUEVO");

const resolvers = {
  Query: {
    // Obtener proyecto en concreto
    project: async (_: any, args: any) => {
      return prisma.project.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    // Obtener todos los proyectos
    projects: async () => {
      return prisma.project.findMany({
        orderBy: {
          createdAt: "asc",
        },
      });
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
          projectId: args.projectId,
        },
        orderBy: {
          id: "asc",
        },
        include: {
          tasks: {
            orderBy: {
              id: "asc",
            },
          },
        },
      });
    },
  },
  Mutation: {
    // Crear proyecto, con una tarjeta de ejemplo y tareas
    createProject: async (_: any, args: any) => {
      const project = await prisma.project.create({
        data: {
          name: args.name,
          ownerId: args.ownerId,
          description: args.description,
        },
      });

      // crear tarjeta inicial
      const example1 = await prisma.card.create({
        data: {
          title: "Por hacer:",
          projectId: project.id,
        },
      });

      // Crear tareas de ejemplo
      await prisma.task.createMany({
        data: [
          { text: "Tarea de ejemplo", cardId: example1.id },
          { text: "Crea todas las tareas que necesites", cardId: example1.id },
        ],
      });

      return project;
    },

    // DELETE FROM Project WHERE id = projectId
    deleteProject: async (_: any, args: any) => {
      return prisma.project.delete({
        where: {
          id: args.projectId,
        },
      });
    },

    // Editar descripcion
    updateProjectDescription: async (_: any, args: any) => {
      return prisma.project.update({
        where: {
          id: args.projectId,
        },
        data: {
          description: args.description,
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

    deleteCard: async (_: any, args: any) => {
      return prisma.card.delete({
        where: {
          id: args.cardId,
        },
      });
    },

    updateCardTitle: async (_: any, args: any) => {
      return prisma.card.update({
        where: {
          id: args.cardId,
        },
        data: {
          title: args.title,
        },
      });
    },

    // TAREA
    createTask: async (_: any, args: any) => {
      return prisma.task.create({
        data: {
          text: args.text,
          cardId: args.cardId,
        },
      });
    },

    updateTask: async (_: any, args: any) => {
      return prisma.task.update({
        where: {
          id: args.taskId,
        },
        data: {
          text: args.text,
        },
      });
    },

    deleteTask: async (_: any, args: any) => {
      return prisma.task.delete({
        where: {
          id: args.taskId,
        },
      });
    },
    //
    createUser: async (_: any, args: any) => {
      return prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: args.password,
        },
      });
    },
    //
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
