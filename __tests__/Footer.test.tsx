import 'react-native';
import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';
import { jest, test, expect } from '@jest/globals';
import Footer from '../src/screens/list/Footer';

test('Footer renders correctly with ADD button', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(<Footer onSubmit={onSubmit} />);

    const input = getByPlaceholderText('Enter here');
    const addButton = getByText('ADD');

    fireEvent.changeText(input, 'New Item');
    fireEvent.press(addButton);

    expect(onSubmit).toHaveBeenCalledWith('New Item');
});

test('Footer updates text and renders with UPDATE button when item prop is provided', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
        <Footer item={{ id: '1', text: 'Initial Text' }} onSubmit={onSubmit} />
    );

    const input = getByPlaceholderText('Enter here');
    const updateButton = getByText('UPDATE');

    fireEvent.changeText(input, 'Updated Item');
    fireEvent.press(updateButton);

    expect(onSubmit).toHaveBeenCalledWith('Updated Item');
});

test('Footer does not submit empty text', () => {
    const onSubmit = jest.fn();
    const { getByText } = render(<Footer onSubmit={onSubmit} />);

    const addButton = getByText('ADD');

    fireEvent.press(addButton);

    expect(onSubmit).not.toHaveBeenCalled();
});
