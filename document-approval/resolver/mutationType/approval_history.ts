import { mutationType, objectType } from 'nexus';

const approval_history = mutationType({
  definition(t) {
    t.crud.createOneapproval_history();
    t.crud.deleteOneapproval_history();
    t.crud.deleteManyapproval_history();
    t.crud.updateOneapproval_history();
    t.crud.updateManyapproval_history();
    t.crud.upsertOneapproval_history();
  },
});

export default approval_history;
