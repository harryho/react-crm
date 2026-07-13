import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { DialogsProvider } from '@toolpad/core/useDialogs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { describe, expect, it } from 'vitest';

import { UsersView, usersLoader } from './UsersView';

const theme = createTheme({ cssVariables: true, colorSchemes: { light: true, dark: true } });

function renderUsersView() {
  const router = createMemoryRouter(
    [
      { path: '/users', Component: UsersView, loader: usersLoader },
      { path: '/user-form', Component: () => null },
      { path: '/edit-user/:id', Component: () => null },
    ],
    { initialEntries: ['/users'] }
  );
  render(
    <ThemeProvider theme={theme}>
      <DialogsProvider>
        <RouterProvider router={router} />
      </DialogsProvider>
    </ThemeProvider>
  );
  return router;
}

describe('UsersView', () => {
  it('lists users fetched from the API', async () => {
    renderUsersView();

    expect(await screen.findByText('Users')).toBeInTheDocument();
    // Seed data includes this user (src/data/ecommerce/users.json)
    await waitFor(() => {
      expect(screen.getByText('Agnieszka Wojciechowska')).toBeInTheDocument();
    });
  });

  it('removes a user from the list after confirming delete', async () => {
    const user = userEvent.setup();
    renderUsersView();

    await waitFor(() => {
      expect(screen.getByText('Agnieszka Wojciechowska')).toBeInTheDocument();
    });

    const row = screen.getByText('Agnieszka Wojciechowska').closest('tr')!;
    await user.click(within(row).getByRole('button'));
    await user.click(await screen.findByRole('menuitem', { name: 'Delete' }));
    await user.click(await screen.findByRole('button', { name: /ok|confirm|yes/i }));

    await waitFor(() => {
      expect(screen.queryByText('Agnieszka Wojciechowska')).not.toBeInTheDocument();
    });
  });
});
