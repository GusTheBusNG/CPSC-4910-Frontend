import CryptoJS from 'crypto-js/'

export const encrypt = value => CryptoJS.AES.encrypt(value, process.env.REACT_APP_ENCRYPTION_KEY);
export const decrypt = value => {
  var bytes = CryptoJS.AES.decrypt(value.toString(), process.env.REACT_APP_ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
