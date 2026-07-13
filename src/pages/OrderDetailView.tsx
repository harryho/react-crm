import { useState } from 'react';
import { useLoaderData, useRevalidator, LoaderFunctionArgs } from 'react-router';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import type { Order, User } from '../types';
import { fetchOrderById, fetchUserById, updateOrderStatus } from '../api/client';
import { Label } from '../components/label';
import ButtonGenerator from '../components/controls/Button';
import { AnalyticsOrderTimeline } from '../components/analytics/AnalyticsOrderTimeline';
import { useRouter } from '../routes/hooks/use-router';

// ----------------------------------------------------------------------

const STATUS_COLOR: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  pending: 'warning',
  paid: 'info',
  processing: 'info',
  shipped: 'info',
  delivered: 'success',
  cancelled: 'error',
};

const STATUS_TIMELINE_TYPE: Record<string, string> = {
  pending: 'order1',
  paid: 'order2',
  processing: 'order2',
  shipped: 'order3',
  delivered: 'order4',
  cancelled: 'order5',
};

const NEXT_STATUS: Record<string, string | undefined> = {
  pending: 'paid',
  paid: 'shipped',
  shipped: 'delivered',
};

export async function orderDetailLoader({ params }: LoaderFunctionArgs) {
  const order = await fetchOrderById(Number(params.id));
  const user = await fetchUserById(order.userId);
  return { order, user };
}

export default function OrderDetailView() {
  const { order, user } = useLoaderData() as { order: Order; user: User };
  const revalidator = useRevalidator();
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  const nextStatus = NEXT_STATUS[order.status];
  const canCancel = order.status === 'pending' || order.status === 'paid';

  const handleAdvance = async (status: string) => {
    setUpdating(true);
    await updateOrderStatus(order.orderId, status);
    setUpdating(false);
    revalidator.revalidate();
  };

  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Order {order.orderNumber}
        </Typography>
        <Label color={STATUS_COLOR[order.status] ?? 'default'} sx={{ mr: 2 }}>
          {order.status.toUpperCase()}
        </Label>
        <ButtonGenerator text="Back" color={"default" as any} onClick={() => router.push('/orders')} />
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Line Items
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Discount</TableCell>
                  <TableCell align="right">Line Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.variantId}>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell align="right">{item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell align="right">{item.qty}</TableCell>
                    <TableCell align="right">{(item.discount * 100).toFixed(0)}%</TableCell>
                    <TableCell align="right">{item.lineTotal.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={1} alignItems="flex-end">
              <Typography variant="body2">Subtotal: {order.currency} {order.subtotal.toFixed(2)}</Typography>
              <Typography variant="body2">Discount: -{order.currency} {order.discountTotal.toFixed(2)}</Typography>
              <Typography variant="body2">Shipping: {order.currency} {order.shippingTotal.toFixed(2)}</Typography>
              <Typography variant="subtitle1">Grand Total: {order.currency} {order.grandTotal.toFixed(2)}</Typography>
            </Stack>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Customer &amp; Shipping
            </Typography>
            <Typography variant="body2">{user.firstName} {user.lastName} ({user.email})</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {order.shipTo.name}<br />
              {order.shipTo.line1}<br />
              {order.shipTo.city}{order.shipTo.region ? `, ${order.shipTo.region}` : ''} {order.shipTo.postalCode}<br />
              {order.shipTo.countryCode}
            </Typography>

            {order.payment && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2">Payment</Typography>
                <Typography variant="body2">
                  {order.payment.provider} - {order.payment.status} - {order.payment.currency} {order.payment.amount.toFixed(2)}
                </Typography>
              </>
            )}

            {order.shipment && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2">Shipment</Typography>
                <Typography variant="body2">
                  {order.shipment.carrierName} {order.shipment.trackingNumber ? `- ${order.shipment.trackingNumber}` : ''}
                </Typography>
              </>
            )}
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <AnalyticsOrderTimeline
            title="Status Timeline"
            list={order.statusHistory.map((h, i) => ({
              id: `${order.orderId}-${i}`,
              type: STATUS_TIMELINE_TYPE[h.status] ?? 'order1',
              title: h.status.toUpperCase(),
              time: h.changedAt,
            }))}
          />

          {(nextStatus || canCancel) && (
            <Card sx={{ p: 3, mt: 3 }}>
              <CardHeader title="Actions" sx={{ p: 0, mb: 2 }} />
              <Stack spacing={1}>
                {nextStatus && (
                  <ButtonGenerator
                    text={`Advance to ${nextStatus.toUpperCase()}`}
                    disabled={updating}
                    onClick={() => handleAdvance(nextStatus)}
                  />
                )}
                {canCancel && (
                  <ButtonGenerator
                    text="Cancel Order"
                    color="error"
                    disabled={updating}
                    onClick={() => handleAdvance('cancelled')}
                  />
                )}
              </Stack>
            </Card>
          )}
        </Grid>
      </Grid>
    </>
  );
}
