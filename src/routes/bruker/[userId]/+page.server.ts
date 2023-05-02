import type { PageServerLoad } from "./$types";
import prisma from "$lib/prisma";

export const load: PageServerLoad = async ({ params }) => {
  return {
    fees: await prisma.fee.findMany({
      include: { user: { select: { name: true, id: true } } },
      orderBy: { id: "desc" },
      where: {
        userId: Number(params.userId),
      },
    }),
    user: await prisma.user.findUnique({
      where: { id: Number(params.userId) },
    }),
  };
};
