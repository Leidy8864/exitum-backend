const text = require('../libs/text');
const models = require('../models/index');

function timesFormat(time) {

    var hrs = Number(time.match(/^(\d+)/)[1]);
    var mnts = Number(time.match(/:(\d+)/)[1]);
    var format = time.match(/\s(.*)$/)[1];

    if (hrs > 12 || hrs < 0 || mnts > 59 || mnts < 0) throw(text.incorrectFormat('hora'));
    
    if (format.toUpperCase() == "PM" && hrs < 12) hrs = hrs + 12;
    if (format.toUpperCase() == "AM" && hrs == 12) hrs = hrs - 12;
    if (format.toUpperCase() == "PM" && hrs == 12) hrs = 12;

    return [ hrs, mnts, `${hrs}:${mnts}:00`, `${hrs}:00:00` ]
}

module.exports = {
    
    timesFormat: timesFormat,

    timesTampFormat: (date, time) => {

        var hrs = timesFormat(time)[0]
        var day = date.match(/^(\d{4})-(\d{2})-(\d{2})/)[3];
        var month = date.match(/^(\d{4})-(\d{2})-(\d{2})/)[2] - 1;
        var year = date.match(/^(\d{4})-(\d{2})-(\d{2})/)[1];

        return  new Date(year, month, day, hrs)
    },

    convertTimes: (time) => {
        
        var hrs = Number(time.match(/^(\d+)/)[1]);
        var mnts = Number(time.match(/:(\d+)/)[1]);

        if (hrs > 24 || hrs < 0 || mnts > 59 || mnts < 0) throw(text.incorrectFormat('hora'));
        if(mnts < 10) mnts = `0${mnts}`

        if (hrs > 0 && hrs < 12) time = `${hrs}:${mnts} AM`
        if (hrs > 12 && hrs < 24) time = `${hrs - 12}:${mnts} PM`
        if (hrs == 0) time = `12:${mnts} AM`
        if (hrs == 12) time = `12:${mnts} PM`
        
        return time
    },

    validateDateActual: (date) => {

        var d = new Date()// now.setHours(0, 0, 0, 0)
        var now = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
        var dateA = new Date(date)

        if (dateA < now) throw(text.notAvailable('fecha'))
        else return true
        
    },

    validateTimeActual: (time) => {

        var now = new Date()
        var hour = timesFormat(time)
        
        if (now.getHours() >= hour[0]) throw(text.notAvailable('hora'))
        else return true

    },

    validateRangeTime: (time_start, time_end, time) => {

        time_start = Number(time_start.match(/^(\d+)/)[1])
        time_end = Number(time_end.match(/^(\d+)/)[1])
        time = Number(time.match(/^(\d+)/)[1])

        if (time >= time_start && time < time_end ) return true
        else throw(text.notAvailable('hora'))

    }
    
}