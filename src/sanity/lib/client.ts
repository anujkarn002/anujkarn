import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "../env";

let cached: SanityClient | null = null;

export function getClient(): SanityClient {
  if (!isSanityConfigured) {
    throw new Error("Sanity is not configured — check isSanityConfigured before calling getClient()");
  }
  if (!cached) {
    cached = createClient({ projectId, dataset, apiVersion, useCdn: true });
  }
  return cached;
}
