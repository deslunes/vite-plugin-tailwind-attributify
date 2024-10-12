import { updateMarkup } from "./updateMarkup";

function randomString(length = 10 as number): string {
  return Array.from({ length }, () => Math.random().toString(36)[2]).join('');
}

function generateUniqueString(inputString: string, length = 10 as number): string {
  let uniqueString;
  do {
    uniqueString = randomString(length);
  } while (inputString.includes(uniqueString));
  return uniqueString;
}

// Fonction pour mettre à jour le JSX
function updateMarkupJSX(str: string): string {
  let ReactFragmentshittyID = generateUniqueString(str)

  str = str
  .replaceAll("<>", `<${ReactFragmentshittyID}>`)
  .replaceAll("</>", `</${ReactFragmentshittyID}>`)

  const tmp = analyzeTags(str);
  return modifyHTML(str, tmp);
}


// Interface pour représenter une balise
interface Tag {
  type: 'open' | 'close' | 'selfclosing';
  name: string;
  start: number;
  end: number;
}

interface Tag2 {
  name: string;
  start: number;
  end: number;
}

// Fonction principale pour analyser les balises d'une chaîne
function analyzeTags(input: string): Tag2[] {
  const tagList = detectTags(input);
  const sortedTags = sortTags(tagList);
  const tagAssociations = associateTags(sortedTags);
  const filteredAssociations = removeContainedStrings(tagAssociations);
  return filteredAssociations;
}

// Fonction pour détecter les balises dans une chaîne
function detectTags(str: string): Tag[] {
  const tags: Tag[] = [];
  const regex = /<\/?([a-zA-Z][\w-]*)(\b[^>]*?)(\/?)>/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(str)) !== null) {
      const tagType: 'open' | 'close' | 'selfclosing' = match[0].startsWith('</')
          ? 'close'
          : match[3] === '/'
              ? 'selfclosing'
              : 'open';

      const tag: Tag = {
          type: tagType,
          name: match[1],
          start: match.index,
          end: match.index + match[0].length - 1
      };
      tags.push(tag);
  }

  return tags;
}

// Fonction pour trier les balises par leur position de début
function sortTags(tagList: Tag[]): Tag[] {
  return tagList.sort((a, b) => a.start - b.start);
}

// Fonction pour associer les balises ouvertes et fermées
function associateTags(tagList: Tag[]): { name: string; start: number; end: number }[] {
  const tagAssociations: { name: string; start: number; end: number }[] = [];
  const stack: Tag[] = [];

  tagList.forEach(tag => {
      if (tag.type === 'open') {
          stack.push(tag);
      } else if (tag.type === 'close') {
          const openingTag = stack.pop();
          if (openingTag) {
              tagAssociations.push({
                  name: openingTag.name,
                  start: openingTag.start,
                  end: tag.end
              });
          }
      } else if (tag.type === 'selfclosing') {
          tagAssociations.push({
              name: tag.name,
              start: tag.start,
              end: tag.end
          });
      }
  });

  return tagAssociations;
}

// Fonction pour retirer les chaînes contenues
function removeContainedStrings(arr: { name: string; start: number; end: number }[]): { name: string; start: number; end: number }[] {
  return arr.filter((current) => {
      return !arr.some((other) => {
          return (
              current !== other &&
              current.start >= other.start &&
              current.end <= other.end
          );
      });
  });
}

// Fonction pour modifier les sous-chaînes dans l'entrée originale
function modifyHTML(input: string, result: { name: string; start: number; end: number }[]): string {
  let modifiedInput = input; // On travaille sur une copie de l'input original
  result.forEach(item => {
      // Extraire le substring correspondant aux indices 'start' et 'end'
      const substring = modifiedInput.slice(item.start, item.end + 1);
      // updateMarkup
      const modifiedSubstring = updateMarkup(substring);
      
      // Remplacer la sous-chaîne dans l'input original
      modifiedInput = modifiedInput.slice(0, item.start) + modifiedSubstring + modifiedInput.slice(item.end + 1);
  });
  
  // Retourner l'input modifié
  return modifiedInput;
}

export { updateMarkupJSX };