import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
import Facebook from "@auth/core/providers/facebook";
import {
  GITHUB_ID,
  GITHUB_SECRET,
  FACEBOOK_ID,
  FACEBOOK_SECRET,
} from "$env/static/private";

export const handle = SvelteKitAuth({
  providers: [
    GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
    Facebook({ clientId: FACEBOOK_ID, clientSecret: FACEBOOK_SECRET }),
  ],
});
