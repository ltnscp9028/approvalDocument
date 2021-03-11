import { extendType } from 'nexus';

const approvalHistory = extendType({
  type: 'Query',
  definition(t) {
    t.crud.approvalHistory();
    t.crud.approvalHistories();
  },
});

export default approvalHistory;
