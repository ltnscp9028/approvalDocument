import objectType from './objectType';
import queryType from './query';
import mutation from './mutation';
import { makeSchema } from 'nexus';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import * as path from 'path';

const type = [objectType, queryType, mutation];

console.log({ __dirname });
export default makeSchema({
  types: type,
  plugins: [
    nexusSchemaPrisma({
      experimentalCRUD: true,
    }),
  ],
  contextType: {
    module: path.join(__dirname, '../context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '.prisma/client',
        alias: 'prisma',
      },
    ],
  },
  shouldExitAfterGenerateArtifacts: Boolean(process.env.NEXUS_SHOULD_EXIT_AFTER_REFLECTION),
  outputs: {
    typegen: path.join(__dirname, '../../node_modules/@types/nexus-typegen/index.d.ts'),
    schema: path.join(__dirname, '../generated/schema.graphql'),
  },
});
