export function capitalizeName(name: string): string {
  return name.replace(/\b(\w)/g, (s) => s.toUpperCase());
}

export function randomString(length: number, chars: string): string {
  let result = '';
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export const standardID = (): string =>
  randomString(24, 'abcdefghijklmnopqrstuvwxyz0123456789');

export function toSlug(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0590-\u05FF\\-]+/g, '')
    .replace(/\\-\\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
