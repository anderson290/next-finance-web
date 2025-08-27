'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, Add } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface WalletCardProps {
  name?: string;
  value?: string;
  logo?: string;
  color?: string;
  isEmpty?: boolean;
  onAdd?: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({
  name,
  value,
  logo,
  color,
  isEmpty = false,
  onAdd,
}) => {
  const [showValue, setShowValue] = useState(false);

  return (
    <motion.div whileHover={{ scale: 1.03 }} style={{ margin: 16 }}>
      <Card
        sx={{
          width: 360,
          height: 200,
          borderRadius: 3,
          background: color
            ? `linear-gradient(135deg, ${color}33, ${color}AA)`
            : 'linear-gradient(135deg, #333, #555)',
          color: '#fff',
          boxShadow: '0 12px 25px rgba(0,0,0,0.4)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isEmpty ? (
          <CardContent
            sx={{
              padding: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <IconButton
              onClick={onAdd}
              sx={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                border: '2px dashed rgba(255,255,255,0.6)',
                color: 'white',
              }}
            >
              <Add sx={{ fontSize: 40 }} />
            </IconButton>
          </CardContent>
        ) : (
          <CardContent
            sx={{
              padding: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box sx={{ width: 'fit-content', height: 40 }}>
                <img
                  src={logo}
                  alt={`${name} logo`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>

              <IconButton
                onClick={() => setShowValue(!showValue)}
                sx={{ color: 'white' }}
              >
                {showValue ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                fontFamily: 'monospace',
                letterSpacing: 1,
              }}
            >
              {showValue ? value : '••••••'}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ opacity: 0.8, letterSpacing: 0.5 }}
            >
              {name}
            </Typography>

            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: 24,
                width: 'calc(100% - 48px)',
                height: 2,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 1,
              }}
            />
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

export default WalletCard;
