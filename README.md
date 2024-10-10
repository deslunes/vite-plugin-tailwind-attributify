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

The goal is to make the markup more readable. Tailwind is a great tool for Atomic CSS, but merging the markup and styling in a single place can make it more complex to read.

We often end up with more than 10 CSS classes per DOM element, and this number increases when we include responsive breakpoints and dark mode. By splitting CSS classes into multiple attributes, the space that the CSS occupies in the markup remains the same, but readability is improved.

# Features

- Supports Svelte and Vue
- No need to use pseudo-classes and selectors in attributes; the plugin automatically adds the prefixes
- Supports multiple pseudo-selectors by using `_` instead of `:` (`md:hover:text-red-400` becomes `md_hover="text-red-400"`)
- Does not break your codebase, as the plugin does not remove the content of your class attribute; it can only add to it.

# How to install

1. Install the npm package

```
npm install vite-plugin-tailwind-attributify
```

2. Place the plugin in your `vite.config.ts` or `vite.config.js` **before your framework**

```ts
//vite.config.ts file
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { Attributify } from 'vite-plugin-tailwind-attributify';

export default defineConfig({
	plugins: [Attributify(), sveltekit()]
});
```
As you can see, the order is important, here we place the `Attributify` plugin first, before SvelteKit. It is the same for Vue or Nuxt.



3. Use the plugin in your `tailwind.config.ts|js|mjs` file

```diff
//tailwind.config.ts file
import type { Config } from 'tailwindcss';
import { updateMarkup } from 'vite-plugin-tailwind-attributify';

export default {
- content: ['./src/**/*.{html,js,svelte,ts}'],
+ content: {
+	files: ['./src/**/*.{html,js,svelte,ts}'],
+	transform: {
+	  svelte: (content) => {
+		return updateMarkup(content);
+	  }
+	}
+ },

  theme: {
    extend: {}
  },
  plugins: []
} as Config;
```

As you can see, we're taking the value of `content` and place it in `content.files`. In this case we're in a SvelteKit app so the value of `content.files.transform` is svelte, which is the extension of Svelte files. If you're using Vue, replace it with `vue`. It tells Tailwind which file he's about to transform. Just like that:

```diff
//tailwind.config.ts file
import type { Config } from 'tailwindcss';
import { updateMarkup } from 'vite-plugin-tailwind-attributify';

export default {
- content:["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
+ content: {
+	files: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
+	transform: {
+	  vue: (content) => {
+		return updateMarkup(content);
+	  }
+	}
+ },

  theme: {
    extend: {}
  },
  plugins: []
} as Config;
```



4. Add types to your codebase (for Svelte only)

add to your existing app.d.ts file in your src/ directory, or create one if needed and add this line.
```ts
import HTMLAttributes from 'vite-plugin-tailwind-attributify/svelte'
```

You can check what it does. It extends the types Svelte use to determine what attributes are allowed to be used on DOMs. the svelte.d.ts file you're importing contains a list of attributes and **dynamic** attributes that we use as pseudo selectors. That's the thing that tells Svelte to not yell at us for doing something like `<p children="text-red-400"> Dummy text</p>`. Otherwise, you would get an error because this attribute is unexpected.



# How it Works

We use the `transform` Vite hook to intercept code, then apply an HTML parser to extract the attributes, check if they are pseudo-selectors, and add the corresponding classes to the class attribute. This means that the custom attributes you use to style your DOM only exist in your codebase; when the markup is sent to the client, everything is already merged into the class attribute.

We do the same on the Tailwind side because it needs to know when the class attribute is updated and has to send the CSS code related to those newly added classes.

# Why Not React?

React requires a specific parser that wouldn't benefit Vue and Svelte users. While SvelteKit and Nuxt both use Vite, React's most commonly used meta-framework (NextJS) uses Webpack. Another package specifically for React would make more sense.

# Credits

[Icemourne](https://github.com/Ice-mourne), who helped me a lot. We transitioned from a Svelte function to a Svelte preprocessor to a Vite plugin. I don't have much experience with JS/TS; I would still be trying to achieve that with a JavaScript function that runs at runtime if he hadn't helped me. Thanks a lot.

# What has to be done / Roadmap

- Cleanup the package.json, tailwind is not even in the list of the dependencies...
- React support ? Maybe ? Some day?
- Webpack support ? Unlikely to happen tbh


I typed a lot, sorry for that. Have a nice day and thank you for reading.