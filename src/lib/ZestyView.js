/**
 * Component which dynamically selects a views/zesty component based on the URL
 */
import React, { useState } from 'react';
import * as Zesty from '../views/zesty';
import ErrorPage from '../pages/_error';

export function ZestyView(props) {
  if (props.content.error) {
    return <ErrorPage statusCode={404} />;
  }

  // get data in initial load
  const Component = Zesty[props.content.meta.model_alternate_name];

  return (
    <>
      <Component content={props.content} />
    </>
  );
}
