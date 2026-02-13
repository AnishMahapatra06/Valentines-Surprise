# Copilot / AI Agent Instructions — For-You--Always-main

Purpose: give AI coding agents the exact, actionable knowledge needed to make safe, small, high-value changes in this repo.

Quickstart
- **Run locally:** from the nested project root run:

  ```bash
  cd For-You--Always-main/For-You--Always-main
  npm install
  npm run dev    # starts Vite on port 5173
  ```

- **Build / Preview:**

  ```bash
  npm run build
  npm run preview
  ```

Project layout & important files
- Vite root & alias: [vite.config.ts](For-You--Always-main/For-You--Always-main/vite.config.ts#L1-L40) sets `root: client` and alias `@ -> client/src`.
- App entry: [client/src/main.tsx](For-You--Always-main/For-You--Always-main/client/src/main.tsx#L1-L40) mounts `App` inside `AudioProvider`.
- Routes / pages: [client/src/App.tsx](For-You--Always-main/For-You--Always-main/client/src/App.tsx#L1-L200) — pages are under `client/src/pages` and wrapped by `PageTransition`.
- UI primitives: `client/src/components/ui/*` contains Radix-based small components and design-system primitives used across the app.

Key patterns & data flows (be explicit when changing these)
- Content configuration: partner content is static JSON. Update text via [client/src/data/partner.json](For-You--Always-main/For-You--Always-main/client/src/data/partner.json#L1-L80). The typed accessor is [client/src/config/partner.config.ts](For-You--Always-main/For-You--Always-main/client/src/config/partner.config.ts#L1-L40) and `usePartner()` returns that object.
- Local app config: `use-config` stores UI preferences in localStorage under key `app_config` (see [client/src/hooks/use-config.ts](For-You--Always-main/For-You--Always-main/client/src/hooks/use-config.ts#L1-L200)). Use the mutation hook `useUpdateConfig()` to preserve behavior and always call `invalidateQueries` after updates.
- Network/query API: `queryClient` in [client/src/lib/queryClient.ts](For-You--Always-main/For-You--Always-main/client/src/lib/queryClient.ts#L1-L200) defines a default `queryFn` that calls `fetch(queryKey.join("/"))` with `credentials: 'include'`. Do not assume a base URL; many calls depend on the join-style `queryKey` (e.g. `useQuery({ queryKey: ['api','users'] })` fetches `api/users`).
- Audio: `AudioProvider` (see [client/src/hooks/use-audio.tsx](For-You--Always-main/For-You--Always-main/client/src/hooks/use-audio.tsx#L1-L200)) preloads a single looped audio source. The app serves static assets from `client/public` — prefer public-root paths like `/Thinking of You.mp3` when referencing audio. If changing `DEFAULT_AUDIO_SRC`, ensure the asset lives in `client/public` and verify via browser network tab.

Examples and small recipes (copy-paste safe)
- Add a new page and route:

  1. Create `client/src/pages/MyPage.tsx` exporting a React component.
  2. Add a route in `client/src/App.tsx` inside the `Switch`, wrapped by `PageTransition`:

  ```tsx
  <Route path="/my-page">
    <PageTransition>
      <MyPage />
    </PageTransition>
  </Route>
  ```

- Reference a file via the `@` alias (preferred):

  ```ts
  import Navigation from '@/components/Navigation';
  ```

  Relative import example (less preferred across large edits):

  ```ts
  import Navigation from '../../components/Navigation';
  ```

- Fixing `DEFAULT_AUDIO_SRC` (recommended change):

  - Move your `Thinking of You.mp3` into `client/public`.
  - Set `DEFAULT_AUDIO_SRC` to `/Thinking of You.mp3` (leading slash uses the public root). Verify in browser network tab.

- Example `useQuery` usage note (network composition):

  ```ts
  // will fetch 'api/user/123' because queryKey.join('/') builds the url
  useQuery({ queryKey: ['api','user','123'] });
  ```

Styling & build hints
- Tailwind is used; config files are at [tailwind.config.ts](For-You--Always-main/For-You--Always-main/tailwind.config.ts) and [postcss.config.js](For-You--Always-main/For-You--Always-main/postcss.config.js).
- CSS entry: [client/src/index.css](For-You--Always-main/For-You--Always-main/client/src/index.css#L1-L200).

Conventions to follow when modifying code
- Use the `@` alias for imports into `client/src` (e.g. `import X from '@/components/...'`).
- Content edits (text, names, birthdays, messages): prefer changing `client/src/data/partner.json` and keep `partner.config.ts` typing intact.
- UI changes: use components under `client/src/components/ui` where possible rather than creating ad-hoc elements.
- Avoid changing the Vite `root` or alias unless you update imports across the app — many imports rely on `@`.

What I did / did not find
- No test suite was detected. There are no `test` scripts in `package.json`.
- No existing agent guidance files were found — this file is being added to centralize that knowledge.

If you need to make a change
- For copy/content edits: update `client/src/data/partner.json` and visually verify at `http://localhost:5173`.
- To add a new page: add `client/src/pages/MyPage.tsx` and add a route in `client/src/App.tsx` (wrap with `PageTransition`).
- To change audio: place files in `client/public` and use public-root paths (e.g. `/Thinking of You.mp3`). Test in browser to ensure the file served correctly.
- For backend/API work (not present): be aware `queryClient` expects full URLs composed from `queryKey`. Search for `queryClient` usages before changing network behavior.

Questions for the maintainer
- Should `DEFAULT_AUDIO_SRC` use a relative public path (e.g. `/Thinking of You.mp3`) instead of the current absolute path? This file documents the current behavior; tell me if you want it changed.

If anything here is unclear or you want additional examples (routing, audio asset fixes, or safe refactors), tell me which area to expand and I'll iterate.
