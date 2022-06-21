/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 *
 * Label: Clients
 * Name: clients
 * Model ZUID: 6-f4e585eec4-98pz6d
 * File Created On: Thu Mar 03 2022 11:31:37 GMT-0800 (Pacific Standard Time)
 *
 * Model Fields:
 *
  * title (text)

 *
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 *
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 *
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-f4e585eec4-98pz6d
 *
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Container from 'components/Container';

import Stories from 'blocks/portfolioGrid/Stories/Stories';
import PartnersColor from 'blocks/logoGrid/PartnersColor/PartnersColor';
import ShowcaseBgImagePage from 'blocks/heroes/ShowcaseBgImage/ShowcaseBgImage';
import CtaSimpleCentered from 'blocks/cta/CtaSimpleCentered/CtaSimpleCentered';
import FillerContent from 'components/globals/FillerContent';

function Client({ content }) {
  const theme = useTheme();
  return (
    <>
      <Box>
        <Box
          position={'relative'}
          sx={{
            backgroundColor: theme.palette.alternate.main,
            backgroundImage: `linear-gradient(120deg, ${theme.palette.background.paper} 0%, ${theme.palette.alternate.main} 100%)`,
            marginTop: -13,
            paddingTop: 13,
          }}
        >
          <Container zIndex={3} position={'relative'}>
            <Container marginLeft={'0 !important'}>
              <Box>
                <Box>
                  <Typography variant="h3" gutterBottom>
                    {content.title || FillerContent.header}
                  </Typography>
                  <Typography variant="h3" color={'primary'} fontWeight={700}>
                    {content.description || FillerContent.header}
                  </Typography>
                </Box>
              </Box>
            </Container>
          </Container>
          <Box
            component={'svg'}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 1920 100.1"
            width={1}
            marginBottom={-1}
            position={'relative'}
            zIndex={2}
          >
            <path
              fill={theme.palette.background.paper}
              d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
            ></path>
          </Box>
        </Box>
        <Box position={'relative'} zIndex={3} marginTop={{ xs: 0, md: -22 }}>
          <Container>
            <PartnersColor
              partnerLogos={content?.logos?.data || FillerContent.photos}
            />
          </Container>
        </Box>
        <Container>
          <Box>
            <Box marginBottom={4}>
              <ShowcaseBgImagePage
                image={
                  content?.showcase_background_image?.data[0]?.url ||
                  FillerContent.image
                }
                showCase={content.showcase || FillerContent.header}
                description={
                  content.showcase_description || FillerContent.description
                }
                showCaseCTA={
                  content.showcase_cta_link_title || FillerContent.header
                }
                showCaseLink={
                  content.showcase_cta_link?.data[0]?.meta?.web?.uri ||
                  FillerContent.href
                }
              />
            </Box>
          </Box>
        </Container>
        <Container>
          <Stories
            eyeBrow={content.client_eyebrow || FillerContent.header}
            clientTitle={content.client_title || FillerContent.header}
            clientInfo={
              content.client_cards.data || FillerContent.missingDataArray
            }
          />
        </Container>
        <Box bgcolor={theme.palette.alternate.main}>
          <CtaSimpleCentered
            ctaTitle={content.cta_title || FillerContent.header}
            description={content.cta_description || FillerContent.description}
            ctaLeft={content.cta_left || FillerContent.cta}
            ctaRight={content.cta_right || FillerContent.cta}
          />
        </Box>
      </Box>
    </>
  );
}

export default Client;
