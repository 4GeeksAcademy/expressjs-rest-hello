"use strict";
// const jwt = require('jsonwebtoken');
// const env = require('node-env-file');
// env(__dirname + '/.env');
// const MAX_EXPIRE = 3 * 24 *60 * 600;   // Expiración en 24 horas
// const SECRET_JWT = process.env.TOKEN_SECRET
// //TOKEN JWT ACCESO
// const createTokenAuth = (data) => {
//     return jwt.sign(
//         { ...data }, 
//         SECRET_JWT,
//         { expiresIn: MAX_EXPIRE })
// }
// const verifiedToken = (token)=> jwt.verify( token, SECRET_JWT, (err, decoded) => {      
//         if (err) {
//           return { status : false, objAuth: 'Invalid Token' };    
//         } else {
//           return { status : true, objAuth: decoded };    
//         }
// });
// module.exports = { 
//     createTokenAuth,
//     verifiedToken
// }
