import React, { useState } from 'react';
import { useRouter } from 'next/router';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import Container from 'components/Container';
import TopNav from 'components/TopNav';

import { Topbar, Sidebar, Footer } from './components';

const Main = ({
  children,
  customRouting,
  colorInvert = false,
  bgcolor = 'transparent',
  url = '',
}) => {
  const router = useRouter();

  const hasRouting = customRouting !== undefined ? true : false;
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 38,
  });

  let pageNavColorRegex = new RegExp(/mindshare|authors|blog/gi);

  console.log('🚀 ~ file: Main.js ~ line 25 ~ router', router.asPath);

  const routerColorInvert = {
    '/mindshare/': '/mindshare/',
    '/mindshare/developer-how-tos/': '/mindshare/developer-how-tos/',
    'mindshare/authors/': 'mindshare/authors/',
  };

  console.log(" davey here ", routerColorInvert[router.asPath]);
  console.log(" davey router object ", router);

  // url?.match(pageNavColorRegex) !== null

  return (
    <Box>
      <Box bgcolor={bgcolor} position={'relative'} zIndex={theme.zIndex.appBar}>
        <Container paddingTop={'8px !important'} paddingBottom={'0 !important'}>
          <TopNav
            colorInvert={
              routerColorInvert[router.asPath]
                ? colorInvert
                : routerColorInvert[router.asPath] === '/mindshare/'
                ? !colorInvert
                : colorInvert
            }
          />
        </Container>
      </Box>
      <AppBar
        position={'sticky'}
        sx={{
          top: 0,
          backgroundColor: trigger ? theme.palette.background.paper : bgcolor,
        }}
        elevation={trigger ? 1 : 0}
      >
        <Container paddingY={1}>
          <Topbar
            onSidebarOpen={handleSidebarOpen}
            customRouting={hasRouting ? customRouting : []}
            colorInvert={
              routerColorInvert[router.asPath]
                ? false
                : routerColorInvert[router.asPath] === '/mindshare/'
                ? true
                : colorInvert
            }
          />
        </Container>
      </AppBar>
      <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant="temporary"
        customRouting={hasRouting ? customRouting : []}
      />
      <main>
        {children}
        <Divider />
      </main>
      <Footer
        colorInvert={colorInvert}
        customRouting={hasRouting ? customRouting : []}
      />
    </Box>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  routing: PropTypes.array,
  colorInvert: PropTypes.bool,
  bgcolor: PropTypes.string,
};

export default Main;
