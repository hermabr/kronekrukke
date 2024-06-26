import type { Actions, PageServerLoad } from "./$types";
import prisma from "$lib/prisma";
import { fail, json, redirect, text } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  return {
    users: await prisma.user.findMany(),
  };
};

export const actions: Actions = {
  createFee: async ({ request }) => {
    const {
      comment,
      amount: amountStr,
      userId,
      addedBy,
    } = Object.fromEntries(await request.formData()) as {
      comment: string;
      amount: string;
      userId: string;
      addedBy: string;
    };

    const amount = Number(amountStr);
    if (!Number.isInteger(amount) || amount <= 0) {
      return fail(400, {
        message: `Antall fortredelser må være et tall. Fant ${amountStr}`,
      });
    }

    try {
      await prisma.fee.create({
        data: {
          comment,
          amount,
          user: {
            connect: {
              id: Number(userId),
            },
          },
          addedBy,
        },
      });
    } catch (err) {
      return fail(500, { message: `Klarte ikke å lage avgift ${comment}` });
    }

    return {
      message: `Laget avgift ${comment}`,
    };
  },
};
