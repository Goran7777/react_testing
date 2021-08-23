import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../components/App';

test('Order phases for happy path', async () => {
  // render app
  // Don't need to wrap in provider; already wrapped!
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByLabelText('Vanilla');
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '2');

  const cherriesCheckbox = await screen.findByLabelText('Cherries');
  userEvent.click(cherriesCheckbox);

  // find and click order summary button
  const orderSummaryButton = screen.getByRole('button', {
    name: /order sundae!/i,
  });
  userEvent.click(orderSummaryButton);

  // check summary subtotals
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByText('Scoops: $4.00');
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByText('Toppings: $1.50');
  expect(toppingsHeading).toBeInTheDocument();

  // check summary option items

  // const vanillaOrder = screen.getByTestId('Vanilla');
  // expect(vanillaOrder).toHaveTextContent('2 Vanilla');

  // expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('Cherries')).toBeInTheDocument();

  const optionItems = screen.getAllByRole('listitem');
  const optionItemsText = optionItems.map((item) => item.textContent);
  expect(optionItemsText).toEqual(['2 Chocolate', 'Cherries']);

  // accept terms and click button
  const tcCheckbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);

  // Expect "loading" to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // check confirmation page text
  // this one is async because there is a POST request to server in between summary
  //    and confirmation pages
  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  // expect that loading has disappeared
  const notLoading = screen.queryByText('loading');
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // find and click "new order" button on confirmation page
  const newOrderButton = screen.getByRole('button', {
    name: /create new order/i,
  });
  userEvent.click(newOrderButton);

  // check that scoops and toppings have been reset
  const scoopsTotal = screen.getByText('Scoops total:', { exact: false });
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText('Toppings total:', { exact: false });
  expect(toppingsTotal).toBeInTheDocument();

  // wait for items to appear so that Testing Library doesn't get angry about stuff
  // happening after test is over
  await screen.findByText('Vanilla');
  await screen.findByLabelText('Cherries');
});

test('Toppings header is not on summary page if no toppings ordered', async () => {
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  // const vanillaInput = await screen.findByText('Vanilla');
  //  userEvent.clear(vanillaInput);
  // userEvent.type(vanillaInput, '1');

  const chocolateInput = await screen.findByLabelText('Chocolate');
  // userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  // find and click order summary button
  const orderSummaryButton = screen.getByRole('button', {
    name: /order sundae/i,
  });
  userEvent.click(orderSummaryButton);

  const scoopsHeading = screen.getByText('Scoops: $4.00');
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole('heading', { name: /toppings/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});
