// Mui Import

import { Box, Card, CardContent, Typography } from '@mui/material';
import MuiMarkdown from 'mui-markdown';
import { useTheme } from '@mui/material/styles';
import FillerContent from 'components/globals/FillerContent';

// Components Import
import Container from 'blocks/container/Container';
import ZestyImage from 'blocks/Image/ZestyImage';

/**
 *
 * @param {array} logoItems - array of logo items
 * @param {string} heading_text - logo heading text
 * @param {boolean} textOutside - determine if heading text will appear outside the card or inside
 *
 */

const SimpleCardLogo = ({
  logoItems = FillerContent.logos,
  heading_text = '',
  textOutside = false,
  maxWidth = 1500,
  variant = 'elevation',
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const sunsDarkLogoUrl =
    'https://kfg6bckb.media.zestyio.com/sunsdark.1fc97b3c326478bf6afcb60e52679656.png?width=241';

  // check if features_header richtext if not convert it to richtext format for consistency
  const htmlCheck = new RegExp('<("[^"]*"|\'[^\']*\'|[^\'">])*>');
  const isRichText = htmlCheck.test(heading_text);

  if (!isRichText && heading_text) {
    heading_text = `<h2>${heading_text}</h2>`;
  }

  return (
    <Box component="section">
      <Container sx={{ maxWidth: maxWidth }}>
        {textOutside && (
          <MuiMarkdown
            overrides={{
              h2: {
                component: Typography,
                props: {
                  variant: 'h4',
                  component: 'h2',
                  sx: {
                    color: theme.palette.zesty.zestyZambezi,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    mb: 4,
                  },
                },
              },
            }}
          >
            {heading_text}
          </MuiMarkdown>
        )}
        <Card
          variant={variant}
          sx={{ py: 2, border: variant === 'outlined' ? 'none' : '' }}
        >
          <CardContent>
            {!textOutside && (
              <MuiMarkdown
                overrides={{
                  h2: {
                    component: Typography,
                    props: {
                      variant: 'h4',
                      component: 'h2',
                      sx: {
                        color: theme.palette.zesty.zestyZambezi,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        mb: 4,
                      },
                    },
                  },
                }}
              >
                {heading_text}
              </MuiMarkdown>
            )}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: 3,
              }}
            >
              {logoItems?.map((item, index) => (
                <Box key={index} sx={{ display: 'flex' }}>
                  <ZestyImage
                    width={150}
                    height={45}
                    loading="lazy"
                    style={{
                      filter: isDarkMode
                        ? `${
                            item.customer_name === 'Phoenix Suns'
                              ? ''
                              : 'brightness(0%)'
                          } invert(1)`
                        : '',
                    }}
                    alt={item.customer_name || ''}
                    src={
                      item.customer_name === 'Phoenix Suns' && isDarkMode
                        ? sunsDarkLogoUrl
                        : `${item.customer_logo?.data[0].url}`
                    }
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default SimpleCardLogo;
