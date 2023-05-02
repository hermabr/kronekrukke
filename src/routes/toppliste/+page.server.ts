import type { Actions, PageServerLoad } from "./$types";
import prisma from "$lib/prisma";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  const leaderboard: {
    id: number;
    navn: string;
    avgifter: number | object;
    rank?: number;
  }[] =
    await prisma.$queryRaw`SELECT U.id AS id, U.name AS navn, COALESCE(SUM(F.amount), 0) AS avgifter
   FROM User U
   LEFT JOIN Fee F ON F.userId = U.id
   GROUP BY U.id, U.name
ORDER BY avgifter DESC;
`;

  let rank = 0;
  let skips = 0;
  leaderboard.forEach((curr, idx) => {
    curr.avgifter = Number(curr.avgifter);

    const prev = leaderboard[idx - 1];

    rank = prev && curr.avgifter === prev.avgifter ? rank : rank + skips + 1;
    skips = curr.avgifter === (prev && prev.avgifter) ? skips + 1 : 0;

    curr.rank = rank;
  });

  return {
    leaderboard,
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
