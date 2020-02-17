var CryptoJS = require("crypto-js");

const crypto = {
   encrypt: function(value) {
    return CryptoJS.AES.encrypt(value, process.env.REACT_APP_ENCRYPTION_KEY);
  },
  decrypt: function(value) {
    var bytes = CryptoJS.AES.decrypt(value.toString(), process.env.REACT_APP_ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}

export default crypto;
