import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
  Card,
  CardContent,
  Tooltip
} from '@mui/material';
import {
  Close as CloseIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Note as NoteIcon,
  Event as EventIcon,
  Assignment as TaskIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  owner: string;
  createDate: string;
  leadStatus: string;
}

interface ContactDetailsProps {
  contact: Contact;
  onClose: () => void;
  onOpenEmailWindow: () => void;
  onOpenNoteDialog: () => void;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({
  contact,
  onClose,
  onOpenEmailWindow,
  onOpenNoteDialog
}) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Contact Details</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box mb={3}>
        <Typography variant="h5" fontWeight="bold">
          {contact.firstName} {contact.lastName}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          {contact.email}
        </Typography>
        <Box display="flex" gap={1} mt={2}>
          <Tooltip title="Add Note">
            <IconButton color="primary" onClick={onOpenNoteDialog}>
              <NoteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Send Email">
            <IconButton color="primary" onClick={onOpenEmailWindow}>
              <EmailIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Call">
            <IconButton color="primary">
              <PhoneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Schedule">
            <IconButton color="primary">
              <EventIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Create Task">
            <IconButton color="primary">
              <TaskIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />
      
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" fontWeight="bold">
              About this contact
            </Typography>
            <ExpandMoreIcon />
          </Box>
          <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: '1 1 calc(50% - 8px)' }}>
              <Typography variant="body2" color="text.secondary">
                Phone
              </Typography>
              <Typography variant="body1">
                {contact.phone}
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 calc(50% - 8px)' }}>
              <Typography variant="body2" color="text.secondary">
                Lead Status
              </Typography>
              <Chip 
                label={contact.leadStatus} 
                color={
                  contact.leadStatus === 'New' ? 'primary' : 
                  contact.leadStatus === 'Qualified' ? 'success' : 
                  'warning'
                } 
                size="small" 
              />
            </Box>
            <Box sx={{ flex: '1 1 calc(50% - 8px)' }}>
              <Typography variant="body2" color="text.secondary">
                Owner
              </Typography>
              <Typography variant="body1">
                {contact.owner}
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 calc(50% - 8px)' }}>
              <Typography variant="body2" color="text.secondary">
                Created
              </Typography>
              <Typography variant="body1">
                {contact.createDate}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold">
            Activity Timeline
          </Typography>
          <Box mt={2} display="flex" justifyContent="center" alignItems="center" height={100}>
            <Typography variant="body2" color="text.secondary">
              No activities yet
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContactDetails;
