import React from 'react';
import ReactDOM from 'react-dom';
import App from '../Components/App';
import Sum from '../Components/sum';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('Show capture what the user enters', () => {

});



it('sums numbers', () => {
  expect(Sum(1, 2)).toEqual(2);
  expect(Sum(2, 2)).toEqual(4);
});