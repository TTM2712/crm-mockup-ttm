import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button, IconButton, Snackbar, Alert } from '@mui/material';
import { Add } from '@mui/icons-material';

// Tab value
type ContractAppendicesTab = 'templates' | 'appendices';

// Interface for appendix template
interface AppendixTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// Interface for contract appendix
interface ContractAppendix {
  id: string;
  name: string;
  contractId: string;
  contractName: string;
  status: 'draft' | 'pending' | 'signed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

const ContractAppendices: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<ContractAppendicesTab>('templates');
  const [templates, setTemplates] = useState<AppendixTemplate[]>([]);
  const [appendices, setAppendices] = useState<ContractAppendix[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({ open: false, message: '', severity: 'success' });

  const handleTabChange = (event: React.SyntheticEvent, newValue: ContractAppendicesTab) => {
    setCurrentTab(newValue);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Tải dữ liệu khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for templates
        const mockTemplates: AppendixTemplate[] = [
          {
            id: '1',
            name: 'Phụ lục gia hạn hợp đồng',
            description: 'Mẫu phụ lục gia hạn thời gian hợp đồng',
            type: 'extension',
            status: 'active',
            createdAt: '2025-06-30T10:00:00Z',
            updatedAt: '2025-06-30T10:00:00Z',
            createdBy: 'Nguyễn Văn A'
          },
          {
            id: '2',
            name: 'Phụ lục thay đổi giá trị',
            description: 'Mẫu phụ lục thay đổi giá trị hợp đồng',
            type: 'value',
            status: 'active',
            createdAt: '2025-06-29T15:30:00Z',
            updatedAt: '2025-06-29T15:30:00Z',
            createdBy: 'Trần Thị B'
          }
        ];
        
        // Mock data for appendices
        const mockAppendices: ContractAppendix[] = [
          {
            id: 'PL001',
            name: 'Phụ lục gia hạn HĐ-001',
            contractId: 'HĐ-001',
            contractName: 'Hợp đồng mua bán thiết bị',
            status: 'signed',
            createdAt: '2025-07-01T09:00:00Z',
            updatedAt: '2025-07-01T14:30:00Z',
            createdBy: 'Nguyễn Văn A'
          },
          {
            id: 'PL002',
            name: 'Phụ lục thay đổi giá trị HĐ-002',
            contractId: 'HĐ-002',
            contractName: 'Hợp đồng cung cấp dịch vụ',
            status: 'draft',
            createdAt: '2025-07-02T10:15:00Z',
            updatedAt: '2025-07-02T10:15:00Z',
            createdBy: 'Trần Thị B'
          }
        ];
        
        setTemplates(mockTemplates);
        setAppendices(mockAppendices);
      } catch (error) {
        console.error('Error loading data:', error);
        setSnackbar({
          open: true,
          message: 'Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Quản lý phụ lục hợp đồng
        </Typography>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange}
          aria-label="contract appendices tabs"
        >
          <Tab label="Mẫu phụ lục hợp đồng" value="templates" />
          <Tab label="Phụ lục hợp đồng" value="appendices" />
        </Tabs>
      </Box>
      
      {currentTab === 'templates' ? (
        <Paper sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6" gutterBottom>
              Danh sách mẫu phụ lục hợp đồng
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<Add />}
            >
              Tạo mẫu phụ lục mới
            </Button>
          </Box>
          
          {loading ? (
            <Typography color="textSecondary" paragraph>
              Đang tải danh sách mẫu phụ lục...
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã</TableCell>
                    <TableCell>Tên mẫu phụ lục</TableCell>
                    <TableCell>Mô tả</TableCell>
                    <TableCell>Loại</TableCell>
                    <TableCell>Ngày tạo</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow 
                      key={template.id} 
                      hover 
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>{template.id}</TableCell>
                      <TableCell>{template.name}</TableCell>
                      <TableCell>{template.description}</TableCell>
                      <TableCell>{template.type}</TableCell>
                      <TableCell>{new Date(template.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Chip 
                          label={template.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                          color={template.status === 'active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary">
                          <Add />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      ) : (
        <Paper sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6" gutterBottom>
              Danh sách phụ lục hợp đồng
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<Add />}
            >
              Tạo phụ lục mới
            </Button>
          </Box>
          
          {loading ? (
            <Typography color="textSecondary" paragraph>
              Đang tải danh sách phụ lục hợp đồng...
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã PL</TableCell>
                    <TableCell>Tên phụ lục</TableCell>
                    <TableCell>Mã HĐ</TableCell>
                    <TableCell>Tên hợp đồng</TableCell>
                    <TableCell>Ngày tạo</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appendices.map((appendix) => (
                    <TableRow 
                      key={appendix.id} 
                      hover 
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>{appendix.id}</TableCell>
                      <TableCell>{appendix.name}</TableCell>
                      <TableCell>{appendix.contractId}</TableCell>
                      <TableCell>{appendix.contractName}</TableCell>
                      <TableCell>{new Date(appendix.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Chip 
                          label={
                            appendix.status === 'signed' ? 'Đã ký' :
                            appendix.status === 'pending' ? 'Chờ ký' :
                            appendix.status === 'draft' ? 'Bản nháp' :
                            'Đã hủy'
                          }
                          color={
                            appendix.status === 'signed' ? 'success' :
                            appendix.status === 'pending' ? 'warning' :
                            appendix.status === 'draft' ? 'info' :
                            'error'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary">
                          <Add />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      )}
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContractAppendices;
