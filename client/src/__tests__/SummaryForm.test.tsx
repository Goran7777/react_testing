import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SummaryForm from '../components/pages/summary/SummaryForm';

test('describe relationsheep between checkbox && button', () => {
  render(<SummaryForm setOrderPhase={jest.fn()} />);
  const checkbox = screen.getByRole('checkbox', {
    name: /i agree to/i,
  });
  const button = screen.getByRole('button', { name: 'Confirm order' });
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
  // checkbox is checked
  userEvent.click(checkbox);
  expect(button).toBeEnabled();
  // uncheck checkbox
  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test('tooltip response on hover', () => {
  render(<SummaryForm setOrderPhase={jest.fn()} />);

  // popup starts hidden
  const nullPopup = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopup).not.toBeInTheDocument();
  //popup apperas on hover
  const hoverArea = screen.getByText(/Terms and Conditions/i);
  userEvent.hover(hoverArea);
  const popup = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popup).toBeInTheDocument();
  // popup disappears on mouse out
  userEvent.unhover(hoverArea);
  expect(popup).not.toBeInTheDocument();
});
