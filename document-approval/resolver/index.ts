import objectType from './objectType';
import queryType from './queryType';
import mutationType from './mutationType';
import inputObjectType from './inputObjectType';
import { makeSchema } from 'nexus';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import * as path from 'path';

const type = [objectType, inputObjectType, queryType, mutationType];

console.log({ __dirname });
export default makeSchema({
  types: type,
  plugins: [
    nexusSchemaPrisma({
      experimentalCRUD: true,
      computedInputs: {
        author: ({ ctx }) => ({ connect: { user_id: ctx?.userInfo?.user_id } }),
      },
    }),
  ],
  contextType: {
    module: require.resolve('../context'),
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
    typegen: path.join(__dirname, '../generated/typegen-nexus-plugin-prisma.d.ts'),
    schema: path.join(__dirname, '../generated/schema.graphql'),
  },
});
