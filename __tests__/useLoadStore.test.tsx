import 'react-native';

import { jest, test, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import useLoadStore from '../src/hooks/useLoadStore';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();
type MockDispatchType = typeof mockDispatch;

(useDispatch as jest.Mock<MockDispatchType>).mockReturnValue(mockDispatch);

const mockAddItemAction = { type: 'ADD_ITEM', item: { id: '1', text: 'Test Item' } };

test('useLoadStore hook loads store and dispatches actions correctly', async () => {
  (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify({ '1': { id: '1', text: 'Test Item' } }));

  const { result, waitForNextUpdate } = renderHook(() => useLoadStore());

  await waitForNextUpdate();

  expect(result.current).toBe(true);

  expect(mockDispatch).toHaveBeenCalledWith(mockAddItemAction);
});
