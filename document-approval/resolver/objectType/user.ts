import { objectType } from 'nexus';

const user = objectType({
  name: 'user',
  definition(t) {
    t.model.user_id();
    t.model.email();
    t.model.name();
    t.model.outbox_document({ filtering: true });
    t.model.inbox_document({ filtering: true });
    t.model.archive_document({ filtering: true });
    t.model.approval_history({ filtering: true });
  },
});

export default user;
