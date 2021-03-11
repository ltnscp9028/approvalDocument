import { extendType } from 'nexus';

const document = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOnedocument();
    t.crud.deleteOnedocument();
    t.crud.deleteManydocument();
    t.crud.updateOnedocument();
    t.crud.updateManydocument();
    t.crud.upsertOnedocument();
  },
});

export default document;
