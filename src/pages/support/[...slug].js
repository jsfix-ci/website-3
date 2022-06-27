import React from 'react';

// cookie access
import { getUserAppSID } from 'utils';
import { getCookie } from 'cookies-next';

// components
import Main from 'layouts/Main';
import AppBar from 'components/console/AppBar';
import Head from 'next/head';

// MUI imports
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// filler content based on docs build
const zestyImage =
  'https://kfg6bckb.media.zestyio.com/zesty-share-image-generic.png?width=1200';

export default function Support({ content, navigationCustom }) {
  // will content be passed if not connected to a Model
  console.log(content);

  // check if the content object will have meta information if it is passed
  // **if so, updated the metaObj with the correct content key value pair
  const metaObj = {
    title: content?.meta ? content.meta.title : 'Zesty Support',
    description: content?.meta
      ? content.meta.description
      : 'Support Portal for Zesty Clients',
    ogImage: content?.meta ? content.meta.data[0].url : zestyImage,
  };

  //   testing new cookies
  const userinfo = {
    zuid: getCookie('APP_USER_ZUID'),
    firstName: getCookie('APP_USER_FIRST_NAME'),
    lastName: getCookie('APP_USER_LAST_NAME'),
    email: getCookie('APP_USER_EMAIL'),
    appSid: getCookie('APP_SID'),
  };
  //   comes back undefined -- need to know how to pass log in creds in localhost???
  console.log(userinfo);

  // are we using main the same way docs is using Main or will we need to build out our own
  return (
    <Main customRouting={navigationCustom}>
      <Head>
        <title>{metaObj.title}</title>
        <meta property="og:title" content={metaObj.title} />
        <meta name="description" value={metaObj.description} />
        <meta property="og:description" content={metaObj.description} />
        <meta property="og:image" content={metaObj.ogImage} />
      </Head>
      <AppBar />
      <Container></Container>
    </Main>
  );
}
