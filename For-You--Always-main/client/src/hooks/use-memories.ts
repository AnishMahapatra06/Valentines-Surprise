import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Memory, InsertMemory } from "@/types/memory";

const STORAGE_KEY = "memories";

function getMemories(): Memory[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveMemories(memories: Memory[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
}

export function useMemories() {
  return useQuery({
    queryKey: ["memories"],
    queryFn: async () => {
      return getMemories();
    },
  });
}

export function useCreateMemory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InsertMemory) => {
      const newMemory: Memory = {
        id: crypto.randomUUID(),
        text: data.text,
        createdAt: new Date().toISOString(),
      };

      const memories = getMemories();
      saveMemories([newMemory, ...memories]);

      return newMemory;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memories"] });
    },
  });
}
