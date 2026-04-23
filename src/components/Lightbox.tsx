import React from 'react';
import { 
  Dialog,
  DialogContent,
  IconButton,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface LightboxProps {
  imageSrc: string | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ imageSrc, onClose }) => {
  return (
    <Dialog
      open={!!imageSrc}
      onClose={onClose}
      maxWidth="xl"
      slotProps={{
        paper: {
          sx: {
            bgcolor: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(8px)',
            backgroundImage: 'none',
            boxShadow: 'none',
            overflow: 'visible',
            m: 2,
            borderRadius: 3
          }
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: -24,
            right: -24,
            bgcolor: '#38bdf8',
            color: '#0f172a',
            zIndex: 2,
            '&:hover': {
              bgcolor: '#7dd3fc',
              transform: 'scale(1.1) rotate(90deg)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0, overflow: 'hidden', borderRadius: 3 }}>
          {imageSrc && (
            <Box
              component="img"
              src={imageSrc}
              alt="Enlarged"
              sx={{
                display: 'block',
                maxWidth: '100%',
                maxHeight: '90vh',
                borderRadius: 2,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              }}
            />
          )}
        </DialogContent>
      </Box>
    </Dialog>
  );
};
