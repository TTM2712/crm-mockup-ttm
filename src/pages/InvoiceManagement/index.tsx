import { Box, Typography, Paper } from '@mui/material';

const InvoiceManagement = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Quản lý Hóa đơn
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography>Nội dung quản lý hóa đơn sẽ được cập nhật sau</Typography>
      </Paper>
    </Box>
  );
};

export default InvoiceManagement;
