declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';

interface CSSModuleClasses {
  readonly [key: string]: string;
}

declare const styles: CSSModuleClasses;
export default styles;
