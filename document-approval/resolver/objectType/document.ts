import { objectType } from 'nexus';

const document = objectType({
  name: 'document',
  definition(t) {
    t.model.document_id();
    t.model.author_id();
    t.model.next_approver_id();
    t.model.author();
    t.model.next_approver();
    t.model.approver_user();
    t.model.approval_status();
  },
});

export default document;