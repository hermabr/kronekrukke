import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
import Linkedin from "@auth/core/providers/linkedin";
import { GITHUB_ID, GITHUB_SECRET } from "$env/static/private";

export const handle = SvelteKitAuth({
  providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
});
