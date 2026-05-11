// Astro 6: archivo en src/content.config.ts con loader explícito por colección.
// z viene de astro:content (Zod 4 bundleado por Astro).
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const plans = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/plans" }),
  schema: z.object({
    name:         z.string(),
    tagline:      z.string(),
    price:        z.number(),
    currency:     z.string().default("USD"),
    featured:     z.boolean().default(false),
    badge:        z.string().optional(),
    features:     z.array(z.string()),
    paymenterUrl: z.string().url(),
    order:        z.number(),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/faq" }),
  schema: z.object({
    question:      z.string(),
    answer:        z.string(),
    order:         z.number(),
    openByDefault: z.boolean().default(false),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/testimonials" }),
  schema: z.object({
    name:     z.string(),
    initials: z.string().max(3),
    plan:     z.string(),
    quote:    z.string(),
    rating:   z.number().min(1).max(5),
    order:    z.number(),
  }),
});

export const collections = { plans, faq, testimonials };
