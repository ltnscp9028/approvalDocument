import { objectType } from 'nexus';

const approval_history = objectType({
  name: 'approval_history',
  definition(t) {
    t.model.approval_history_id();
    t.model.is_approval();
    t.model.approver_id();
    t.model.approval_document_id();
    t.model.approver();
    t.model.document();
  },
});

export default approval_history;
