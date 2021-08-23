import React from 'react';
import { render, screen } from '../test-utils/testing-library-utils';
import { server } from '../mocks/server';
import { rest } from 'msw';

import OrderConfirmation from '../components/pages/confirmation/OrderConfirmation';

test('error response from server when submiting order', async () => {
  server.resetHandlers(
    rest.post('http://localhost:3030/order', (req, res, ctx) => {
      res(ctx.status(500));
    })
  );
  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const alert = await screen.findByTestId('alertId');

  expect(alert).toHaveTextContent(
    'Something went wrong.Please try again later'
  );
});
