import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItemText from '@mui/material/ListItemText';
import CardMedia from '@mui/material/CardMedia';

import Container from 'components/Container';

const mock = [
  {
    name: 'Chary Smith',
    title: 'SEO at Comoti',
    avatar: 'https://assets.maccarianagency.com/avatars/img3.jpg',
  },
  {
    name: 'Clara Bertoletti',
    title: 'Junior Designer',
    avatar: 'https://assets.maccarianagency.com/avatars/img4.jpg',
  },
  {
    name: 'Jhon Anderson',
    title: 'Senior Frontend Developer',
    avatar: 'https://assets.maccarianagency.com/avatars/img5.jpg',
  },
  {
    name: 'Chary Smith',
    title: 'SEO at Comoti',
    avatar: 'https://assets.maccarianagency.com/avatars/img6.jpg',
  },
];

const WithOverlappedCards = ({list=[]}) => {
  const theme = useTheme();
  return (
    <Container>
      <Box>
        <Box marginBottom={4}>
          <Typography
            sx={{
              textTransform: 'uppercase',
            }}
            gutterBottom
            color={'text.secondary'}
            align={'center'}
            fontWeight={700}
          >
            Case Studies
          </Typography>
          <Typography fontWeight={700} variant={'h4'} align={'center'}>
            Trust the professionals
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {list.map((item, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card
                sx={{
                  boxShadow: 0,
                  background: 'transparent',
                  backgroundImage: 'none',
                }}
              >
              <Box 
                component={'a'}
                href={item.meta.web.url}
                display={'block'}
                width={1}
                height={1}
                sx={{
                  textDecoration: 'none',
                  transition: 'all .2s ease-in-out',
                  '&:hover': {
                    transform: `translateY(-${theme.spacing(1 / 2)})`,
                  },
                }}
                >
                <Box
                  component={CardMedia}
                  borderRadius={2}
                  width={1}
                  height={1}
                  minHeight={320}
                  image={item.hero_image.data[0].url}
                />
                <Box
                  component={CardContent}
                  bgcolor={'transparent'}
                  marginTop={-5}
                >
                  <Box component={Card}>
                    <CardContent>
                      <ListItemText
                        primary={item.title}
                        //*secondary={item.description}
                      />
                    </CardContent>
                  </Box>
                </Box>
              </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default WithOverlappedCards;
