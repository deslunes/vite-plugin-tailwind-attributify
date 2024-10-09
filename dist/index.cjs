"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var vite_plugin_tailwind_attributify_exports = {};
__export(vite_plugin_tailwind_attributify_exports, {
  Attributify: () => Attributify,
  default: () => Attributify,
  updateMarkup: () => updateMarkup
});
module.exports = __toCommonJS(vite_plugin_tailwind_attributify_exports);
var import_node_html_parser = require("node-html-parser");
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
  const root = (0, import_node_html_parser.parse)(html);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Attributify,
  updateMarkup
});
