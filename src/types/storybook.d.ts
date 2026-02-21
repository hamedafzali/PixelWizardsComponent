declare module 'storybook' {
  export interface StorybookConfig {
    stories?: string[];
    addons?: string[];
    framework?: any;
    docs?: any;
    typescript?: any;
    [key: string]: any;
  }
}
