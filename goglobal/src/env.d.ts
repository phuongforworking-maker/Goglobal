declare module '*.css';
declare module '*.scss';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.module.css';

interface ImportMetaEnv {
  readonly VITE_AZURE_TRANSLATOR_KEY?: string;
  readonly VITE_AZURE_REGION?: string;
  readonly VITE_PROMPT_API_KEY?: string;
  readonly VITE_SUMMARIZER_API_KEY?: string;
  // add other VITE_ variables you use here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
