import React, { lazy, Suspense, useState, useEffect } from 'react';

function RemoteLoader({ remoteName, moduleName, fallback, error }) {
  const [hasError, setHasError] = useState(false);
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    setHasError(false);
    setComponent(null);

    const loadComponent = async () => {
      try {
        // Dynamically import the remote module
        const module = await import(/* @vite-ignore */ `${remoteName}${moduleName}`);
        setComponent(() => module.default);
      } catch (err) {
        console.error(`Failed to load remote ${remoteName}${moduleName}:`, err);
        setHasError(true);
      }
    };

    loadComponent();
  }, [remoteName, moduleName]);

  if (hasError) {
    return error;
  }

  if (!Component) {
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
}

export default RemoteLoader;
