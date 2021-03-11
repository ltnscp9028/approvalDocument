import { objectType } from 'nexus';

const user = objectType({
  name: 'user',
  definition(t) {
    t.model.user_id();
    t.model.email();
    t.model.name();
    t.model.outbox_document();
    t.model.inbox_document();
    t.model.assigned_document();
    t.model.archive_document();
  },
});

export default user;
