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
      return fail(500, { message: "Could not create the article." });
    }

    return {
      status: 201,
    };
  },

  //   deleteUser: async ({ url }) => {
  //     const id = url.searchParams.get("id");
  //     if (!id) {
  //       return fail(400, { message: "Invalid request" });
  //     }
  //     try {
  //       await prisma.article.delete({
  //         where: {
  //           id: Number(id),
  //         },
  //       });
  //     } catch (err) {
  //       console.error(err);
  //       return fail(500, {
  //         message: "Something went wrong deleting your article",
  //       });
  //     }
  //     return {
  //       status: 200,
  //     };
  //   },
};
