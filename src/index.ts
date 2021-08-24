import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { AuthResolver } from './auth/resolvers';
import { authService } from './auth/services';
import { ProductCategoryResolver } from './entity/Category/resolver';
import initializeDB from './entity/initializeDB';
import { MovieResolver } from './entity/Movie/resolver';
import { ProductResolver } from './entity/Product/resolver';
import { UserResolver } from './entity/User/resolver';

const app = express();
app.use(cors());
// app.use(express.static(__dirname+"/pages"));

async function main() {
  await initializeDB();
  const schema = await buildSchema({
    resolvers: [
      MovieResolver,
      UserResolver,
      AuthResolver,
      ProductCategoryResolver,
      ProductResolver,
    ],
    container: Container,
    emitSchemaFile: true,
  });
  const server = new ApolloServer({
    schema,
    introspection: true,
    context: async (ctx) => {
      const user = await authService.getUserFromHeader(ctx);
      const accessToken = authService.getAccessTokenFromHeader(ctx);
      return {
        ...ctx,
        user: user,
        accessToken: accessToken,
      };
    },
  });
  await server.start();
  server.applyMiddleware({ app });
  const port = process.env.PORT || 5000;

  // app.get("/password-reset", (_, res) => {
  //   res.sendFile(__dirname + "/pages/password-reset.html");
  // });

  app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}/graphql`),
  );
}

main();
