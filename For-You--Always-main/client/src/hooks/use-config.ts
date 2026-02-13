import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* =========================
   Types (frontend-only)
========================= */

export type Config = {
  theme?: "light" | "dark";
  musicEnabled?: boolean;
};

export type InsertConfig = Partial<Config>;

/* =========================
   Local Storage helpers
========================= */

const STORAGE_KEY = "app_config";

function getConfig(): Config | null {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function saveConfig(config: Config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

/* =========================
   Hooks
========================= */

export function useConfig() {
  return useQuery({
    queryKey: ["config"],
    queryFn: async () => {
      return getConfig();
    },
  });
}

export function useUpdateConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InsertConfig) => {
      const current = getConfig() || {};
      const updated = { ...current, ...data };

      saveConfig(updated);
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["config"] });
    },
  });
}
