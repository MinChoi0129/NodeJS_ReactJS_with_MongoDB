// const axios = require("axios");
// const cheerio = require("cheerio");

// const getExchange = async () => {
//   return new Promise(async (resolve, reject) => {
//       try{
//         let html = await axios.get("https://spot.wooribank.com/pot/Dream?withyou=FXXRT0021");  
//         let exchangeList = {};
//         const $ = cheerio.load(html.data);
//         const $bodyList = $("div.exchange-typea ul").find("tbody tr");

//         $bodyList.each(function(i, elem) {
//             var ele = $(this).text().replace(/\t/gi, '').split('\n');
//             exchangeList[ ele[1] ] = ele[2];
//         });
//         resolve(exchangeList);
//       }catch(error){
//         reject(error);
//       }
//   });
// }

// export default getExchange