import { Fab } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import AddIcon from "@mui/icons-material/Add";

const meta: Meta = {
  title: "Theme",
};

export default meta;

type Story = StoryObj<any>;

export const FabPrimary: Story = {
  render: () => <Fab />,
};

export const FabSmall: Story = {
  render: () => <Fab size="small" />,
};

export const FabWithIcon: Story = {
  render: () => (
    <Fab size="small">
      <AddIcon fontSize="large" />
    </Fab>
  ),
};
