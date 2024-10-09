# What is Vite Plugin Tailwind Attributify?

**Tailwind Attributify** is a Vite Plugin that allows the use of HTML attributes as Tailwind pseudo-selectors, aiming to reduce the length of the class attribute.

Here's an example of a heavily styled button. 

### Without Tailwind-Attributify:
```html
<p class="text-lg text-neutral-900 bg-white opacity-70 font-bold transition max-w-full dark:text-neutral-200 dark:bg-black has-[svg]:opacity-100 md:max-w-3xl md:hover:text-xl *:bg-teal-600"
   >
    <svg>dummy svg</svg>
    Dummy text
</p>
```

### With Tailwind-Attributify:
```html
<p class="text-lg text-neutral-900 bg-white opacity-70 font-bold transition max-w-full"
   dark="text-neutral-200 bg-black"
   has-svg="opacity-100"
   md="max-w-3xl"
   md_hover="text-xl" // translates to md:hover:text-xl
   children="bg-teal-600"
   >
    <svg>dummy svg</svg>
    Dummy text
</p>

The goal is to make the markup more readable. Tailwind is a great tool for Atomic CSS, but merging the markup and styling in a single place can make it more complex to read.

We often end up with more than 10 CSS classes per DOM element, and this number increases when we include responsive breakpoints and dark mode. By splitting CSS classes into multiple attributes, the space that the CSS occupies in the markup remains the same, but readability is improved.

# Features

- Supports Svelte and Vue
- No need to use pseudo-classes and selectors in attributes; the plugin automatically adds the prefixes
- Supports multiple pseudo-selectors by using `_` instead of `:` (`md:hover:text-red-400` becomes `md_hover="text-red-400"`)
- Does not break your codebase, as the plugin does not remove the content of your class attribute; it can only add to it.

# How it Works

We use the `transform` Vite hook to intercept code, then apply an HTML parser to extract the attributes, check if they are pseudo-selectors, and add the corresponding classes to the class attribute. This means that the custom attributes you use to style your DOM only exist in your codebase; when the markup is sent to the client, everything is already merged into the class attribute.

We do the same on the Tailwind side because it needs to know when the class attribute is updated and has to send the CSS code related to those newly added classes.

# Why Not React?

React requires a specific parser that wouldn't benefit Vue and Svelte users. While SvelteKit and Nuxt both use Vite, React's most commonly used meta-framework (NextJS) uses Webpack. Another package specifically for React would make more sense.

# Credits

[Icemourne](https://github.com/Ice-mourne), who helped me a lot. We transitioned from a Svelte function to a Svelte preprocessor to a Vite plugin. I don't have much experience with JS/TS; I would still be trying to achieve that with a JavaScript function that runs at runtime if he hadn't helped me. Thanks a lot.