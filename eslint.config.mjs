import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Le pattern de design utilise des labels du genre `// surtitre` rendus
      // dans des <span>/<p>. Ce n'est jamais un commentaire JS oublié.
      "react/jsx-no-comment-textnodes": "off",
      // setState dans useEffect est légitime quand on synchronise depuis un
      // système externe non accessible en SSR (sessionStorage, IntersectionObserver,
      // animation frames, etc.). On garde un warning au lieu d'une erreur.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Scratch dir : assets bruts non linted.
    "tmp/**",
    // Scripts one-shots de seed Sanity, non-applicatifs.
    "scripts/**",
  ]),
]);

export default eslintConfig;
