import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { http, HttpResponse } from 'msw';
import { createMemoryRouter, RouterProvider } from 'react-router';

import { UsersView, usersLoader } from './UsersView';

function UsersViewHarness() {
  const router = createMemoryRouter(
    [
      { path: '/users', Component: UsersView, loader: usersLoader },
      { path: '/user-form', Component: () => null },
      { path: '/edit-user/:id', Component: () => null },
    ],
    { initialEntries: ['/users'] }
  );
  return <RouterProvider router={router} />;
}

const meta: Meta<typeof UsersViewHarness> = {
  component: UsersViewHarness,
  title: 'Pages/UsersView',
};

export default meta;
type Story = StoryObj<typeof UsersViewHarness>;

// Uses the app's real MSW handlers (wired globally via preview.tsx), so this
// renders against the same seed data the app runs against in the browser.
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => expect(canvas.getByText('Angel Rolfson-Kulas')).toBeInTheDocument());
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [http.get('*/api/users', () => HttpResponse.json([]))],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => expect(canvas.getByText('New user')).toBeInTheDocument());
    expect(canvas.queryByText('Angel Rolfson-Kulas')).not.toBeInTheDocument();
  },
};

export const OpensDeleteConfirmation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => expect(canvas.getByText('Angel Rolfson-Kulas')).toBeInTheDocument());

    const row = canvas.getByText('Angel Rolfson-Kulas').closest('tr')!;
    await userEvent.click(within(row).getByRole('button'));

    // MUI's Popover/Menu and Dialog render through a portal to
    // document.body, outside canvasElement - query the whole document.
    await userEvent.click(await screen.findByRole('menuitem', { name: 'Delete' }));
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
    expect(screen.getByText(/DELETE operation/i)).toBeInTheDocument();
  },
};
