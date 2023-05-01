import type { Actions, PageServerLoad } from "./$types";
import prisma from "$lib/prisma";
import { error, fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
  const hentAvgift = async () => {
    const article = await prisma.fee.findUnique({
      where: {
        id: Number(params.avgiftsid),
      },
    });
    if (!article) {
      throw error(404, "Fant ikke avgift");
    }
    return article;
  };

  return {
    avgift: hentAvgift(),
    users: await prisma.user.findMany(),
  };
};

export const actions: Actions = {
  endreAvgift: async ({ request, params }) => {
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
      return fail(400, { message: "Amount must be a positive whole number" });
    }

    const existingFee = await prisma.fee.findUnique({
      where: {
        id: Number(params.avgiftsid),
      },
    });
    if (!existingFee) {
      return fail(404, { message: "Fee not found" });
    }

    if (existingFee.addedBy !== addedBy) {
      return fail(403, {
        message: "You are not authorized to update this fee",
      });
    }

    try {
      await prisma.fee.update({
        where: {
          id: Number(params.avgiftsid),
        },
        data: {
          comment,
          amount,
          userId: Number(userId),
        },
      });
    } catch (err) {
      console.error(err);
      return fail(500, { message: "Could not update article" });
    }

    return {
      message: `Successfully updated ${comment}`,
    };
  },
};
