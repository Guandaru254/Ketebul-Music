// Tells TypeScript that CSS files are valid side-effect imports
// Place this file at: ketebul-frontend/css.d.ts  (project root, same level as tsconfig.json)
declare module '*.css' {
  const content: Record<string, string>
  export default content
}