// import { json } from "../../../../.cache/typescript/2.6/node_modules/@types/express";



var Sequelize = require("sequelize");
var environment = process.env.ENV;
var config = require('config');
var sequilizeConfig = config.get('Customer.sequilize');
var dbConfig = config.get('Customer.dbConfig');
const logger = require('../logger');

var sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: sequilizeConfig.dialect,
    pool: sequilizeConfig.pool,
});



const companyCat = sequelize.import("../models/share_api_companycategory");
const company = sequelize.import("../models/share_api_company");


//companyCat.hasMany(company)
// company.belongsTo(companyCat,{
//     as: 'company',
//     foreignKey: {
//         name: 'company_category_id',
//         allowNull: false
//     }
// })
//  
// company.belongsTo(companyCat,{foreignKey: 'company_category_id',targetKey:'company_category_id'});
// company.hasMany(companyCat,{foreignKey: 'company_category_id'});

var causeModel = {
    getCompanyCategory(req, res) {
        companyCat.findAndCountAll(
            {
            // include: [{
            //     association: company.belongsTo(companyCat),
            //   }]
        }
    )
            .then(category => {
                res.json(category);
            })
    },

    getCompany(req, res) {
        company.findAndCountAll({
            include: [{
                association: company.belongsTo(companyCat,{
                    foreignKey: {
                        name: 'company_category_id',
                        allowNull: false
                    }
                }),
              }]
        })
        .then(company => {
            res.json(company);
        })
    },

    // getCompany(req, res) {
    //     console.log("Coming");
    //     company.findAndCountAll({
    //         include: [
    //             {
    //                 model: companyCat
    //             }
    //         ]
    //     })
    //         .then(company => {
    //             res.json(company);
    //         })
    // }

};




module.exports = causeModel;