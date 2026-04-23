import React from 'react';
import { 
  Dialog,
  DialogContent,
  IconButton,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface LightboxProps {
  image: string;
  onClose: () => void;
  basePath: string;
}

export const Lightbox: React.FC<LightboxProps> = ({ image, onClose, basePath }) => {
  const imageUrl = image.includes('ability-cards') || image.startsWith('fh-')
    ? `${basePath}/ability-cards/${image}`
    : `${basePath}/${image}`;

  return (
    <Dialog
      open={!!image}
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
            '&:hover': {
              bgcolor: '#7dd3fc',
              transform: 'scale(1.1) rotate(90deg)',
            },
            transition: 'all 0.2s ease',
            zIndex: 1
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          <Box
            component="img"
            src={imageUrl}
            alt="Enlarged"
            sx={{
              display: 'block',
              maxWidth: '100%',
              maxHeight: '90vh',
              borderRadius: 3,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          />
        </DialogContent>
      </Box>
    </Dialog>
  );
};
