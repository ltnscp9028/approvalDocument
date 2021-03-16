import { objectType } from 'nexus';

const document = objectType({
  name: 'document',
  definition(t) {
    t.model.document_id();
    t.model.author_id();
    t.model.next_approver_id();
    t.model.document_title();
    t.model.document_classification();
    t.model.document_content();
    t.model.author();
    t.model.next_approver();
    t.model.approver_list();
    t.model.is_approval_list();
    t.model.involved_user();
    t.model.approval_history();
    t.model.approval_status();
  },
});

export default document;
