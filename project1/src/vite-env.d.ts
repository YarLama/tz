/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '@/*';
declare module '*.svg' {
  import React from 'react';
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
