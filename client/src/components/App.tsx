import React, { useState } from 'react';
import OrderSummary from './pages/summary/OrderSummary';
import OrderEntry from './pages/entry/OrderEntry';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import { OrderDetailsProvider } from '../contexts/OrderDetails';

const App = () => {
  const [orderPhase, setOrderPhase] = useState('inProgress');
  let Component = OrderEntry; // default to order page
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConfirmation;
      break;
    default:
  }
  return (
    <OrderDetailsProvider>
      <>{<Component setOrderPhase={setOrderPhase} />}</>
    </OrderDetailsProvider>
  );
};

export default App;
