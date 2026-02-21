import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Alert } from "./Alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
  },
};

export default meta;

export const Info = {
  args: {
    status: "info",
    title: "Information",
    description: "This is an informational alert message.",
  },
};

export const Success = {
  args: {
    status: "success",
    title: "Success",
    description: "Your action was completed successfully!",
  },
};

export const Warning = {
  args: {
    status: "warning",
    title: "Warning",
    description: "Please be careful with this action.",
  },
};

export const Error = {
  args: {
    status: "error",
    title: "Error",
    description: "Something went wrong. Please try again.",
  },
};

export const Dismissable = {
  render: () => {
    const [show, setShow] = useState(true);
    if (!show) return <button onClick={() => setShow(true)}>Show Alert</button>;
    return (
      <Alert
        status="info"
        title="Dismissable Alert"
        description="Click the X button to dismiss this alert."
        closable
        onClose={() => setShow(false)}
      />
    );
  },
};
