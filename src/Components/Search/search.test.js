// index.test.js
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Search from './';

Enzyme.configure({ adapter: new Adapter() });
const handleFunctionMock = jest.fn();

const result = mount(<Search searchCriteria = 'abc' handleSearchInput = { handleFunctionMock } />);
const inputString = 'abc';

describe('NewsItem component: ', () => {

        test('<Search/> should have 1 root element Section', () => {
            expect(result.find('section').length).toBe(1);
        });

        test('Search textarea should has actual value of input string', () => {
            result.find('input').simulate('change', {
                target: {
                    value: inputString
                }
            });

            expect(handleFunctionMock.mock.calls.length).toBe(1);
            expect(handleFunctionMock.mock.calls[0][0]).toBe(inputString);
        });

});