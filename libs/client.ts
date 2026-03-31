import "server-only";

import { createClient } from "microcms-js-sdk";

function normalizeServiceDomain(raw: string | undefined): string {
  if (!raw) return "kotaportfolio";
  let s = raw.trim();
  s = s.replace(/^https?:\/\//, "");
  s = s.replace(/\.microcms\.io\/?.*$/i, "");
  return s || "kotaportfolio";
}

const CANDIDATE_KEYS = [
  "MICROCMS_API_KEY",
  "microCMS_APIKEY",
  "MICROCMS_APIKEY",
  "microcms_apikey",
] as const;

function readMicroCmsApiKey(): string {
  const e = process.env;
  for (const k of CANDIDATE_KEYS) {
    const v = e[k];
    if (typeof v === "string" && v.trim() !== "") return v.trim();
  }
  for (const rawKey of Object.keys(e)) {
    const k = rawKey.replace(/^\uFEFF/, "");
    if (!CANDIDATE_KEYS.includes(k as (typeof CANDIDATE_KEYS)[number]))
      continue;
    const v = e[rawKey];
    if (typeof v === "string" && v.trim() !== "") return v.trim();
  }
  return "";
}

const apiKey = readMicroCmsApiKey();
const serviceDomain = normalizeServiceDomain(
  process.env["MICROCMS_SERVICE_DOMAIN"]
);

if (!apiKey) {
  throw new Error(
    [
      "microCMS: API key is missing.",
      "Set microCMS_APIKEY or MICROCMS_API_KEY in .env.local and restart next dev.",
      "Vercel: add the same in Environment Variables.",
    ].join(" ")
  );
}

export const client = createClient({
  serviceDomain,
  apiKey,
});
