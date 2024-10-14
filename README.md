# What is Vite Plugin Tailwind Attributify?

**Tailwind Attributify** is a Vite Plugin that allows the use of HTML attributes as Tailwind pseudo-selectors, aiming to reduce the length of the class attribute.

Here's an example of a heavily styled button. 

### Without Tailwind-Attributify:
```html
<a href="/"
   class="relative after:font-Inter bg-amber-50 text-amber-500 py-1 px-2 rounded-lg transition-all hover:bg-amber-100 hover:text-amber-600 hover:rounded after:content-['_↗'] after:relative after:left-0 after:bottom-0 after:text-amber-500 after:transition-all hover:after:bottom-0.5 hover:after:left-0.5 hover:after:text-amber-600">
Dummy a tag
</a>
```

### With Tailwind-Attributify:
```html
<a href="/"
   class="relative after:font-Inter bg-amber-50 text-amber-500 py-1 px-2 rounded-lg transition-all"
   hover="bg-amber-100 text-amber-600 rounded"
   after="content-['_↗'] relative left-0 bottom-0 text-amber-500 transition-all"
   hover_after="bottom-0.5 left-0.5 text-amber-600"
>
Dummy a tag
</a>
```

The goal is to make the markup more readable. Tailwind is a great tool for Atomic CSS, but merging the markup and styling in a single place can makes it more complex to read.

We often end up with more than 10 CSS classes per DOM element, and this number increases when we include responsive breakpoints and dark mode. By splitting CSS classes into multiple attributes, the space that the CSS occupies in the markup remains the same, but readability is improved.

# Features

- Supports Svelte, Vue, JSX frameworks (React, Solid...) and **Astro**
- No breaking changes, the behavior of your class or className attribute didn't change.
- Use attributes as pseudo selectors to make your CSS organized and avoid to repeat the prefix: on each CSS class.
- Supports multiple pseudo-selectors by using `_` instead of `:` (`md:hover:text-red-400` becomes `md_hover="text-red-400"`)

# How to install

## 1. Install the npm package

```
npm install vite-plugin-tailwind-attributify
```

## 2. Place the plugin in your `vite.config.ts` or `vite.config.js` **before your framework**

```ts
//vite.config.ts file
import { YOURFRAMEWORK } from '@YOUR/FRAMEWORK';
import { defineConfig } from 'vite';
import { Attributify } from 'vite-plugin-tailwind-attributify';

export default defineConfig({
	plugins: [Attributify(), YOURFRAMEWORK()]
});
```

**Astro doesn't have a `vite.config.ts` file. See below how to add Vite Plugins to Astro**
<details>
<summary>Add Tailwind Attributify to Astro !</summary>

```ts
//astro.config.mjs
import { defineConfig } from 'astro/config';
import { Attributify } from 'vite-plugin-tailwind-attributify'

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [Attributify()]
  },
  integrations: [tailwind()]
});
```

I assume you've already installed Tailwind with the `npx astro add tailwind` command that adds tailwind to your `integrations array`. What you may not have is a vite object in your defineConfig. You have to write it yourself, and add Attributify() to your plugins array. Integrations aren't Vite Plugins.
</details>

As you can see, the order is important, here we place the `Attributify` plugin first, before your framework.

## 3. Use the plugin in your `tailwind.config.ts|js|mjs` file

The automatic way is to provide the relative path to your tailwind config file (`tailwind.config.ts|js|mjs`file) in the options of the plugin in the `vite.config.ts|js` file:

```ts
//vite.config.ts file
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { Attributify } from 'vite-plugin-tailwind-attributify';

export default defineConfig({
	plugins: [
    Attributify({tailwindPath: './tailwind.config.ts'}),
    sveltekit()
  ]
});
```
**Or check the manual setup below**

<details>
<summary>Manual setup</summary>

```diff
//tailwind.config.ts file
import type { Config } from 'tailwindcss';
import { updateMarkup } from 'vite-plugin-tailwind-attributify';

export default {
- content: ['./src/**/*.{html,js,svelte,ts}'], // this value is relative to your framework
+  content: {
+    files: ['./src/**/*.{html,js,svelte,ts}'], // it's the same value
+    transform: Object.fromEntries(
+    ['tsx', 'jsx', 'svelte', 'vue'].map(ext => [ext, (content) => updateMarkup(content)])
+  )
},

  theme: {
    extend: {}
  },
  plugins: []
} as Config;
```
</details>



## 4. Add types to your codebase (for Svelte only)

You should find a `.d.ts` file in your src/ directory, add this import at the top of it.
```ts
import HTMLAttributes from 'vite-plugin-tailwind-attributify/your_framework'
```

Since Vue doesn't need it, there is only one for Svelte, React and Astro. I don't use other frameworks but if you need to, you can ask me to make a type file for your framework. I'll take some of my free time to check how to do it and update the plugin accordingly :)

This import tells your framework that the attributes we use are not syntax errors.



# How it Works

We use the `transform` Vite hook to intercept code, then apply an HTML parser to extract the attributes, check if they are pseudo-selectors, and add the corresponding classes to the class attribute. This means that the custom attributes you use to style your DOM only exist in your codebase; when the markup is sent to the client, everything is already merged into the class attribute.

We do the same on the Tailwind side because it needs to know when the class attribute is updated and has to send the CSS code related to those newly added classes.

# Credits

[Icemourne](https://github.com/Ice-mourne), who helped me a lot. We transitioned from a Svelte function to a Svelte preprocessor to a Vite plugin. I don't have much experience with JS/TS; I would still be trying to achieve that with a JavaScript function that runs at runtime if he hadn't helped me. Thanks a lot.

# What has to be done / Roadmap

- Cleanup the package.json, tailwind is not even in the list of the dependencies...
- ~~Handle the config options internally (I'd like the plugin to change your tailwind config so you don't have to, same for the type imports in the app.d.ts file)~~ Done !
- ~~React support~~ JSX frameworks supported !
- ~~Astro support !~~ Done !
- Webpack support


I typed a lot, sorry for that. Have a nice day and thank you for reading.