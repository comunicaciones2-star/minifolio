/**
 * Prepend basePath to local asset URLs.
 * Required for static export (output: "export") — Next.js does not
 * automatically apply basePath to <Image> src in this mode.
 */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
