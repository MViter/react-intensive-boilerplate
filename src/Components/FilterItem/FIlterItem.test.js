import React from 'react';
import FilterItem from './';
import dom from 'react-test-renderer';

const renderTree = dom.create(
    <FilterItem>abc-news</FilterItem>
).toJSON();
it('FilterItem component equals to its snapshot', () => {
    expect(renderTree).toMatchSnapshot();
});