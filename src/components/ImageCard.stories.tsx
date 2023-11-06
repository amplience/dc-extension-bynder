import type { Meta, StoryObj } from "@storybook/react";
import ImageCard from "./ImageCard";

const meta: Meta<typeof ImageCard> = {
  component: ImageCard,
};

export default meta;
type Story = StoryObj<typeof ImageCard>;

export const Primary: Story = {
  args: {
    src: "https://image.smythstoys.com/original/desktop/191259_2.jpg",
    label: "PlayStation 5",
    style: {
      maxWidth: "300px",
    },
  } as any,
};

export const PrimaryWithLongLabel: Story = {
  args: {
    src: "https://image.smythstoys.com/original/desktop/191259_2.jpg",
    label: "PlayStation 5 testing a very very very very very long label",
    style: {
      maxWidth: "300px",
    },
  } as any,
};
