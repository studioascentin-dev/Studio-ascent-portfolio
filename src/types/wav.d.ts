// This file tells TypeScript that the 'wav' module exists,
// even though it doesn't have its own type definitions.
// This resolves a "Could not find a declaration file" error during build.
declare module 'wav';