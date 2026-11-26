import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { Output, streamText } from "ai";
import { PROPERTIES } from "@/data/properties";

const resultSchema = z.object({
  summary: z.string(),
  matches: z.array(z.object({ id: z.string(), score: z.number(), reason: z.string() })),
});

export type Recommendation = z.infer<typeof resultSchema>;

export const recommendProperties = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ query: z.string().trim().min(5).max(1000) }).parse(d))
  .handler(async ({ data }): Promise<Recommendation & { error?: string }> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { summary: "", matches: [], error: "Service d'IA non configuré." };
    const catalog = PROPERTIES.map((p) => ({
      id: p.id, titre: p.title, type: p.type, transaction: p.transaction, prixFCFA: p.price,
      ville: p.city, quartier: p.district, chambres: p.bedrooms ?? null, surface: p.area,
      equipements: p.features, description: p.description.slice(0, 300),
    }));
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    try {
      const result = streamText({
        model: provider.responses("openai/gpt-6-astra"),
        system:
          "Tu es l'assistant immobilier de TransMedia au Bénin. À partir des critères en texte libre d'un chercheur de logement, sélectionne au maximum 6 annonces du catalogue fourni qui correspondent le mieux (ville, quartier, type, location/vente, budget en FCFA, chambres, équipements). N'invente jamais d'id. score de 0 à 100. reason : une phrase en français expliquant la correspondance et les éventuels compromis. summary : une phrase en français résumant les critères compris. Si rien ne correspond, renvoie matches vide.",
        prompt: `Critères : ${data.query}\n\nCatalogue (JSON) :\n${JSON.stringify(catalog)}`,
        output: Output.object({ schema: resultSchema }),
        maxRetries: 0,
        providerOptions: {
          openai: { store: false, forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", include: ["reasoning.encrypted_content"] },
        },
      });
      const out = await result.output;
      const ids = new Set(PROPERTIES.map((p) => p.id));
      return { summary: out.summary, matches: out.matches.filter((m) => ids.has(m.id)).sort((a, b) => b.score - a.score) };
    } catch (e) {
      const status = (e as { statusCode?: number }).statusCode;
      console.error("recommend error", status, e);
      const error =
        status === 429 ? "Trop de demandes, réessayez dans un instant."
        : status === 402 ? "Crédits d'IA épuisés pour le moment."
        : "L'assistant n'a pas pu répondre. Réessayez.";
      return { summary: "", matches: [], error };
    }
  });
