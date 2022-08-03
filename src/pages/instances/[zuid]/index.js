import React from 'react';
import AppBar from 'components/console/AppBar';
import { Container } from '@mui/system';
import Main from 'layouts/Main';
import { useZestyStore } from 'store';
import Login from 'components/console/Login';
import { InstancesApp } from 'views/InstancesApp/InstancesApp';

export default function Instance() {
  const { isAuthenticated } = useZestyStore((state) => state);
  return (
    <Main>
      <AppBar />

      <Container>{isAuthenticated ? <InstancesApp /> : <Login />}</Container>
    </Main>
  );
}
