import { z } from "zod";

export const creditReportSchema = z.object({
  score: z.number(),
});

export const applicantSchema = z.object({
  name: z.string(),
  email: z.email(),
  creditReport: creditReportSchema,
});

export const vehicleSchema = z.object({
  make: z.string(),
  model: z.string(),
  vrm: z.string(),
  registrationDate: z.string(),
  value: z.number(),
  engineSize: z.number(),
});

export const applicationSchema = z.object({
  mainApplicant: applicantSchema,
  loanAmount: z.number(),
  vehicle: vehicleSchema,
});
