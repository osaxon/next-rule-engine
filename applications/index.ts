"use server";

import { applicationSchema } from "@/types/schemas";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchApplication = async (id: string) => {
  const json = await import("../application.json").then((a) => a.default);

  const app = applicationSchema.safeParse(json);

  if (!app.success) {
    console.error(app.error.message);
    return null;
  }

  return app.data;
};
