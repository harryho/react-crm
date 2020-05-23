import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid } from '@material-ui/core';

const styles = {
  row: {
    margin: '1.5em',
    // width: 300,
  },
};

export default function SkeletonForm() {
  return (
    <Grid container>
      {[1, 2, 3,4].map(i =>
        [1, 2, 3].map(e => (
          <Grid item xs={12} sm={4}>
            <Skeleton key={e} variant="rect" style={styles.row} height={50} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
