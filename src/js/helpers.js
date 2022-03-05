//* Import
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';
////////////////////////////////////////////////////
// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPromise = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([fetchPromise]); //timeout(TIMEOUT_SEC) -> put back when finish
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (err) {
    // rethrow error to model.js
    throw err;
  }
};

//* OLD CODE -> combined into const AJAX (analyse the code)
// export const getJSON = async function (url) {
//   try {
//     const fetchPromise = fetch(url);
//     const response = await Promise.race([fetchPromise]); //timeout(TIMEOUT_SEC) -> put back when finish
//     const data = await response.json();
//     if (!response.ok) throw new Error(`${data.message} (${response.status})`);
//     return data;
//   } catch (err) {
//     // rethrow error to model.js
//     throw err;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPromise = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });
//     const response = await Promise.race([fetchPromise]); //timeout(TIMEOUT_SEC) -> put back when finish
//     const data = await response.json();
//     if (!response.ok) throw new Error(`${data.message} (${response.status})`);
//     return data;
//   } catch (err) {
//     // rethrow error to model.js
//     throw err;
//   }
// };
