import React from 'react';

import { render, screen } from '../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../components/pages/entry/Options';
import OrderEntry from '../components/pages/entry/OrderEntry';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);
  // make sure total starts with out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  const chocolateInput = await screen.findByLabelText('Chocolate');
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('4.00');
});

test('update toppings subtotal when scoops change', async () => {
  render(<Options optionType="toppings" />);
  const toppingsTotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsTotal).toHaveTextContent('0.00');
  // add cherries and check subtotal
  const hotFudgeCheckbox = await screen.findByLabelText('Hot fudge');
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');
  // const msCheckbox = await screen.findByLabelText('M&Ms');
  // userEvent.click(msCheckbox);
  // expect(toppingsTotal).toHaveTextContent('3.00');
});
describe('grand total', () => {
  test('grand total updates properly if scoop is added first', async () => {
    // Test that the total starts out at $0.00
    render(<OrderEntry setOrderPhase={jest.fn()} />);
    const grandTotal = screen.getByRole('grand-total');

    // check that grand total starts out at 0
    expect(grandTotal).toHaveTextContent('0.00');

    // update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByLabelText('Vanilla');
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    // add cherries and check grand total
    const cherriesCheckbox = await screen.findByLabelText('Cherries');
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);

    // add cherries and check grand total
    const cherriesCheckbox = await screen.findByLabelText('Cherries');
    userEvent.click(cherriesCheckbox);
    const grandTotal = screen.getByRole('grand-total');
    expect(grandTotal).toHaveTextContent('1.50');

    // update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByLabelText('Vanilla');
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);

    // add cherries
    const cherriesCheckbox = await screen.findByLabelText('Cherries');
    userEvent.click(cherriesCheckbox);
    // grand total $1.50

    // update vanilla scoops to 2; grand total should be $5.50
    const vanillaInput = await screen.findByLabelText('Vanilla');
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    // remove 1 scoop of vanilla and check grand total
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    // check grand total
    const grandTotal = screen.getByRole('grand-total');
    expect(grandTotal).toHaveTextContent('3.50');

    // remove cherries and check grand total
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
