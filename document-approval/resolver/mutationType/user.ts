import { extendType } from 'nexus';

const user = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneuser();
    t.crud.deleteOneuser();
    t.crud.deleteManyuser();
    t.crud.updateOneuser();
    t.crud.updateManyuser();
    t.crud.upsertOneuser();
  },
});

export default user;
