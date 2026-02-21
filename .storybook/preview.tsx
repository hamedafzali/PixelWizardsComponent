import React from "react";
import { Preview } from "@storybook/react-webpack5";
import { ThemeProvider } from "../src/themes";
import "../src/styles/global.css";

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
  },
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // @ts-ignore
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: "2rem", minHeight: "100vh" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
    direction: {
      description: "Text direction",
      defaultValue: "ltr",
      toolbar: {
        title: "Direction",
        icon: "accessibility",
        items: [
          { value: "ltr", title: "LTR", icon: "arrowright" },
          { value: "rtl", title: "RTL", icon: "arrowleft" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
