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
      user,
      addedBy,
    } = Object.fromEntries(await request.formData()) as {
      comment: string;
      amount: string;
      user: string;
      addedBy: string;
    };

    const amount = Number(amountStr);
    if (!Number.isInteger(amount) || amount <= 0) {
      return fail(400, { message: "Amount must be a positive whole number" });
    }

    const userRecord = await prisma.user.findUnique({
      where: { id: Number(user) },
    });
    if (!userRecord) {
      return fail(400, { message: "User does not exist" });
    }

    try {
      await prisma.fee.create({
        data: {
          comment,
          amount,
          user: {
            connect: {
              id: userRecord.id,
            },
          },
          addedBy,
        },
      });
    } catch (err) {
      return fail(500, { message: "Could not create the fee." });
    }

    return {
      message: "Fee created",
    };
  },
};
