import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
  },
};

export default meta;

export const Default= {
  args: {
    content: "This is a tooltip",
    children: <Button>Hover me</Button>,
  },
};

export const Placements= {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        padding: "4rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooltip content="Top tooltip" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" placement="right">
        <Button>Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" placement="left">
        <Button>Left</Button>
      </Tooltip>
    </div>
  ),
};
