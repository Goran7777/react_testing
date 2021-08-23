import React, { useState } from 'react';
import './ScoopOption.scss';

interface IProps {
  name: string;
  imagePath: string;
  updateItemCount: any;
}

const ScoopOption: React.FC<IProps> = ({
  name,
  imagePath,
  updateItemCount,
}) => {
  const [isValid, setIsValid] = useState(true);
  const handleChange = (event: React.ChangeEvent) => {
    // @ts-ignore
    const currentValue = event.target.value;

    // make sure we're using a number and not a string to validate
    const currentValueFloat = parseFloat(currentValue);
    const valueIsValid =
      0 <= currentValueFloat &&
      currentValueFloat <= 10 &&
      Math.floor(currentValueFloat) === currentValueFloat;

    // validate
    setIsValid(valueIsValid);

    // only update context if the value is valid
    if (valueIsValid) updateItemCount(name, currentValue);
  };

  return (
    <div className="scoop-option">
      <img
        className="scoop-option__img"
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <form className="scoop-option__form">
        <label className="" htmlFor="scoop-option">
          {name}
        </label>
        <input
          min={0}
          max={10}
          role="scoop-input"
          className="scoop-option__input"
          id="scoop-option"
          type="number"
          defaultValue={0}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default ScoopOption;
