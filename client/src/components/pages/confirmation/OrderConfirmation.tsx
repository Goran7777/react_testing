import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useOrderDetails } from '../../../contexts/OrderDetails';
import AlertBanner from '../common/AlertBanner';
interface IProps {
  setOrderPhase: any;
}

const OrderConfirmation: React.FC<IProps> = ({ setOrderPhase }) => {
  const [orderNum, setOrderNum] = useState(null);
  const [error, setError] = useState(false);
  // @ts-ignore
  const [, , resetOrder] = useOrderDetails();
  useEffect(() => {
    axios
      .post('http://localhost:3030/order', {})
      .then((data) => {
        setOrderNum(data.data.orderNumber);
      })
      .catch((error) => setError(true));
  }, []);
  if (error) {
    return (
      <AlertBanner message="Something went wrong.Please try again later" />
    );
  }
  function handleClick() {
    // clear the order details
    resetOrder();

    // send back to order page
    setOrderPhase('inProgress');
  }
  if (orderNum) {
    return (
      <div>
        <h2>Thank you!</h2>
        <p>Your order number is {orderNum}</p>
        <button onClick={handleClick}>Create new order</button>
      </div>
    );
  } else {
    return <h2>Loading ....</h2>;
  }
};

export default OrderConfirmation;
