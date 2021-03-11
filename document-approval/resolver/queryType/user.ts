import { queryType } from 'nexus';

const user = queryType({
  definition(t) {
    t.crud.user();
    t.crud.users();
  },
});

export default user;
