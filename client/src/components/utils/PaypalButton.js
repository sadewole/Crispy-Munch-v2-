import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

const PaypalButton = ({ handleSubmit, total }) => {
  const onSuccess = (payment) => {
    console.log(`The payment was succeeded ${payment}`);

    handleSubmit();
  };

  const onCancel = (data) => {
    console.log(`The payment was cancelled ${data}`);
  };

  const onError = (err) => {
    console.log(`new Error ${err}`);
  };

  // let total = 1;

  let env = 'sandbox';
  let currency = 'USD';

  const client = {
    sandbox: process.env.REACT_APP_PAYPAL_ID,
    production: 'PRODUCTION-ID',
  };

  const style = {
    size: 'large',
    shape: 'rect',
  };
  return (
    <PaypalExpressBtn>
      env={env}
      client={client}
      currency={currency}
      total={total}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
      style={style}
    </PaypalExpressBtn>
  );
};

export default PaypalButton;
