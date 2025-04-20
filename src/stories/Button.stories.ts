// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';


import { Button , ButtonProps} from '../components/sb/Button';


const meta: Meta<typeof Button> = {
    title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    style: {
      color: String,
      margin: String,
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {  onClick: undefined }
};

export default meta;
type Story = StoryObj<typeof Button>;



export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};


export const Secondary: Story = {
  args: {
    primary: false,
    style: {
      color: 'orange',
      margin: '1em',
    },
    label: 'Button',
  },
};


export const Large : Story = {
  args: {
    size: 'large',
    style: {
      color: 'navy',
      margin: '1em',
    },
    label: 'Button',
  },
};

export const Small : Story = {
  args: {
    size: 'small',
    style: {
      color: 'red',
      margin: '1em',
    },
    label: 'Button',
  },
};