import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material//Grid2';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { _posts } from '../_mock';

import { Iconify } from '../components/iconify';

import { PostItem } from '../components/blog/PostItem';
import { PostSort } from '../components/blog/PostSort';
import { PostSearch } from '../components/blog/PostSearch';

// ----------------------------------------------------------------------

export function BlogView() {
  const [sortBy, setSortBy] = useState('latest');

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  console.log(_posts)

  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Blogs
        </Typography>
        <Button
          variant="contained"
           color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New post
        </Button>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        <PostSearch posts={_posts} />
        <PostSort
          sortBy={sortBy}
          onSort={handleSort}
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Box>

      <Grid container spacing={3}>
        {_posts.map((post, index) => {
          const latestPostLarge = index === 0;
          const latestPost = index === 1 || index === 2;

          return (
            <Grid key={post.id} size={{ xs: 12, sm: (latestPostLarge ? 12 : 6), md: (latestPostLarge ? 6 : 3) }}>
              <PostItem post={post} latestPost={latestPost} latestPostLarge={latestPostLarge} />
            </Grid>
          );
        })}
      </Grid>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </>
  );
}
