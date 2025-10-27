import { render, screen } from '@testing-library/react';
import { act, waitFor } from 'react-dom/test-utils';
import App from './App';

// maplibre-gl is too complicated to run in test suite due to webworkers and canvas logic
// so we're using mocks to replace it with placeholders
jest.mock('react-map-gl', () => ({
  __esModule: true,
  default: () => <span>Mock Map</span>,
  Marker: () => <span>Mock Marker</span>,
  useMap: () => ({}),
}));
jest.mock('maplibre-gl', () => ({
  __esModule: true,
  default: {
    workerClass: null,
    Map: () => ({}),
  },
}));

test('renders application', async () => {
  // The await act block is functionly required
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<App />);
  });
  const welcomeEl = screen.getByText(/Welcome to/i);
  expect(welcomeEl).toBeInTheDocument();
});
