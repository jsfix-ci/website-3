/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 *
 * Label: Articles
 * Name: articles
 * Model ZUID: 6-45a908-qfw88c
 * File Created On: Fri Mar 04 2022 12:16:05 GMT-0800 (Pacific Standard Time)
 *
 * Model Fields:
 *
  * hero_image (images)
 * article (wysiwyg_advanced)
 * title (text)
 * description (text)
 * author (one_to_one)
 * date (date)
 * tags (one_to_many)

 *
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 *
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 *
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-45a908-qfw88c
 *
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CircularProgressWithLabel from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';

import FillerContent from 'components/FillerContent';
import BlogCTA from 'components/cta/BlogCTA';

import HeroJarallax from 'blocks/heroes/HeroJarallax';

import SidebarArticles from 'blocks/sidebars/SidebarArticles';

import SimpleVerticalBlogCards from 'blocks/blog/SimpleVerticalBlogCards/SimpleVerticalBlogCards';
import CtaWithInputField from 'blocks/cta/CtaWithInputField';

import Container from 'components/Container';
import SideBarCTA from 'components/cta/SideBarCTA';

function Article({ content }) {
  let zestyURL =
    undefined === process.env.PRODUCTION || process.env.PRODUCTION == 'true'
      ? process.env.zesty.production
      : process.env.zesty.stage;

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [isLoaded, setIsLoaded] = useState(true);
  const [latestArticles, setLatestArticles] = useState([]);
  const [tagArticles, setTagArticles] = useState([]);

  const simliarTags = content.tags?.data[0]?.meta?.zuid;

  useEffect(() => {
    try {
      const fetchData = async () => {
        setIsLoaded(true);
        const uri = `${zestyURL}/-/allarticles.json?limit=4`;
        const response = await fetch(uri);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const articles = await response.json();
        setLatestArticles(articles);
        setIsLoaded(false);
      };

      const fetchSimiliarTags = async () => {
        setIsLoaded(true);
        const url = `${zestyURL}/-/similar-articles.json?limit=3&tag=${simliarTags}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const tagArticles = await response.json();

        setTagArticles(tagArticles);
        setIsLoaded(false);
      };

      fetchData();
      fetchSimiliarTags();
    } catch (error) {
      console.error(`Could Not Find Results: ${error}`);
    }
  }, []);


  return (
    <>
      <Box>
        <HeroJarallax
          articleDate={content.date || FillerContent.date}
          title={content?.author?.data[0]?.name || FillerContent.header}
          articleAvatar={
            content?.author?.data[0]?.headshot?.data[0]?.url ||
            FillerContent.image
          }
          image={
            content.hero_image?.data
              ? content.hero_image.data[0].url
              : FillerContent.image
          }
          authorImage={
            content.author?.data[0]?.headshot?.data[0]?.url ||
            FillerContent.image
          }
          authorName={content.author?.data[0]?.name || FillerContent.header}
          authorDate={content.date || FillerContent.date}
        />
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Box
                dangerouslySetInnerHTML={{
                  __html: content.article,
                }}
              ></Box>
              <BlogCTA />
            </Grid>
            <Grid item xs={12} md={4}>
              {isMd ? (
                <Box marginBottom={4}>
                  {isLoaded ? (
                    <CircularProgressWithLabel />
                  ) : (
                    <SidebarArticles latestArticles={latestArticles} />
                  )}
                </Box>
              ) : null}

              <SideBarCTA />
            </Grid>
          </Grid>
        </Container>
        <Box
          component={'svg'}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
          sx={{
            marginBottom: -1,
            width: 1,
          }}
        >
          <path
            fill={theme.palette.alternate.main}
            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
          ></path>
        </Box>
      </Box>
      <Box bgcolor={'alternate.main'}>
        <SimpleVerticalBlogCards
          cards={tagArticles.length !== 0 ? tagArticles : latestArticles}
          title={
            tagArticles.length !== 0 ? 'Similar stories' : 'Latest articles'
          }
          cta_url={content?.cta?.data[0]?.internal_link.data[0]?.meta?.web?.url}
        />
        <CtaWithInputField />
        <Box
          component={'svg'}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
          sx={{
            marginBottom: -1,
            width: 1,
          }}
        >
          <path
            fill={theme.palette.background.paper}
            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
          ></path>
        </Box>
      </Box>

      {/* Zesty.io Output Example and accessible JSON object for this component. Delete or comment out when needed.  */}
      {/* <h1
        dangerouslySetInnerHTML={{ __html: content.meta.web.seo_meta_title }}
      ></h1>
      <div>{content.meta.web.seo_meta_description}</div>
      <div
        style={{
          background: '#eee',
          border: '1px #000 solid',
          margin: '10px',
          padding: '20px',
        }}
      >
        <h2>Accessible Zesty.io JSON Object</h2>
        <pre>{JSON.stringify(content, null, 2)}</pre>
      </div> */}
      {/* End of Zesty.io output example */}
    </>
  );
}

export default Article;
