'use strict';


const deleteExtraInfoPerson = (obj_person, skip) =>{
    const array_atributes = [
        "gender","location", "email", "login", "dob",
        "registered", "phone", "cell", "id", "picture", "nat"
    ]
    for (var i = 0; i < array_atributes.length; i++) { 
        if(array_atributes[i]!= skip){
            delete obj_person[array_atributes[i]]
        }
    }
}

exports.deleteExtraInfoPerson   = deleteExtraInfoPerson;