const Validator = require('validator');

module.exports = function validateStockPurchase(data) {
  let errors = {};


  if (Validator.isNumeric(data.qty) && !Validator.isDecimal(data.qty)) {
    errors.quantity = 'Shares can only be purchased at quantities of whole numbers';
  }

  if (!Validator.isNumeric(data.qty) && !Validator.isDecimal(data.qty)) {
    errors.quantity = 'Quantity must be a full number';
  }

  if (data.qty < 1) {
    errors.quantity = 'Quantity must be greater than zero in order to place a buy order';
  }

  if (Validator.isEmpty(data.qty)) {
    errors.quantity = 'Quantity field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
