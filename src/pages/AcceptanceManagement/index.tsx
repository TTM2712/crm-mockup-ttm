import { Box, Typography } from '@mui/material';

const AcceptanceManagement = () => {
  return (
    <Box sx={{ width: '100%', height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Hệ thống quản lý nghiệm thu
      </Typography>
      <Box sx={{ flex: 1, position: 'relative' }}>
        <iframe
          src="http://localhost/pos-system/login.html"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
          title="Hệ thống quản lý nghiệm thu"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        />
      </Box>
    </Box>
  );
};

export default AcceptanceManagement;
