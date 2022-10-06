import React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MuiMarkdown from 'mui-markdown';
import Container from 'components/Container';
import Star from '../../../../public/assets/images/homepage/star.svg';
import ZestyImage from 'blocks/Image/ZestyImage';

const WithHighlightedCard = ({ title, data }) => {
  const theme = useTheme();

  const testimonialData = data.map((item) => {
    return {
      feedback: item.review,
      name: item.reviewer_name,
      title: item.reviewer_title,
      avatar: item.reviewer_headshot.data[0].url,
      star_rating: parseInt(item.star_rating),
    };
  });

  console.log(data);

  return (
    <Container>
      <Box sx={{ mt: 15 }}>
        <Box sx={{ my: 5 }}>
          <MuiMarkdown
            overrides={{
              h1: {
                component: Typography,
                props: {
                  component: 'h2',
                  variant: 'h4',
                  sx: {
                    textAlign: 'left !important',
                    color: theme.palette.zesty.zestyZambezi,
                    fontWeight: 'bold',
                  },
                },
              },
              p: {
                component: Typography,
                props: {
                  component: 'p',
                  variant: 'h6',
                  sx: {
                    textAlign: 'left !important',
                    color: theme.palette.zesty.zestyZambezi,
                  },
                },
              },
            }}
          >
            {title}
          </MuiMarkdown>
        </Box>
        <Grid container spacing={4}>
          {testimonialData.map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box
                width={1}
                height={1}
                component={Card}
                display={'flex'}
                flexDirection={'column'}
                boxShadow={i === 1 ? 4 : 0}
                bgcolor={i === 1 ? 'primary.main' : 'none'}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box marginBottom={1}>
                    <Box display={'flex'} justifyContent={'flex-start'}>
                      {[1, 2, 3, 4, 5].map(() => (
                        <ZestyImage
                          width={20}
                          height={20}
                          style={{ paddingLeft: 0.5, paddingRight: 0.5 }}
                          loading="lazy"
                          src={Star.src}
                          alt="star rating"
                        />
                      ))}
                    </Box>
                  </Box>
                  <Typography
                    color={
                      i === 1 ? theme.palette.common.white : 'text.secondary'
                    }
                  >
                    {item.feedback}
                  </Typography>
                </CardContent>
                <Box flexGrow={1} />
                <CardActions sx={{ paddingBottom: 2 }}>
                  <ListItem component="div" disableGutters sx={{ padding: 0 }}>
                    <ListItemAvatar>
                      <Avatar src={item.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ margin: 0 }}
                      primary={item.name}
                      secondary={item.title}
                      primaryTypographyProps={{
                        color:
                          i === 1 ? theme.palette.common.white : 'text.primary',
                      }}
                      secondaryTypographyProps={{
                        color:
                          i === 1
                            ? theme.palette.common.white
                            : 'text.secondary',
                      }}
                    />
                  </ListItem>
                </CardActions>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default WithHighlightedCard;
