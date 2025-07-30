import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Paper,
  Divider,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import {
  Close as CloseIcon,
  Minimize as MinimizeIcon,
  OpenInFull as MaximizeIcon,
  ExpandMore as ExpandMoreIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';

interface EmailWindowProps {
  open: boolean;
  onClose: () => void;
  recipientEmail?: string;
}

const EmailWindow: React.FC<EmailWindowProps> = ({ open, onClose, recipientEmail = '' }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMaximized) return;
    
    if (windowRef.current && e.target === e.currentTarget) {
      setIsDragging(true);
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Handle dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isMaximized]);

  // Handle window controls
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // Handle send dropdown menu
  const handleSendClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSendMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSendNow = () => {
    // Logic to send email now
    handleSendMenuClose();
  };

  const handleSendLater = () => {
    // Logic to schedule email
    handleSendMenuClose();
  };

  if (!open) return null;

  return (
    <Paper
      ref={windowRef}
      sx={{
        position: 'fixed',
        top: isMaximized ? 0 : position.y,
        left: isMaximized ? 0 : position.x,
        width: isMaximized ? '100%' : 600,
        height: isMaximized ? '100%' : isMinimized ? 40 : 500,
        zIndex: 1300,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'height 0.2s ease-in-out'
      }}
    >
      {/* Window header/title bar */}
      <Box
        sx={{
          bgcolor: '#f0f0f0',
          p: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'move',
          userSelect: 'none',
          borderBottom: '1px solid #ddd'
        }}
        onMouseDown={handleMouseDown}
      >
        <Typography variant="subtitle1" fontWeight="medium">
          New Email
        </Typography>
        <Box>
          <IconButton size="small" onClick={handleMinimize}>
            <MinimizeIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={handleMaximize}>
            <MaximizeIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Email content */}
      {!isMinimized && (
        <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          <TextField
            label="To"
            fullWidth
            value={recipientEmail}
            margin="dense"
            size="small"
          />
          <TextField
            label="From"
            fullWidth
            value="your.email@example.com"
            margin="dense"
            size="small"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Subject"
            fullWidth
            margin="dense"
            size="small"
          />
          <Divider sx={{ my: 2 }} />
          <TextField
            label="Message"
            multiline
            rows={isMaximized ? 20 : 12}
            fullWidth
            sx={{ flexGrow: 1 }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="outlined" sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Box>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ExpandMoreIcon />}
                onClick={handleSendClick}
              >
                Send
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleSendMenuClose}
              >
                <MenuItem onClick={handleSendNow}>Send now</MenuItem>
                <MenuItem onClick={handleSendLater}>
                  <ScheduleIcon fontSize="small" sx={{ mr: 1 }} />
                  Send later
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default EmailWindow;
