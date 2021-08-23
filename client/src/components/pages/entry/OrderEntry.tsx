import React from 'react';
import Options from './Options';
import { useOrderDetails } from '../../../contexts/OrderDetails';

interface IProps {
  setOrderPhase: any;
}

const OrderEntry: React.FC<IProps> = ({ setOrderPhase }) => {
  // @ts-ignore
  const [orderDetails] = useOrderDetails();

  // disable order button if there aren't any scoops in order
  const orderDisabled = orderDetails.totals.scoops === '$0.00';
  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2 role="grand-total">Grand total: {orderDetails.totals.grandtotal}</h2>
      <button disabled={orderDisabled} onClick={() => setOrderPhase('review')}>
        Order Sundae!
      </button>
    </div>
  );
};

export default OrderEntry;
