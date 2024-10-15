/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    // Añade otras variables de entorno aquí si es necesario
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  