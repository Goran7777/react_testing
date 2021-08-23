import React, { useEffect, useState } from 'react';

import axios from 'axios';
import './Options.scss';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';
import { pricePerItem } from '../../../constants';
import { useOrderDetails } from '../../../contexts/OrderDetails';
import { formatCurrency } from '../../../utilities';

interface IProps {
  optionType: string;
}
interface IItem {
  name: string;
  imagePath: string;
}

const Options: React.FC<IProps> = ({ optionType }) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [error, setError] = useState<boolean>(false);
  // @ts-ignore
  const [orderDetails, updateItemCount] = useOrderDetails();
  // optionTypes is scoops or toppings
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return (
      <AlertBanner message="Something went wrong.Please try again later" />
    );
  }
  const ItemComponent: React.FC<IItem> =
    optionType === 'scoops' ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  const optionItems = items.map((item, i) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      // @ts-ignore
      updateItemCount={(itemName: string, newItemCount: any) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));
  return (
    <div className="options">
      <h2 className="options__heading">{title}</h2>
      <p className="options__price">
        {formatCurrency(pricePerItem[optionType])} each
      </p>
      <p className="options__title">
        {title} total: {orderDetails.totals[optionType]}
      </p>
      {optionItems}
    </div>
  );
};

export default Options;
