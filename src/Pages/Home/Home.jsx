import React from 'react';
import Banner from './Banner';
import LifeMatters from './LifeMatters';
import TopContributors from './TopContributors';
import MostSavedLessons from './MostSavedLessons';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LifeMatters></LifeMatters>
            <TopContributors></TopContributors>
            <MostSavedLessons></MostSavedLessons>
        </div>
    );
};

export default Home;