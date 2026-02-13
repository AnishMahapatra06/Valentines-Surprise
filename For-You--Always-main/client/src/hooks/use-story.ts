import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* =========================
   Types (frontend-only)
========================= */

export type StorySegment = {
  id: string;
  text: string;
  createdAt: string;
};

export type InsertStory = {
  text: string;
};

/* =========================
   Local Storage helpers
========================= */

const STORAGE_KEY = "story";

function getStory(): StorySegment[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveStory(story: StorySegment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(story));
}

/* =========================
   Hooks
========================= */

export function useStory() {
  return useQuery({
    queryKey: ["story"],
    queryFn: async () => {
      return getStory();
    },
  });
}

export function useCreateStorySegment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InsertStory) => {
      const newSegment: StorySegment = {
        id: crypto.randomUUID(),
        text: data.text,
        createdAt: new Date().toISOString(),
      };

      const story = getStory();
      saveStory([...story, newSegment]);

      return newSegment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["story"] });
    },
  });
}
