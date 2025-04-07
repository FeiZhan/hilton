import {ApplicationConfig, BackendApplication} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new BackendApplication(options);
  await app.boot();
  await app.start();

  const port = process.env.PORT ?? 4000;
  app.bind('rest.port').to(port);
  console.log(`Backend is running on port ${port}`);

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  const config = {
    rest: {
      port: +(process.env.PORT ?? 4000),
      host: process.env.HOST ?? '127.0.0.1',
      gracePeriodForClose: 5000,
      openApiSpec: {
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
