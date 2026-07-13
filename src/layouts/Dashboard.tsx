import * as React from 'react';
import { Navigate, Outlet, useLocation, useNavigation } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import LinearProgress from '@mui/material/LinearProgress';
import { AccountPopover } from './components/AccountPopover';
import { varAlpha } from '../theme/styles';
import { lightPalette as palette } from '../theme/core/palette';

export default function Layout() {
  const navigation = useNavigation();

  return (
    <DashboardLayout sx={{ backgroundColor: varAlpha(palette.grey['500Channel'], 0.08) }}
      slots={{
        toolbarAccount: AccountPopover
      } as TODO}
    >
      {navigation.state === 'loading' && (
        <LinearProgress sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: (theme) => theme.zIndex.appBar + 1 }} />
      )}
      <PageContainer title="" breadcrumbs={[]} >
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
