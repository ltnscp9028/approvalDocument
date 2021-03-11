import { extendType } from 'nexus';

const document = extendType({
  type: 'Query',
  definition(t) {
    t.crud.document();
    t.crud.documents();
  },
});

export default document;
