
var config = require('config');
const logger = require('../../logger');
const pagin = require('../../middleware/pagination');
const db = require('../../db/index');
const baseUrl = 'http://localhost:3000/runs';
const env = require('../../config/settings');
const paginconfig = env.pagination;
var jsonQ = require("jsonq");
var timeFormatter = require('../../timeformat');


const fields = ['run_id', 'start_location_lat', 'start_location_long', 'start_time',
    'end_time', 'avg_speed', 'end_location_lat', 'end_location_long', 'distance',
    'peak_speed', 'calories_burnt', 'cause_run_title_id', ['user_id_id', 'user_id'], 'run_amount',
    'run_duration', 'no_of_steps', 'is_flag', 'is_ios', 'client_run_id', 'version',
    'end_time_epoch', 'run_duration_epoch', 'start_time_epoch', ['team_id_id', 'team_id'],
    'num_spikes', 'app_version', 'device_id', 'device_name', 'num_updates',
    'os_version', ['cause_id_id', 'cause_id']];

var runModel = {
    getRuns(req, res) {
        var run_id = req.params.run_id;
        var user_id = req.query.user_id;
        var client_id = req.query.client_id;
        var is_flag = req.query.is_flag;

        if (user_id) {
            return db.runs.findAndCountAll({ where: { user_id_id: user_id }, attributes: fields })
                .then(runs => {

                    res.json(runs);
                })
        }
        if (client_id) {
            return db.runs.findAndCountAll({ where: { client_run_id: client_id }, attributes: fields })
                .then(runs => {

                    res.json(runs);
                })
        }
        if (is_flag) {
            return db.runs.findAndCountAll({ where: { is_flag: is_flag }, limit: paginconfig.SMALL, attributes: fields })
                .then(runs => {

                    res.json(runs);
                })
        }
        // console.log("cominggggg......");
        run_id = parseInt(run_id);
        if (run_id) {
            return db.runs.findAndCountAll({
                where: { run_id: run_id },
                limit: paginconfig.SMALL,
                attributes: fields
            })
                .then(runs => {
                    res.json(runs);
                })
        }
        //get all runs
        // var getlimit = pagin.getOffset(paginconfig.SMALL, req.query);
        // getlimit = JSON.stringify(getlimit);
        // console.log("GET LIMIT", getlimit.toString());
        // getlimit = getlimit.replace(/{/g, '').replace(/}/g, '');
        // getlimit = getlimit.replace(/"/g, '');
        if (req.query) {
            console.log("REQ...", req.query);
            return db.runs.findAndCountAll({
                where: req.query,
                limit: 5, offset: 0,
                attributes: fields,

            })
                .then(runs => {

                    var sendRun = pagin.getPagination(runs, req.query, baseUrl, paginconfig.SMALL);
                    sendRun = jsonQ(sendRun.rows);
                    var run_duration = sendRun.find('run_duration')
                    //    run_duration= run_duration.value();
                    console.log("RUN.......", run_duration);
                    var formattedDuration = [];
                    run_duration.each((index, path, value) => {
                        console.log(value);
                        var time = value.days * 86400 || 0
                        time += value.hours * 3600 || 0
                        time += value.minutes* 60 || 0 
                        time += value.seconds || 0;
                        value = timeFormatter(time*1000)
                       
                        formattedDuration.push(value);
                       console.log("formatted Duration", formattedDuration)
                    })
                    res.json(sendRun);
                })
        }
    },

}


module.exports = runModel;