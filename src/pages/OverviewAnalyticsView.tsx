import { useLoaderData } from 'react-router';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { fetchOrders, fetchProducts, fetchUsers } from '../api/client';
import { computeDashboardAnalytics } from '../utils/analytics';
import { fnCurrency } from '../utils/format-number';
import { AnalyticsOrderTimeline } from '../components/analytics/AnalyticsOrderTimeline';
import { AnalyticsWidgetSummary } from '../components/analytics/AnalyticsWidgetSummary';
import { AnalyticsTrafficBySite } from '../components/analytics/AnalyticsTrafficBySite';
import { AnalyticsCurrentSubject } from '../components/analytics/AnalyticsCurrentSubject';
import { AnalyticsConversionRates } from '../components/analytics/AnalyticsConversionRates';
import { AnalyticsWebsiteVisits } from '../components/analytics/AnalyticsWebsiteVisits';
import { AnalyticsCurrentVisits } from '../components/analytics/AnalyticsCurrentVisits';

// ----------------------------------------------------------------------

export async function analyticsLoader() {
  const [orders, products, users] = await Promise.all([fetchOrders(), fetchProducts(), fetchUsers()]);
  return computeDashboardAnalytics(orders, products, users);
}

export function OverviewAnalyticsView() {
  const analytics = useLoaderData() as Awaited<ReturnType<typeof computeDashboardAnalytics>>;

  return (
    <>
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Total Revenue"
            percent={0}
            total={analytics.totalRevenue}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{ categories: analytics.revenueByCategory.categories, series: analytics.revenueByCategory.series }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Active Users"
            percent={0}
            total={analytics.activeUsers}
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{ categories: analytics.ordersByMonth.categories, series: analytics.ordersByMonth.series }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Total Orders"
            percent={0}
            total={analytics.totalOrders}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{ categories: analytics.ordersByStatus.categories, series: analytics.ordersByStatus.series }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Low Stock SKUs"
            percent={0}
            total={analytics.lowStockCount}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{ categories: analytics.stockByCategory.categories, series: analytics.stockByCategory.lowStock }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsConversionRates
            title="Revenue by Category"
            subheader={`Total: ${fnCurrency(analytics.totalRevenue)}`}
            chart={{
              categories: analytics.revenueByCategory.categories,
              series: [{ name: 'Revenue', data: analytics.revenueByCategory.series }],
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsOrderTimeline title="Recent Order Activity" list={analytics.recentStatusChanges} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentSubject
            title="Stock by Category"
            chart={{
              categories: analytics.stockByCategory.categories,
              series: [
                { name: 'Total Stock', data: analytics.stockByCategory.totalStock },
                { name: 'Low Stock SKUs', data: analytics.stockByCategory.lowStock },
              ],
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Orders Over Time"
            subheader="Orders placed per month"
            chart={{
              categories: analytics.ordersByMonth.categories,
              series: [{ name: 'Orders', data: analytics.ordersByMonth.series }],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsTrafficBySite
            title="Top Products by Revenue"
            list={analytics.topProductsByRevenue.map((p) => ({ value: p.label, label: p.label, total: p.total }))}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Orders by Status"
            chart={{
              series: analytics.ordersByStatus.categories.map((label, i) => ({
                label,
                value: analytics.ordersByStatus.series[i],
              })),
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
