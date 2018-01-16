
var config = require('config');
const logger = require('../../logger');
const pagination = config.get('Customer.pagination');
const pagin = require('../../middleware/pagination');
const db = require('../../db/index');
const baseUrl = 'http://localhost:3000/runs';




var runModel = {
    getRuns(req, res) {
        var run_id = req.params.run_id;
        var user_id= req.query.user_id;
     
        if(user_id){
            return db.runs.findAndCountAll({ where: { user_id_id: user_id } })
                .then(runs => {
                    console.log("coming......")
                    res.json(runs);
                })
        }
        // console.log("cominggggg......");
        run_id = parseInt(run_id);
        if (run_id) {
            return db.runs.findAndCountAll({ where: { run_id: run_id } })
                .then(runs => {
                    res.json(runs);
                })
        }
        //get all runs
        else {
            return db.runs.findAndCountAll(pagin.getOffset(pagination.SMALL, req.query))
                .then(runs => {
                    res.json(pagin.getPagination(runs, req.query, baseUrl));
                })
        }
    },
    
}


module.exports = runModel;