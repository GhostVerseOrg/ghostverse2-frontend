This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font and other fonts.

## Project utilities
### How to set up Prettier and automatic formatting on VS Code
- https://www.educative.io/answers/how-to-set-up-prettier-and-automatic-formatting-on-vs-code
- https://www.digitalocean.com/community/tutorials/how-to-format-code-with-prettier-in-visual-studio-code

## Dev tunnel
### Ngrok 
- https://ngrok.com/download
- https://medium.com/@wil.cook.is/tunneling-with-ngrok-4c7d643e98ca

### VSCode port forwarding
- https://code.visualstudio.com/docs/editor/port-forwarding
- https://medium.com/@agusetyawan/supercharge-your-web-development-harnessing-the-power-of-local-port-forwarding-in-vs-code-bad362e6b719

## Code format
Use scripts from the `package.json` file, it includes these scripts
```bash
prettier --write .
npx eslint --fix .
```
Or simply
```bash
yarn prettier
yarn eslint
```

## Using codegen for GraphQL
NB! Use local Strapi because graphql retroinspection is allowed in dev mode only.
NB! Use http://0.0.0.0:1337 instead of localhost URL to avoid ECONNREFUSED issues.

We've integrated WebStorm [`graphql-codegen` package](https://plugins.jetbrains.com/plugin/8097-graphql) for automatic types generation based on provided schemas. 

The `codegen.yml` file in the root is configuration file for `grapqhl-codegen` package, it's created in YML format to pass the ENV value there with no need to run `process.env.` like commands to pass schema URL.

Graphql configuration file is located at `/src/app/_lib/_graphql/cms` directory for the Strapi CMS graphql and is generated into `generated.ts` there.

To generate types:

## VSCode | CLI Guide:

This can be executed if you run `yarn generate` from the root of the repository, from where the `codegen.yml` file is situated.! This will run the introspection and update the `schema.graphql` for you and update `generated.ts` file. Then create your `*.graphql` query file and run this command again, it will inspect schema again and also put your queries from new *.graphl files!

## WebStorm Guide:

1. Go to `src/app/_lib/_graphql` and select `cms` if you want to work with CMS API.
2. Create new `.graphql` file.
3. Write your desired query.
4. If you are using JetBrains IDE you need to generate schema file:
    1. In the left bottom corner of your IDE find `GraphQL` tab.
    2. Expand `cms` schema.
    3. Double-click on `STRAPI API` below "Endpoints".
    4. Select "Get GraphQL Schema from the endpoint (introspection)".
    5. IDE will update `schema.graphql` file in selected folder.
5. Open tab in terminal and run `yarn generate`.
6. File `generated.ts` will be updated with your newest query types.

NB! If you have issues regenerating the graphql code using codegen look into `codegen.yml` file.
NB! Introspection works with Strapi running in `dev` mode only, retrospection is disabled for production mode.

To use your query:

1. Go to appropriate `api` file, eg. `/_lib/api/MenuApi.ts`
2. `yarn api` generated for you object that can be passed as query to URQL client, name of this object should look like this: `NameOfYourQueryDocument`
3. Once you use this object, it should be auto imported by your IDE. If not, then you can import it from `graphql/*/generated.ts`

# Cache issues with Next.js
If Next.js cached page data and you really want to refresh it, try ctrl+F5 hard-refresh in your browser window instead (when `yarn dev` is used to run the development server).