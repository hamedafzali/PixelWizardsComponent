import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-docs"],

  babel: (options: any) => ({
    ...options,
    presets: [
      ...options.presets,
      "@babel/preset-typescript",
      "@babel/preset-react",
    ],
  }),

  webpackFinal: async (config: any) => {
    // Add TypeScript support for .tsx files
    if (config.module && config.module.rules) {
      config.module.rules.push({
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript",
                "@babel/preset-react",
              ],
            },
          },
        ],
        exclude: /node_modules/,
      });
    }

    // Ensure .tsx files are resolved
    if (config.resolve && config.resolve.extensions) {
      config.resolve.extensions.push(".tsx", ".ts");
    }

    return config;
  },

  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop: any) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};

export default config;
