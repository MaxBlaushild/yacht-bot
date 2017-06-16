'use strict';

const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secret = process.env.DB_INTEGRATION_SECRET;

const encrypt = (unencryptedValue) => {
  var cipher = crypto.createCipher(algorithm, secret);
  var encryptedValue = cipher.update(unencryptedValue, 'utf8', 'hex');
  encryptedValue += cipher.final('hex');
  return encryptedValue;
}

const decrypt = (encryptedValue) => {
  var decipher = crypto.createDecipher(algorithm, secret);
  var decryptedValue = decipher.update(encryptedValue, 'hex', 'utf8');
  decryptedValue += decipher.final('utf8');
  return decryptedValue;
}

module.exports = {
  encrypt,
  decrypt
};
