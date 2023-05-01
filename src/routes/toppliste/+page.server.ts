import type { Actions, PageServerLoad } from "./$types";
import prisma from "$lib/prisma";

export const load: PageServerLoad = async () => {
  return {
    fees: await prisma.fee.findMany(),
  };
};
