import React from 'react';
import Banner from './Banner';
import LifeMatters from './LifeMatters';
import TopContributors from './TopContributors';
import MostSavedLessons from './MostSavedLessons';
import Featured from './Featured';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LifeMatters></LifeMatters>
            <Featured></Featured>
            <TopContributors></TopContributors>
            <MostSavedLessons></MostSavedLessons>
        </div>
    );
};

export default Home;