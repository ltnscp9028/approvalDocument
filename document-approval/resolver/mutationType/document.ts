import { extendType } from 'nexus';
import { resolve } from 'node:path';

const document = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOnedocument({
      async resolve(root, args, ctx, info, originalResolve) {
        const document = await originalResolve(root, args, ctx, info);

        const involved_author = await ctx.prisma.document.update({
          where: {
            document_id: Number(document.document_id),
          },
          data: {
            involved_user: {
              connect: {
                user_id: ctx.userInfo.user_id,
              },
            },
          },
        });

        return involved_author;
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
