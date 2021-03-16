import { document } from '.prisma/client';
import { extendType, nonNull } from 'nexus';
import approvalDocumentInput from '../inputObjectType/approvalDocumentInput';

const document = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOnedocument({
      async resolve(root, args, ctx, info, originalResolve) {
        const document = await originalResolve(root, args, ctx, info);
        const approver_list: number[] = Object(document.approver_list);

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
            next_approver: {
              connect: {
                user_id: approver_list[0],
              },
            },
            is_approval_list: {
              set: [],
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
    t.list.field('approvalDocument', {
      type: 'document',
      args: { approvalDocumentInput: nonNull(approvalDocumentInput) },
      async resolve(root, { approvalDocumentInput }, { prisma, userInfo }, info) {
        const { approvalDocumentList, approvalStatusList } = approvalDocumentInput;

        const targetDocument = await prisma.document.findMany({
          where: {
            document_id: {
              in: approvalDocumentList as number[],
            },
            next_approver_id: userInfo.user_id,
          },
          include: {
            involved_user: true,
          },
        });

        const prismaTransactionArray = [];
        const approvalDocumentCount = targetDocument.length;

        for (let i = 0; i < approvalDocumentCount; i++) {
          const { approver_list, is_approval_list } = targetDocument[i];
          const remainApprovalCount = approver_list.length - is_approval_list.length - 1;
          const isDone = remainApprovalCount === 0 || approvalStatusList[i] === false;

          const approvalPrismaQuery = prisma.document.update({
            where: { document_id: Number(approvalDocumentList[i]) },
            data: {
              involved_user: {
                connect: {
                  user_id: userInfo.user_id,
                },
              },
              next_approver: {
                disconnect: isDone ? true : undefined,
                connect: isDone
                  ? undefined
                  : {
                      user_id: approver_list[is_approval_list.length + 1],
                    },
              },
              approval_status:
                approvalStatusList[i] === false
                  ? 'REJECT'
                  : approvalStatusList[i] === true && remainApprovalCount === 0
                  ? 'APPROVAL'
                  : 'DOING',
            },
          });
          prismaTransactionArray.push(approvalPrismaQuery);
        }
        return await prisma.$transaction(prismaTransactionArray);
      },
    });
  },
});

export default document;
