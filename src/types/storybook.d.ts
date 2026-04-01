declare module 'storybook' {
  export interface StorybookConfig {
    stories?: string[];
    addons?: string[];
    framework?: unknown;
    docs?: unknown;
    typescript?: unknown;
    [key: string]: unknown;
  }
}
