import { extendType } from 'nexus';
import { resolve } from 'node:path';

const document = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOnedocument({
      async resolve(root, args, ctx, info, originalResolve) {
        args.data.involved_user = {
          connect: [{ email: ctx.userInfo.email }],
        };
        return await originalResolve(root, args, ctx, info);
      },
    });
    t.crud.deleteOnedocument();
    t.crud.deleteManydocument();
    t.crud.updateOnedocument();
    t.crud.updateManydocument();
    t.crud.upsertOnedocument();
  },
});

export default document;
