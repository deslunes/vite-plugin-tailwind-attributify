
const pseudoSelectors = [
  //breakpoints
  "sm", "md", "lg", "xl", "2xl",
  "max-sm", "max-md", "max-lg", "max-xl", "max-2xl",
  
  //states
  "hover", "focus", "focus-within", "focus-visible", "active", "visited", "empty", "disabled", "enabled",
  "checked", "intermerdiate", "default", "required", "valid", "invalid", "in-range", "out-of-range",
  "placeholder-shown", "autofill", "read-only",

  //position in tree
  "first", "last", "only", "odd", "even", "first-of-type", "last-of-type", "only-of-type",

  //others
  "before", "after", "first-letter", "first-line", "marker", "selection", "file", "backdrop", "placeholder",

  //device related / media query
  "dark", "portrait", "landscape", "motion-safe", "motion-reduce", "contrast-more", "contrast-less", "print", "rtl", "ltr",

  //aria rules
  "aria-busy", "aria-checked", "aria-disabled", "aria-expanded", "aria-hidden", "aria-pressed", "aria-readonly", "aria-required", "aria-selected",

];

const dynamic = [
  "has", "min", "max", "supports"
]

export { pseudoSelectors, dynamic };