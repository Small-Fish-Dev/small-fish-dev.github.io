import { sveltekit } from "@sveltejs/kit/vite";
import autoImport from "sveltekit-autoimport";

export default {
  plugins: [
    autoImport({
      include: ["**/*.(svelte|md)"],
      components: ["./src/lib", { name: "./src" }],
      module: {
        svelte: ["onMount"],
      },
    }),
    sveltekit(),
  ],
};
