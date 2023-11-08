import type { Meta, StoryObj } from "@storybook/react";
import Chooser from "./Chooser";
import ChooserActions from "./ChooserActions";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageCard from "./ImageCard";

const meta: Meta<typeof Chooser> = {
  component: Chooser,
};

export default meta;
type Story = StoryObj<typeof Chooser>;

export const Primary: Story = {
  args: {},
};

export const PrimaryWithAction: Story = {
  args: {
    children: (
      <ChooserActions>
        <Fab>
          <AddIcon fontSize="large" />
        </Fab>
      </ChooserActions>
    ),
  },
};

export const PopulatedWithAction: Story = {
  args: {
    children: (
      <ChooserActions populated={true}>
        <Fab>
          <AddIcon fontSize="large" />
        </Fab>
      </ChooserActions>
    ),
  },
};

export const PopulatedWithImage: Story = {
  args: {
    children: (
      <>
        <ImageCard src="https://image.smythstoys.com/original/desktop/191259_2.jpg" label="PlayStation 5" />
        <ChooserActions populated={true}>
          <Fab>
            <AddIcon fontSize="large" />
          </Fab>
        </ChooserActions>
      </>
    ),
  },
};
