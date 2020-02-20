const Validator = require('validator');

module.exports = function validateStockPurchase(data) {
  let errors = {};
  data.quantity = Validator.isNumeric(data.quantity) && !Validator.isDecimal(data.quantity) 
    ? data.quantity : errors.quantity = 'Shares can only be purchased at quantities of whole numbers';
}
