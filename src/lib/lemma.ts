import { LemmaClient } from 'lemma-sdk';

// Environment variables
export const VITE_LEMMA_API_URL = import.meta.env.VITE_LEMMA_API_URL;
export const VITE_LEMMA_AUTH_URL = import.meta.env.VITE_LEMMA_AUTH_URL;
export const VITE_LEMMA_POD_ID = import.meta.env.VITE_LEMMA_POD_ID;

// Config validation helper
export const isLemmaConfigured =
  Boolean(VITE_LEMMA_API_URL) &&
  Boolean(VITE_LEMMA_AUTH_URL) &&
  Boolean(VITE_LEMMA_POD_ID);

// Initialize client
let lemmaClientInstance: LemmaClient | null = null;

if (isLemmaConfigured) {
  lemmaClientInstance = new LemmaClient({
    apiUrl: VITE_LEMMA_API_URL,
    authUrl: VITE_LEMMA_AUTH_URL,
    podId: VITE_LEMMA_POD_ID,
  });
}

export const lemmaClient = lemmaClientInstance;
