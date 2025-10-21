# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## PWA support

This project is configured to generate a service worker and web manifest using `vite-plugin-pwa`.

- Build: `npm run build` will produce service-worker assets and the web manifest in the build output.
- Dev: `npm run dev` will register a service worker when available (some dev servers may not support service workers fully).
- Offline: an `offline.html` page is included under `static/` and will be used as a fallback for offline navigation.

To test fully, build and serve the `build` folder with a static server (for example `npx serve build`), then open the site in Chrome and run Lighthouse to inspect PWA status.
