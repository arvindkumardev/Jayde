import aes from 'aes-js';
import {isEmpty} from 'lodash';

/**
 * @param {String} key // String to be converted
 */
const generateBytesFromString = (key) => aes.utils.utf8.toBytes(key);

/**
 * @param {String} key // String to be converted
 */
const generateStringFromBytes = (key) => aes.utils.utf8.fromBytes(key);

/**
 * @param {String} key // Bytes to be converted
 */
const generateHexFromBytes = (data) => aes.utils.hex.fromBytes(data);

/**
 * @param {String} key // Bytes to be converted
 */
const generateStringFromHex = (data) => aes.utils.hex.toBytes(data);

const getInitialvector = () => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

/**
 * @param {*} text The String to be converted to AES
 * @param {*} key The Key of encryption
 */
const encryptAES128 = (text, key) => {
  let encryptedText = '';
  if (!isEmpty(text)) {
    const pass = generateBytesFromString(key);
    const data = generateBytesFromString(text);
    const initVec = getInitialvector();
    const ctr = new aes.ModeOfOperation.cbc(pass, initVec);
    const encryptedBytes = ctr.encrypt(aes.padding.pkcs7.pad(data));
    encryptedText = generateHexFromBytes(encryptedBytes);
  }
  return encryptedText;
};

/**
 * @param {*} text The String to be converted to AES
 * @param {*} key The Key of encryption
 */
const decryptAES128 = (text, key) => {
  let decryptedText = '';
  if (!isEmpty(text)) {
    const data = generateStringFromHex(text);
    const pass = generateBytesFromString(key);
    const initVec = getInitialvector();
    const ctr = new aes.ModeOfOperation.cbc(pass, initVec);
    const decryptedBytes = ctr.decrypt(data);
    const decryptedString = generateStringFromBytes(decryptedBytes);
    let index = decryptedString.lastIndexOf('}');
    if (index === -1) {
      index = decryptedString.length - 1;
    }
    decryptedText = decryptedString.substring(0, index + 1).trim();
  }
  return decryptedText;
};

// const getString = () => {
//   let value = ''
//   if (CONFIG.INSTANCE === 'PRODUCTION') {
//     value = '6Bt8I#,+()$~%:*?<>4zy2ZDW+CH4x2#,+()$~%:*?<>{}ZoBbwlgY#,+()$~%:*?<>H8LP2L#,+()$~%:*?vAfY7yfoDSQ='
//   }
//   else {
//     value = 'm()$~%:*?<>y()$~%:*?<>pa()$~%:*?<>s()$~%:*?<>swor()$~%:*?<>d12()$~%:*?<>3()$~%:*?<>45()$~%:*?<>6'
//   }
//   return !!value ? value.replace(/[&\/\\#,()$~%.'":*?<>{}]/g, '') : ''
// }

export const encrypt = (text) => encryptAES128(text, 'mypassword123456');

export const decrypt = (text) => decryptAES128(text, 'mypassword123456');
