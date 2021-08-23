import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { formatCurrency } from '../utilities';
import { pricePerItem } from '../constants';

// @ts-ignore
const OrderDetails = createContext();
// create custom hook to check whether we are inside provider
export const useOrderDetails = () => {
  const context = useContext(OrderDetails);
  if (!context) {
    throw new Error(
      'useOrderDetails must be used whithin OrderDetailsProvider'
    );
  }
  return context;
};

function calculateSubtotal(optionType: string, optionCounts: any) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[optionType];
}

export const OrderDetailsProvider = (props: any) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandtotal: zeroCurrency,
  });
  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandtotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);
  const value = useMemo(() => {
    function updateItemCount(
      itemName: string,
      newItemCount: string,
      optionType: string
    ) {
      const newOptionCounts = { ...optionCounts };
      // update option count for this item with the new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    }
    function resetOrder() {
      setOptionCounts({
        scoops: new Map(),
        toppings: new Map(),
      });
    }
    // getter: object containing option counts for
    // scoops and toppings,subtotals and totals
    // setter: updateOptionCount
    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
};
