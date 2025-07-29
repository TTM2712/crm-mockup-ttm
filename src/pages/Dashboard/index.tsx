import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';

// Import các component con
import AIChatbot from './components/AIChatbot';
import KPIStats from './components/KPIStats';
import DynamicCharts from './components/DynamicCharts';
import SavedReports from './components/SavedReports';

const Dashboard = () => {
  const [currentQuery, setCurrentQuery] = useState<string>('');

  // Xử lý khi người dùng gửi yêu cầu báo cáo mới
  const handleGenerateReport = (query: string) => {
    console.log('Generating report for query:', query);
    setCurrentQuery(query);
    // Ở đây trong thực tế sẽ gọi API để xử lý yêu cầu và tạo báo cáo
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1e293b' }}>
          🚀 Dashboard Báo Cáo Thông Minh
        </Typography>

        {/* KPI Stats */}
        <Box sx={{ mb: 3 }}>
          <KPIStats />
        </Box>

        {/* AI Chatbot */}
        <AIChatbot onGenerateReport={handleGenerateReport} />

        {/* Grid layout cho biểu đồ và báo cáo đã lưu */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '8fr 4fr' }, gap: 3, mt: 3 }}>
          {/* Biểu đồ động */}
          <Box>
            <DynamicCharts query={currentQuery} />
          </Box>

          {/* Báo cáo đã lưu */}
          <Box>
            <SavedReports />
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            © 2025 CRM Dashboard - Powered by AI Assistant
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
