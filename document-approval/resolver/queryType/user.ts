import { nonNull, queryType, stringArg } from 'nexus';
import { generateToken } from '../../generated/util/auth';

const user = queryType({
  definition(t) {
    t.crud.user();
    t.crud.users();
    t.field('login', {
      type: 'authPayload',
      args: {
        email: nonNull(stringArg()),
      },
      async resolve(root, { email }, { prisma }) {
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (user === null) {
          return { token: null, user: null };
        }
        return { token: generateToken(user), user };
      },
    });
  },
});

export default user;
