import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: ["apps/*/vitest.config.ts", "packages/*/vitest.config.ts"],
    logHeapUsage: true,
    coverage: {
      provider: "v8",
    },
  },
});
