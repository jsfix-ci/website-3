import {
  Button,
  Drawer,
  Grid,
  Stack,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useDebounce from 'components/hooks/useDebounce';
import React, { useState, useEffect, useContext } from 'react';
import { MarketplaceContext } from './MarketplaceContext';
import MarketplaceSidebar from './MarketplaceSidebar';
import CustomContainer from 'components/Container';
import { TitleBar } from './TitleBar';

//for refactor
const marketManage = [
  {
    lang_id: '1',
    name: 'My Apps',
    description: '<p>myapps</p>',
    header_image: null,
    meta_keywords: null,
    meta_description: '',
    meta_title: 'myapps',
    uri: '/marketplace/installed/',
  },
];

const MarketplaceContainer = ({
  children,
  marketEntities,
  marketTags,
  marketEntityTypes,
  ...props
}) => {
  const { entities, setEntities } = useContext(MarketplaceContext);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const [isAsc, setIsAsc] = useState(false);
  const [search, setSearch] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const value = useDebounce(search, handleSearch);

  function handleSearch() {
    setEntities(
      marketEntities?.filter((ext) =>
        ext.name.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  }

  function handleSort() {
    const list = [...entities].sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });

    setEntities(isAsc ? list : list.reverse());
    setIsAsc(!isAsc);
  }

  useEffect(() => {
    if (isSm) setIsOpenDrawer(false);
  }, [isSm]);

  return (
    <CustomContainer>
      <Grid container>
        <Grid item md={3} display={{ xs: 'none', md: 'block' }}>
          {isSm ? (
            <Drawer
              anchor="left"
              open={isOpenDrawer}
              onClose={() => setIsOpenDrawer(false)}
            >
              <MarketplaceSidebar
                marketEntityTypes={marketEntityTypes}
                marketTags={marketTags}
                marketManage={marketManage}
              />
            </Drawer>
          ) : (
            <MarketplaceSidebar
              marketEntityTypes={marketEntityTypes}
              marketTags={marketTags}
              marketManage={marketManage}
            />
          )}
        </Grid>
        <Grid item xs={12} md={9}>
          {window.location.pathname !== '/marketplace/' && (
            <TitleBar name={props?.name} description={props?.description} />
          )}
          <Stack
            mt={2}
            direction={{ xs: 'column', md: 'row' }}
            alignItems="center"
          >
            <TextField
              variant="outlined"
              label="Search"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              sx={{
                ml: { xs: 0, md: 2 },
                mt: { xs: 2, md: 0 },
                width: { xs: 'auto', md: '20%' },
                alignSelf: 'stretch',
              }}
              variant="outlined"
              onClick={() => handleSort()}
            >
              Sort
            </Button>
            {isSm && (
              <Button
                sx={{
                  mt: { xs: 2, md: 0 },
                  alignSelf: 'stretch',
                }}
                variant="outlined"
                onClick={() => setIsOpenDrawer(true)}
              >
                Categories
              </Button>
            )}
          </Stack>
          {children}
        </Grid>
      </Grid>
    </CustomContainer>
  );
};

export default MarketplaceContainer;
