import 'react-native';
import React from 'react';
import App from '../App';

import { it, jest } from '@jest/globals';

import renderer from 'react-test-renderer';

jest.mock('@react-native-async-storage/async-storage', () => ({

}));

it('renders correctly', () => {
  renderer.create(<App />);
});
