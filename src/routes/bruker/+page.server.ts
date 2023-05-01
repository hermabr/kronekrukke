import type { Actions, PageServerLoad } from "./$types";
import prisma from "$lib/prisma";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  return {
    users: await prisma.user.findMany(),
  };
};

export const actions: Actions = {
  createUser: async ({ request }) => {
    const { name } = Object.fromEntries(await request.formData()) as {
      name: string;
    };

    try {
      await prisma.user.create({
        data: {
          name,
        },
      });
    } catch (err) {
      console.error(err);
      return fail(500, { message: `Klarte ikke å lage bruker ${name}` });
    }

    return {
      message: `La til ${name}`,
    };
  },
};