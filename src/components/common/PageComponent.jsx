import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function PageComponent() {
  return (
      <Stack spacing={2} justifyContent="center" alignItems="center">
        <Pagination count={10} variant="outlined" color="primary" />
      </Stack>
  );
}

export default PageComponent;