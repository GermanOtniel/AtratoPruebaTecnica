import React from 'react';

const LoaderContext = React.createContext({
  loaderScreen: false,
  setLoaderScreen: () => {}
});

export default LoaderContext;