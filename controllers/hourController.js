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
        // else if(now.getFullYear() < dateA.getFullYear() && now.getMonth() < dateA.getMonth()) return false
        // else if(now.getFullYear() < dateA.getFullYear()) return false
        // else if(now.getDate() < dateA.getDate()) return false
        else return true
        
    },

    validateTimeActual: (time) => {

        var nowH = new Date().toLocaleTimeString('en-US', { timeZone: "America/Lima", hour12: false });
        var now = Number(nowH.match(/^(\d+)/)[1])
        var hour = timesFormat(time)

        if (now >= hour[0]) throw(text.notAvailable('hora'))
        else return true

    },

    validateRangeTime: (time_start, time_end, time) => {

        time_start = Number(time_start.match(/^(\d+)/)[1])
        time_end = Number(time_end.match(/^(\d+)/)[1])
        time = Number(time.match(/^(\d+)/)[1])

        if (time >= time_start && time < time_end ) return true
        else throw(text.notAvailable('hora'))

    },

    getAge: (dateString, dateString2) =>{

        var now = (dateString2) ? new Date(dateString2) : new Date()
        var today = new Date(now.getYear(),now.getMonth(),now.getDate());
    
        var yearNow = now.getFullYear();
        var monthNow = now.getMonth();
        var dateNow = now.getDate();

        var dob = new Date(dateString); //dateString.substring(6,10), dateString.substring(0,2)-1, dateString.substring(3,5)
    
        var yearDob = dob.getFullYear();
        var monthDob = dob.getMonth();
        var dateDob = dob.getDate();
        var age = {};
        var ageString = "";
        var yearString = "";
        var monthString = "";
        var dayString = "";
    
        yearAge = yearNow - yearDob;
    
        if (monthNow >= monthDob)
        var monthAge = monthNow - monthDob;
        else {
        yearAge--;
        var monthAge = 12 + monthNow -monthDob;
        }
    
        if (dateNow >= dateDob)
        var dateAge = dateNow - dateDob;
        else {
        monthAge--;
        var dateAge = 31 + dateNow - dateDob;
    
        if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
        }
        }
    
        age = {
            years: yearAge,
            months: monthAge,
            days: dateAge
            };
    
        if ( age.years > 1 ) yearString = " año(s)";
        else yearString = " año";
        if ( age.months> 1 ) monthString = " meses";
        else monthString = " mes";
        if ( age.days > 1 ) dayString = " dias";
        else dayString = " dia";
    
    
        if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )
        ageString = age.years + yearString + ", " + age.months + monthString + " y " + age.days + dayString; //+ " old.";
        else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )
        ageString = /*"Only " +*/ age.days + dayString; //+ " old!";
        else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )
        ageString = age.years + yearString; // + " old. Happy Birthday!!";
        else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )
        ageString = age.years + yearString + " y " + age.months + monthString; //+ " old.";
        else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )
        ageString = age.months + monthString + " y " + age.days + dayString; //+ " old.";
        else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )
        ageString = age.years + yearString + " y " + age.days + dayString; //+ " old.";
        else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )
        ageString = age.months + monthString; //+ " old.";
        else ageString = "Sin resultado!";
    
        return ageString;
    }
    
}