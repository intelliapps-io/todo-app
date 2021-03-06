require('dotenv').config();
import "reflect-metadata";
import Express from "express";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { resolvers } from "./modules/resolvers";
import { authMiddleware, authChecker } from "./helpers/auth";
import { runCodegen } from "./helpers/helpers";

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

const main = async () => {
  const httpPort = 3001;

  // Connect to database
  let maxAttempts = 1
  for (let i = 0; i < maxAttempts; i++) {
    let connErr
    const dbConn = await createConnection().catch(err => connErr = err)
    if (dbConn) break
    else if (i < maxAttempts - 1) await sleep(750)
    else throw connErr
  }

  // Generate TypeGraphQL Schema 
  const schema = await buildSchema({
    resolvers,
    authChecker,
    emitSchemaFile: {
      path: "./src/graphql/generated-schema.graphql"
    }
  });
  
  // Create GraphQL Server
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res })
  });

  // Create Express Web Server
  const app = Express();

  // Read authentication cookies from requests
  app.use(cookieParser())

  // CORS
  var corsOptions: CorsOptions = {
    credentials: true,
    origin: true
  }
  app.use(cors(corsOptions));

  // Configure JWT-Authentication
  app.use(authMiddleware);

  // Integrate GraphQL Server with Express
  apolloServer.applyMiddleware({ app, cors: corsOptions });

  app.listen(httpPort, () => console.log(`
  > GraphQL: http://localhost:${httpPort}/graphql
  
  > pgAdmin: http://localhost:5050
       - email: admin@local.host
       - password: postgres

  > postgres: 
       - username: postgres
       - password: postgres
  `));

  // Generate Client Code
  await runCodegen().catch(err => { });
}

main()
  .catch(err => { throw err });  