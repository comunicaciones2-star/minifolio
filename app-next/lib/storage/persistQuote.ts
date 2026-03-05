import type { QuoteFormValues } from "@/lib/validation/quoteSchema";

const STORAGE_KEY = "minifolio:quote:v1";

type PersistedQuote = {
  version: 1;
  data: QuoteFormValues;
  savedAt: string;
};

export const saveQuote = (data: QuoteFormValues) => {
  if (typeof window === "undefined") {
    return;
  }

  const payload: PersistedQuote = {
    version: 1,
    data,
    savedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const loadQuote = (): QuoteFormValues | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as PersistedQuote;
    if (parsed.version !== 1 || !parsed.data) {
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
};

export const clearQuote = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(STORAGE_KEY);
};
