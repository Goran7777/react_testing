import React, { useState } from 'react';

import './SummaryForm.scss';

interface IProps {
  setOrderPhase: any;
}

const SummaryForm: React.FC<IProps> = ({ setOrderPhase }) => {
  const [tcChecked, setTcChecked] = useState(false);
  const [visibility, setVisibility] = useState<boolean>(false);
  function handleSubmit(event: any) {
    event.preventDefault();

    // pass along to the next phase.
    // The next page will handle submitting order from context.
    setOrderPhase('completed');
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__label" htmlFor="label_id">
        I agree to{' '}
        <span
          onMouseOver={() => setVisibility(true)}
          onMouseLeave={() => setVisibility(false)}
          className="form__label--span"
        >
          Terms and Conditions
        </span>
        {visibility && (
          <span className="form__label--popup">
            No ice cream will actually be delivered
          </span>
        )}
      </label>
      <input
        type="checkbox"
        id="label_id"
        onChange={(e) => setTcChecked(e.target.checked)}
        className="form__input"
      />
      <button className="form__button" type="submit" disabled={!tcChecked}>
        Confirm order
      </button>
    </form>
  );
};

export default SummaryForm;
