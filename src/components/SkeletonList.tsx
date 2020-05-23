import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const styles = {
  row: {
    margin: '1.5em',
    width: '95%',
  },

};


export default function SkeletonList(){
  return (
    <>
      {[1, 2, 3, 4.5, 6, 7, 8, 9, 10].map(i => (
        <Skeleton key={i} variant="rect" style={styles.row} height={40} />
      ))}
    </>
  );
};
