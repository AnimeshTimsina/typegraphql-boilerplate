import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import express from 'express';
import { UserResolver } from './entity/User/resolver';
import { MovieResolver } from './entity/Movie/resolver';
import initializeDB from './entity/initializeDB';
import { AuthResolver } from './auth/resolvers';
import { authService } from './auth/services';

const app = express();
// app.use(express.static(__dirname+"/pages"));

async function main() {
  await initializeDB();
  const schema = await buildSchema({
    resolvers: [MovieResolver,UserResolver,AuthResolver],
    container: Container,
    emitSchemaFile: true,
  });
  const server = new ApolloServer({
    schema,
    introspection:true,
    context: async ctx => {
      const user = await authService.getUserFromHeader(ctx)
      const accessToken = authService.getAccessTokenFromHeader(ctx)
      return {
        ...ctx,
        user:user,
        accessToken:accessToken
      }  
    } 
  });
  await server.start()
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