// MUI imports
import { Box, Grid, Typography } from '@mui/material';
import MuiMarkdown from 'markdown-to-jsx';

// Local Assets Imports
import s_curve from '../../../../public/assets/images/headless-cms/sCurve.svg';

// Components Imports
import TryFreeButton from '../../cta/TryFreeButton';
import Container from 'blocks/container/Container';

const GetStarted = ({
  isDarkMode,
  theme,
  isMobile,
  content,
  FillerContent,
}) => {
  return (
    <Box
      component="section"
      sx={{ position: 'relative', pb: 15, minHeight: 610 }}
    >
      <Container sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            margin: 'auto',
            display: isMobile ? 'none' : 'block',
            zIndex: 30,
          }}
          component="img"
          alt=""
          src={s_curve.src}
        />
        <Grid container spacing={2}>
          <Grid order={{ sm: 2, md: 1 }} item sm={12} md={6}>
            <Box
              sx={{
                display: 'block',
                margin: 'auto',
                width: '100%',
                maxWidth: 579,
              }}
              component="img"
              alt="get started graphic"
              src={content.get_started_graphic.data[0].url}
            />
          </Grid>

          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: isMobile ? 'center' : 'flex-start',
              flexDirection: 'column',
            }}
            item
            sm={12}
            md={6}
            my={isMobile ? 10 : 0}
            order={{ sm: 1, md: 2 }}
          >
            <Box>
              <MuiMarkdown
                options={{
                  overrides: {
                    h2: {
                      component: Typography,
                      props: {
                        variant: 'h4',
                        component: 'h2',
                        sx: {
                          textAlign: isMobile ? 'center' : 'left',
                          letterSpacing: 1,
                          background: theme.palette.zesty.zestyOrangeLinear,
                          WebkitBackgroundClip: 'text',
                          color: 'transparent',
                          fontWeight: 'bold',
                        },
                      },
                    },
                    span: {
                      component: Typography,
                      props: {
                        variant: 'h4',
                        component: 'h4',
                        sx: {
                          ml: isMobile ? 1 : 0,
                          fontWeight: 'bold',
                          color: isDarkMode
                            ? theme.palette.common.white
                            : theme.palette.zesty.zestyZambezi,
                        },
                      },
                    },
                  },
                }}
              >
                {content.get_started_header || FillerContent.header}
              </MuiMarkdown>
            </Box>
            <Box sx={{ width: '100%', px: isMobile ? 4 : 0, mt: 4 }}>
              <TryFreeButton
                fullWidth={isMobile}
                variant="contained"
                size="large"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default GetStarted;
