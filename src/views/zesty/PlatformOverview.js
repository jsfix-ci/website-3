/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 *
 * Label: Product Overview
 * Name: product_overview
 * Model ZUID: 6-8294d9f1a4-c1tn1n
 * File Created On: Wed Feb 23 2022 07:25:45 GMT-0800 (Pacific Standard Time)
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
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-8294d9f1a4-c1tn1n
 *
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 *
 * View /solutions/
 */

import React from 'react';
import Container from 'components/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import FullScreenHeroWithPromoImagesAndTypedText from 'blocks/heroes/FullScreenHeroWithPromoImagesAndTypedText/FullScreenHeroWithPromoImagesAndTypedText.js';
import FeaturesWithCardRepresentation from 'blocks/features/FeaturesWithCardRepresentation/FeaturesWithCardRepresentation.js';
import SimpleVerticalBlogCards from 'blocks/blog/SimpleVerticalBlogCards/SimpleVerticalBlogCards';
import VerticallyAlignedBlogCardsWithShapedImage from 'blocks/blog/VerticallyAlignedBlogCardsWithShapedImage/VerticallyAlignedBlogCardsWithShapedImage';
import CtaWithInputField from 'blocks/cta/CtaWithInputField/CtaWithInputField';
import FillerContent from 'components/globals/FillerContent';
import CircularProgressWithLabel from '@mui/material/CircularProgress';
import { useMediaQuery } from '@mui/material';
import WYSIWYGRender from 'components/globals/WYSIWYGRender';
import useFetch from 'components/hooks/useFetch';
import { zestyLink } from 'lib/zestyLink';

const ProductOverviewHeader = ({ header }) => {
  return (
    <Container>
      <Box marginBottom={4}>
        <Typography variant="h4" component="p" align={'center'} sx={{}}>
          <WYSIWYGRender
            rich_text={header}
            customClass="solutionBox"
          ></WYSIWYGRender>
        </Typography>

        <Box marginTop={2} display={'flex'} justifyContent={'center'}></Box>
      </Box>
    </Container>
  );
};

const ProductOverviewBody = ({ cards, header }) => {
  const theme = useTheme();
  const cardsList = cards || FillerContent.platformCard;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.alternate.main,
      }}
    >
      <Container>
        <Box>
          <Box
            marginBottom={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant={'h4'}
              component={'h2'}
              gutterBottom
              sx={{ fontWeight: 700 }}
              align={'center'}
            >
              {header}
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {cardsList?.map((item, i) => (
              <Grid
                data-aos="fade-up"
                data-aos-delay={i * 100}
                data-aos-offset={100}
                data-aos-duration={600}
                key={i}
                item
                container
                xs={12}
                spacing={4}
                direction={i % 2 === 1 ? 'row-reverse' : 'row'}
              >
                {/* show only if mobile image on top of text */}
                {isMobile && (
                  <Grid
                    item
                    container
                    justifyContent={'center'}
                    alignItems={'center'}
                    xs={12}
                    sm={6}
                  >
                    <Box
                      component={'img'}
                      src={
                        (item?.image?.data && item?.image?.data[0]?.url) ||
                        FillerContent.illustration_image
                      }
                      alt={item.header || item.title}
                      width={1}
                      maxWidth={'80%'}
                    />
                  </Grid>
                )}

                <Grid item container alignItems={'center'} xs={12} sm={6}>
                  <Box>
                    <Typography
                      variant={'h4'}
                      component={'h3'}
                      gutterBottom
                      sx={{ fontWeight: 700 }}
                    >
                      {item.header || item.title}
                    </Typography>
                    <Typography
                      color={'text.secondary'}
                      fontWeight={400}
                      variant={'body1'}
                    ></Typography>
                    <Typography color="text.secondary">
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: item.content || item.description,
                        }}
                      />
                    </Typography>
                  </Box>
                </Grid>

                {/* show only in Desktop alternate image and text left right arrangement  */}
                {!isMobile && (
                  <Grid
                    item
                    container
                    justifyContent={'center'}
                    alignItems={'center'}
                    xs={12}
                    sm={6}
                  >
                    <Box
                      component={'img'}
                      src={
                        (item?.image?.data && item?.image?.data[0]?.url) ||
                        FillerContent.illustration_image
                      }
                      alt={item.header || item.title}
                      width={1}
                      maxWidth={'80%'}
                    />
                  </Grid>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

function PlatformOverview({ content }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    data: allArticles,
    isPending,
    error,
  } = useFetch(
    `/-/all-articles-hydrated.json?limit=3`,
    content.zestyProductionMode,
  );

  const headerProps = {
    title: content.title || FillerContent.header,
    description: content.header_description || FillerContent.description,
    h1_title: content.h1_title || FillerContent.header,
    images: content.header_image?.data || FillerContent.image,
    cta_right_text: content.cta_right_text || FillerContent.header,
    cta_right_url:
      (content.cta_right_url &&
        zestyLink(content.navigationTree, content.cta_right_url)) ||
      zestyLink(content.navigationTree, FillerContent.contact_zuid),
  };

  return (
    <>
      {/* Header */}
      <FullScreenHeroWithPromoImagesAndTypedText {...headerProps} />

      {/* Product Overview  */}
      <>
        <ProductOverviewHeader
          header={content.benefits_header || FillerContent.rich_text}
        />
        <ProductOverviewBody
          header={content.benefits_title_h2 || FillerContent.header}
          cards={
            content.platform_overview_cards?.data || FillerContent.platformCard
          }
        />
      </>

      {/* Features */}
      <FeaturesWithCardRepresentation
        description={content.features_header || FillerContent.rich_text}
        cards={content.features_tiles?.data || FillerContent.featuresCards}
      />

      {/* Case Study  */}
      <SimpleVerticalBlogCards
        header={content.case_studies_header || FillerContent.header}
        cards={content.case_studies?.data || FillerContent.simpleCards}
        cta={
          (content.cta?.data && content.cta?.data[0]?.button_text) ||
          FillerContent.cta
        }
        cta_url={null}
      />

      {/* Industry Insights > Latest Blogs articles */}
      {isPending ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgressWithLabel />
        </Box>
      ) : (
        <VerticallyAlignedBlogCardsWithShapedImage
          title={'Industry Insights'}
          description={
            'Stay up-to-date with the latest in digital experience, content management and more.'
          }
          popularArticles={allArticles}
          ctaBtn="Read more"
          ctaUrl={/mindshare/}
        />
      )}

      {/* Final Cta  */}
      <CtaWithInputField
        title={'Subscribe to the zestiest newsletter in the industry'}
        description={
          'Get the latest from the Zesty team, from whitepapers to product updates.'
        }
        cta={'Subscribe'}
      />
    </>
  );
}

export default PlatformOverview;
