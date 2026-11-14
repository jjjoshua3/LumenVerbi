import { createServerFn } from "@tanstack/react-start";

type Payload = {
  text: string;
  targetName: string;
  scriptNote: string;
  continuation: boolean;
};

type TranslateResult =
  | { ok: true; text: string }
  | { ok: false; error: "unavailable" | "failed" | "empty" };

function asPayload(input: unknown): Payload {
  if (!input || typeof input !== "object") throw new Error("Invalid translation request");
  const data = input as Record<string, unknown>;
  const text = typeof data.text === "string" ? data.text.trim() : "";
  const targetName = typeof data.targetName === "string" ? data.targetName.trim() : "";
  const scriptNote = typeof data.scriptNote === "string" ? data.scriptNote.trim() : "";
  if (!text || text.length > 9000 || !targetName || targetName.length > 80) {
    throw new Error("Invalid translation request");
  }
  return {
    text,
    targetName,
    scriptNote: scriptNote.slice(0, 700),
    continuation: Boolean(data.continuation),
  };
}

function systemPrompt(data: Payload): string {
  const follow = data.continuation
    ? "Dit fragment is het VERVOLG van dezelfde preek. Ga naadloos verder. Herhaal de vorige tekst niet en voeg geen titel of inleiding toe."
    : "";
  return [
    `Je bent een deskundige theologische vertaler voor kerkdiensten en preken. Vertaal de onderstaande preek van de dominee zo getrouw en letterlijk mogelijk naar het ${data.targetName}, zodat de exacte boodschap, Bijbelse verwijzingen, structuur (alinea's en kopjes) en toon van de dominee volledig behouden blijven. Zorg er tegelijkertijd voor dat de zinsbouw grammaticaal klopt en natuurlijk leesbaar is voor een moedertaalspreker in het authentieke schrift van ${data.targetName}. Laat niets weg en vat niets samen.`,
    data.scriptNote,
    follow,
    "Opmaak — verplicht:",
    "- Antwoord ALLEEN met de vertaling. Geen inleiding, geen uitleg, geen aanhalingstekens eromheen.",
    "- Zet een lege regel tussen alinea's.",
    '- Zet elk kopje op een eigen regel die begint met "## ".',
    "- Behoud Bijbelverwijzingen en gebruik de gebruikelijke boeknamen van de doeltaal.",
    "- Vertaal ook gebeden, citaten en opsommingen. Sla geen zin over.",
  ]
    .filter(Boolean)
    .join("\n");
}

async function complete(apiKey: string, data: Payload): Promise<Response> {
  return fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    signal: AbortSignal.timeout(120000),
    body: JSON.stringify({
      model: "grok-4.5",
      temperature: 0.2,
      max_tokens: 8192,
      messages: [
        { role: "system", content: systemPrompt(data) },
        { role: "user", content: data.text },
      ],
    }),
  });
}

export const translateChunk = createServerFn({ method: "POST" })
  .validator((input: unknown) => asPayload(input))
  .handler(async ({ data }): Promise<TranslateResult> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "unavailable" };

    try {
      let response = await complete(apiKey, data);
      if (!response.ok && (response.status === 429 || response.status >= 500)) {
        await new Promise((resolve) => setTimeout(resolve, 900));
        response = await complete(apiKey, data);
      }
      if (!response.ok) return { ok: false, error: "failed" };
      const body = (await response.json()) as {
        choices?: { message?: { content?: string }; finish_reason?: string }[];
      };
      const text = body.choices?.[0]?.message?.content?.trim() ?? "";
      if (!text) return { ok: false, error: "empty" };
      if (body.choices?.[0]?.finish_reason === "length") return { ok: false, error: "failed" };
      return { ok: true, text };
    } catch {
      return { ok: false, error: "failed" };
    }
  });
