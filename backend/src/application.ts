import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication, RestServer} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {ReservationController} from './controllers';
import {GraphQLComponent} from '@loopback/graphql';
import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import {ReservationResolver} from './graphql/resolvers';
import {buildSchema} from 'type-graphql';

export {ApplicationConfig};

export class BackendApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.sequence(MySequence);

    this.static('/', path.join(__dirname, '../public'));

    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    if (this.options.useGraphQL) {
      this.component(GraphQLComponent);
    }

    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    this.controller(ReservationController);
  }

  async startApplication() {
    const restServer = await this.getServer(RestServer);

    const expressApp: express.Application = express();

    expressApp.use('/api', restServer.requestHandler);

    const schema = await buildSchema({
      resolvers: [ReservationResolver],
    });

    const server = new ApolloServer({
      schema,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    server.applyMiddleware({app: expressApp as any, path: '/graphql'});

    await super.start();

    const port = this.options.rest?.port ?? 5000;
    expressApp.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
      console.log(`GraphQL endpoint is available at http://localhost:${port}/graphql`);
    });
  }
}
