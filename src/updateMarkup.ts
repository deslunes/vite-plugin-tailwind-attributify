import {pseudoSelectors, dynamic } from './prefixes';
import { parse } from 'node-html-parser';


function updateMarkup(html: string, clazz = "class" as string ): string {
  const root = parse(html);

  root.querySelectorAll("*").forEach((element) => {
    Object.entries(element.attributes).forEach(([attributeName, attributeValue]) => {
      const transformedSelectors = transformAttributeName(attributeName, element);

      if (transformedSelectors) {
        addPrefixedClasses(element, attributeValue, transformedSelectors, clazz);
        element.removeAttribute(attributeName);
      }
    });
  });
  return root.toString();
}

// Transforme un nom d'attribut en une suite de sélecteurs si valide
function transformAttributeName(attributeName: string, element: any): string | null {
  const selectors = attributeName.split("_");

  const transformedSelectors = selectors.map((selector) => {
    if (!element.getAttribute(selector)) return "";

    if (pseudoSelectors.includes(selector)) return `${selector}:`;
    if (selector === "children") return "*:";

    const dynamicMatch = dynamic.find((d) => selector.startsWith(d + "-"));
    if (dynamicMatch) {
      const [dyn, value] = selector.split("-");
      return pseudoSelectors.includes(value) ? `${dyn}-[:${value}]:` : `${dyn}-[${value}]:`;
    }

    return "";
  });

  // Si un sélecteur est invalide, on retourne null
  return transformedSelectors.some((s) => s === "") ? null : transformedSelectors.join("");
}

// Ajoute les classes préfixées à l'attribut "class" de l'élément
function addPrefixedClasses(element: any, attributeValue: string, prefix: string, clazz: string) {
  const classes = attributeValue.split(" ");
  const prefixedClasses = classes.map((cls) => `${prefix}${cls}`).join(" ");
  
  const existingClass = element.getAttribute(clazz) || "";
  element.setAttribute(clazz, `${existingClass} ${prefixedClasses}`.trim());
}

export { updateMarkup };