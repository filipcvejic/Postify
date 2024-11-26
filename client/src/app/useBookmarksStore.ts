import { handleApiError, postifyApi } from "@/api/postifyApi";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookmarksState {
  bookmarks: string[];
  setBookmarks: (bookmarks: string[]) => void;
  savePost: (postId: string) => Promise<void>;
  unsavePost: (postId: string) => Promise<void>;
}

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      setBookmarks: (bookmarks) => set({ bookmarks }),
      savePost: async (postId: string) => {
        // await postifyApi
        //   .post(`/posts/${postId}/save`)
        //   .then(() => set({ bookmarks: [...get().bookmarks, postId] }))
        //   .catch(handleApiError);
        const bookmarks = get().bookmarks;

        if (!bookmarks.includes(postId))
          set({ bookmarks: [...bookmarks, postId] });
      },
      unsavePost: async (postId: string) => {
        await postifyApi
          .post(`/posts/${postId}/unsave`)
          .then(() =>
            set({
              bookmarks: get().bookmarks.filter(
                (bookmark) => bookmark !== postId
              ),
            })
          )
          .catch(handleApiError);
      },
    }),
    {
      name: "bookmarks",
      partialize: (state) => ({ bookmarks: state.bookmarks }),
    }
  )
);
