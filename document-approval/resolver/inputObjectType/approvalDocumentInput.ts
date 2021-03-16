import { inputObjectType } from 'nexus';

const approvalDocumentInput = inputObjectType({
  name: 'appovalDocumentInput',
  definition(t) {
    t.nonNull.list.int('approvalDocumentList');
    t.nonNull.list.boolean('approvalStatusList');
    t.nonNull.list.string('approvalCommentList');
  },
});

export default approvalDocumentInput;
