import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Container from 'components/Container';
import FillerContent from 'components/globals/FillerContent';
import { useMediaQuery } from '@mui/material';

const mock = [
  'https://assets.maccarianagency.com/svg/logos/airbnb-original.svg',
  'https://assets.maccarianagency.com/svg/logos/amazon-original.svg',
  'https://assets.maccarianagency.com/svg/logos/fitbit-original.svg',
  'https://assets.maccarianagency.com/svg/logos/netflix-original.svg',
  'https://assets.maccarianagency.com/svg/logos/google-original.svg',
  'https://assets.maccarianagency.com/svg/logos/paypal-original.svg',
];

const LogoGridSimpleCentered = ({ title, imageCollection, description }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const images =
    imageCollection?.map(
      (e) => e.customer_logo?.data && e.customer_logo?.data[0]?.url,
    ) || mock;

  return (
    <Container>
      <Box sx={{ padding: isMobile ? '1rem 0' : '5rem 0' }}>
        <Box marginBottom={4}>
          {title && (
            <Typography
              gutterBottom
              align={'center'}
              variant={'p'}
              component={'h3'}
              fontWeight={700}
              fontSize={'24px'}
            >
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              color={'text.secondary'}
              align={'center'}
              variant={'h6'}
            >
              {description}
            </Typography>
          )}
        </Box>
        <Box
          display="flex"
          gap={isMobile ? 2 : 4}
          flexWrap="wrap"
          justifyContent={'center'}
        >
          {images?.map((item, i) => (
            <Box marginTop={2} key={i}>
              <Box component="img" src={item} alt="..." />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default LogoGridSimpleCentered;
