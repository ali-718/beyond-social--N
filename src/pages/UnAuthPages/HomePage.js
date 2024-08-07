import React, { useEffect } from 'react';
import { HomeHeader } from 'src/components/HomeComponents/HomeHeader';
import { HomeHero } from 'src/components/HomeComponents/HomeHero';
import { Helmet } from 'react-helmet';

export const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Connect & learn from the experts"></meta>
        <meta name="description" content="Beyond Social, Amplify your influence"></meta>
      </Helmet>
      <HomeHeader />
      <HomeHero />
    </div>
  );
};
