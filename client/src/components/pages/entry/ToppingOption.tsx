import React from 'react';
import './ToppingOption.scss';

interface IProps {
  name: string;
  imagePath: string;
  updateItemCount: any;
}

const ToppingOption: React.FC<IProps> = ({
  name,
  imagePath,
  updateItemCount,
}) => {
  return (
    <div className="topping-option">
      <img
        className="topping-option__img"
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <label htmlFor="topping-option">{name}</label>
      <input
        type="checkbox"
        id="topping-option"
        onChange={(e) => {
          updateItemCount(name, e.target.checked ? 1 : 0);
        }}
      />
    </div>
  );
};

export default ToppingOption;
