import { objectType } from 'nexus';

const authPayload = objectType({
  name: 'authPayload',
  definition(t) {
    t.string('token'), t.field('user', { type: 'user' });
  },
});

export default authPayload;
