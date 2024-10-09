// index.ts
import { parse } from "node-html-parser";
var pseudoSelectors = [
  //breakpoints
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "max-sm",
  "max-md",
  "max-lg",
  "max-xl",
  "max-2xl",
  //states
  "hover",
  "focus",
  "focus-within",
  "focus-visible",
  "active",
  "visited",
  "empty",
  "disabled",
  "enabled",
  "checked",
  "intermerdiate",
  "default",
  "required",
  "valid",
  "invalid",
  "in-range",
  "out-of-range",
  "placeholder-shown",
  "autofill",
  "read-only",
  //position in tree
  "first",
  "last",
  "only",
  "odd",
  "even",
  "first-of-type",
  "last-of-type",
  "only-of-type",
  //others
  "before",
  "after",
  "first-letter",
  "first-line",
  "marker",
  "selection",
  "file",
  "backdrop",
  "placeholder",
  //device related / media query
  "dark",
  "portrait",
  "landscape",
  "motion-safe",
  "motion-reduce",
  "contrast-more",
  "contrast-less",
  "print",
  "rtl",
  "ltr",
  //aria rules
  "aria-busy",
  "aria-checked",
  "aria-disabled",
  "aria-expanded",
  "aria-hidden",
  "aria-pressed",
  "aria-readonly",
  "aria-required",
  "aria-selected"
];
var dynamic = [
  "has",
  "min",
  "max",
  "supports"
];
function Attributify() {
  return {
    name: "vite-plugin-tailwind-attributify",
    enforce: "pre",
    async transform(code, id) {
      if (!/\.(svelte|vue)$/.test(id)) return code;
      return updateMarkup(code);
    }
  };
}
function updateMarkup(html) {
  const root = parse(html);
  root.querySelectorAll("*").forEach((element) => {
    const attributes = element.attributes;
    Object.keys(attributes).forEach((attributeName) => {
      const selectors = attributeName.split("_");
      let isValidSelector = true;
      const transformedSelectors = selectors.map((selector) => {
        if (element.getAttribute(selector) == "") {
          isValidSelector = false;
          return "";
        } else if (pseudoSelectors.includes(selector)) {
          return `${selector}:`;
        } else if (selector === "children") {
          return "*:";
        } else if (dynamic.some((d) => selector.startsWith(d + "-"))) {
          const [dyn, value] = selector.split("-");
          if (pseudoSelectors.includes(value)) {
            return `${dyn}-[:${value}]:`;
          } else {
            return `${dyn}-[${value}]:`;
          }
        } else {
          isValidSelector = false;
          return "";
        }
      });
      if (isValidSelector) {
        const attributeValue = attributes[attributeName];
        if (attributeValue) {
          const classes = attributeValue.split(" ");
          const prefixedClasses = classes.map((cls) => transformedSelectors.join("") + cls).join(" ");
          const existingClass = element.getAttribute("class") || "";
          element.setAttribute("class", `${existingClass} ${prefixedClasses}`.trim());
        }
        element.removeAttribute(attributeName);
      }
    });
  });
  return root.toString();
}
export {
  Attributify,
  Attributify as default,
  updateMarkup
};
