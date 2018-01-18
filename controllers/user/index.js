var config = require('config');
const logger = require('../../logger');
const db = require('../../db/index');
const baseUrl = 'http://localhost:3000/user';
const pagin = require('../../middleware/pagination');
const env = require('../../config/settings');
const paginconfig = env.pagination;

// getPagination function is used to add pagination in API response. It takes response object,
//current page from query url, base url and limit
// function getPagination(objectResponse, currPage, url, limit) {

//   const totalPage = Math.ceil(parseInt(objectResponse.count) / limit);

//   objectResponse = JSON.stringify(objectResponse);
//   objectResponse = JSON.parse(objectResponse);

//   objectResponse.next = currPage == totalPage ? null : `${url}/?page=${currPage + 1}`;
//   objectResponse.prev = currPage - 1 <= 0 ? null : `${url}/?page=${currPage - 1}`;
//   return objectResponse;
// }

// //get Offset function used to get page and offset value from url
// function getOffset(urlQuery, limit) {
//   var page = parseInt(urlQuery.page) || 1;
//   var offset = page == 1 ? 0 : ((page - 1) * limit);
//   return {
//     page: page,
//     offset: offset
//   }
// }

var userFields = ["user_id", "first_name", "last_name", "gender_user", 
"email","phone_number", "address", "locality_user", "city", "state", "country",
"social_thumb","birthday","total_amount", "total_distance","date_signed_in","is_active",
   "body_height","body_weight"];

var userModel = {

  //GET all users
  getUsers(req, res) {
    console.log("paginconfig------------------", paginconfig.SMALL);
    return db.users.findAndCountAll(pagin.getOffset(paginconfig.SMALL, req.query))
      .then(users => {
        // console.log("RESPONSE.........", users.rows.length);
        // getPagination function is used to add pagination in API response
        var user = pagin.getPagination(users, req.query, baseUrl, paginconfig.SMALL)
        res.json(user);
      });
  },


  //GET SINGLE USER
  getUser(req, res) {

    var userId = req.params.id;
    return db.users.findAndCountAll({ where: { user_id: userId },attributes:userFields })
      .then(user => {
        // console.log("RESPONSE.........", users.rows.length);
        // getPagination function is used to add pagination in API response
        var paginationUser = pagin.getPagination(user, req.query, baseUrl, paginconfig.SMALL)
        res.json(paginationUser);
      });
  },


}


module.exports = userModel;