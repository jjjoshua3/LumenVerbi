import { createServerFn } from "@tanstack/react-start";

type Payload = {
  text: string;
  targetName: string;
  scriptNote: string;
  continuation: boolean;
  keepMarkers: boolean;
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
    keepMarkers: Boolean(data.keepMarkers),
  };
}

function systemPrompt(data: Payload, strict: boolean): string {
  const follow = data.continuation ? "Dit is het vervolg. Herhaal de vorige tekst niet." : "";
  const force = strict ? "Je vorige antwoord was nog in de brontaal. Vertaal nu elke zin." : "";
  return [
    `Vertaal ALLES naar het ${data.targetName}. Geen zin, geen woord in de brontaal of in het Engels.`,
    "Vertaal ook de titel, liturgie, liedtitels, gebeden, geloofsbelijdenis en preek. Niets overslaan, niets samenvatten, geen zin weghalen.",
    "Alleen persoonsnamen blijven staan. Liedtitels, 'opwekking', 'liedboek', 'coda' en Engelse woorden vertaal je wél.",
    "Bijbelverwijzingen exact houden: 'Job 41:11-13' blijft 'Job 41:11-13'. Keer hoofdstuk en vers nooit om. Gebruik Westerse cijfers.",
    "Liednummers exact houden met spaties: 'GK06 148: 1, 2'. Plak getallen nooit aan elkaar.",
    "Gebruik bijbelse termen: een mestvaalt is een ashoop, geen vuilnisbelt.",
    data.keepMarkers
      ? "De tekst heeft markeringen [[1]], [[2]], enzovoort. Zet elke markering op een eigen regel, in dezelfde volgorde. Vertaal alleen de alinea eronder. Geen markering weglaten of toevoegen. Geen ## toevoegen."
      : "Behoud leestekens. Antwoord alleen met de vertaling. Lege regel tussen alinea's. Kopjes beginnen met \"## \".",
    data.scriptNote,
    follow,
    force,
  ]
    .filter(Boolean)
    .join("\n");
}

function protectRefs(text: string): string {
  return text.replace(
    /([A-Za-z]{1,12}\s*)?\d{1,4}(?:\s*[:.,\-–]\s*\d{1,4})+/g,
    (match) => `\u2066${match.trim()}\u2069`,
  );
}

function dutchLeak(text: string, targetName: string): boolean {
  if (/nederlands/i.test(targetName)) return false;
  const hits = text.match(
    /\b(de|het|een|van|voor|met|dat|die|niet|zijn|heeft|wordt|onze|deze|maar|ook|als|dan)\b/gi,
  );
  return (hits?.length ?? 0) > 12;
}

async function complete(apiKey: string, data: Payload, strict: boolean): Promise<Response> {
  const marker = data.keepMarkers
    ? "Behoud elke markering [[nummer]] op een eigen regel en vertaal alleen de tekst eronder.\n\n"
    : "";
  const ask = strict
    ? `${marker}Vertaal de volgende tekst nu volledig naar het ${data.targetName}. Geen enkele zin in de brontaal.\n\n${data.text}`
    : `${marker}Vertaal de volgende tekst volledig naar het ${data.targetName}:\n\n${data.text}`;
  return fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    signal: AbortSignal.timeout(120000),
    body: JSON.stringify({
      model: "grok-4.20-0309-non-reasoning",
      temperature: 0.1,
      max_tokens: 8192,
      messages: [
        { role: "system", content: systemPrompt(data, strict) },
        { role: "user", content: ask },
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
      let response = await complete(apiKey, data, false);
      if (!response.ok && (response.status === 429 || response.status >= 500)) {
        await new Promise((resolve) => setTimeout(resolve, 900));
        response = await complete(apiKey, data, false);
      }
      if (!response.ok) return { ok: false, error: "failed" };
      const body = (await response.json()) as {
        choices?: { message?: { content?: string }; finish_reason?: string }[];
      };
      let text = body.choices?.[0]?.message?.content?.trim() ?? "";
      if (!text) return { ok: false, error: "empty" };
      if (body.choices?.[0]?.finish_reason === "length") return { ok: false, error: "failed" };
      if (dutchLeak(text, data.targetName)) {
        const retry = await complete(apiKey, data, true);
        if (retry.ok) {
          const again = (await retry.json()) as {
            choices?: { message?: { content?: string }; finish_reason?: string }[];
          };
          const second = again.choices?.[0]?.message?.content?.trim() ?? "";
          if (second && again.choices?.[0]?.finish_reason !== "length") text = second;
        }
      }
      return { ok: true, text: protectRefs(text) };
    } catch {
      return { ok: false, error: "failed" };
    }
  });
