// ThisForm
export function pascalcase(s: string): string {
  // Replace underscores and spaces, and capitalize the first character
  return s
    .replace(/(_|\s)+/g, ' ')               // Replace underscores and spaces with a single space
    .split(' ')                             // Split by spaces to process each word
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join('');                              // Join the words without spaces
}
// thisForm
export function camelcase(s: string): string {
  return s.replace('_', '').replace(' ', '');
}
// this_form
export function underscore(s: string): string {
  return s.replace(' ', '_').toLowerCase();
}