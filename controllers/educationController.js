const text = require('../libs/text')
const Sequelize = require('sequelize');
const models = require('../models/index');
const { existById } = require('./elementController')
const { createSpeciality } = require('./specialityController')
const { createUniversity } = require('./universityController')
const { check, validationResult } = require('express-validator');
const { createCareer } = require('./careerController');
const  { successful, returnError } = require('./responseController')

module.exports = {

    validate: (method) => {

        var user_id = check('user_id').exists().withMessage(text.id('usuario')).isNumeric().withMessage(text.numeric)

        switch (method) {
            case 'by-user-id':
                return [ user_id ]
            case 'create':
                return [
                    check('university_name').exists().withMessage(text.name('universidad')),
                    check('description').exists().withMessage(text.description),
                    check('date_start').exists().withMessage(text.dateStart),
                    check('date_end').exists().withMessage(text.dateEnd),
                    check('specialities').exists().withMessage('Son necesarias las especialidades.')
                ]
            case 'update':
                return [
                    user_id, check('education_id').exists().withMessage(text.id('educación')).isNumeric().withMessage(text.numeric),
                ]
        }

    },

    findUserId: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { user_id } = req.params

        try 
        {
            const user = await existById(models.user, user_id)

            var education = await user.getEducation({
                attributes: [ 'id', [ Sequelize.fn('max', Sequelize.col('career.name') ), 'description' ],
                                    [ Sequelize.fn( 'Date_format', Sequelize.col('date_start'), '%Y-%m-%d' ), 'date_start' ],
                                    [ Sequelize.fn( 'Date_format', Sequelize.col('date_end'), '%Y-%m-%d' ), 'date_end' ] ],
                include: [ 
                    { model: models.university },
                    { model: models.career },
                    { model: models.speciality, as: 'toEducationSpecialities' },
                ],
                group: [ 'id', 'career.name', 'toEducationSpecialities.id' ]
            })

            return successful(res, 'Ok', education)

        } catch (error) { return returnError(res, error) }
        
    },

    createEducation: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { user_id, university_name, description, date_start, date_end, specialities } = req.body

        try 
        {    
            const user = await existById(models.user, user_id);
            const university = await createUniversity(university_name)
            const career = await createCareer(description)

            var [ education, created ] = await models.education.findOrCreate({
                    where: { [Sequelize.Op.and]: [
                        { user_id: user.id },
                        { university_id: university.id },
                        { career_id: career.id }
                    ]},
                    defaults: {
                        user_id: user.id,
                        career_id: career.id,
                        date_start: date_start,
                        date_end: date_end,
                        university_id: university.id
                    }
                });

            if (!created) throw(text.duplicateElement)

            var specialities_id = await  Promise.all(specialities.map(async speciality => {
                var speciality_id = await createSpeciality(speciality)
                return await speciality_id.id
            }))

            await education.addToEducationSpecialities(specialities_id)

            return successful(res, text.successCreate('educación'), education)

        } catch (error) { return returnError(res, error) }
        
    },

    updateEducation: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { education_id, user_id, university_name, description, date_start, date_end, specialities } = req.body
        
        try 
        {
            var education = await models.education.findOne({
                where: {
                    [Sequelize.Op.and]: [
                        { id: education_id},
                        { user_id: user_id}
                    ]
                },
                include: [ 
                    { model: models.university, attributes: ['university'] },
                    { model: models.career, attributes: ['name'] },
                ],
            });

            if (!education) throw(text.notFoundElement)

            const university = await createUniversity(university_name || education.university.university)
            const career = await createCareer(description || education.career.name)

            await education.update({
                career_id: career.id,
                date_start: date_start,
                date_end: date_end,
                university_id: university.id
            });

            if (specialities instanceof Array) 
           {
                await models.certification_speciality.destroy({ where: { certification_id: certification.id } })
                var specialities_id = await  Promise.all(specialities.map(async speciality => {
                    var speciality_id = await createSpeciality(speciality)
                    return await speciality_id.id
                }))
    
                await certification.addToEducationSpecialities(specialities_id)
           }

            return successful(res, text.successUpdate('educación'))

        } catch (error) { return returnError(res, error) }
        
    },

    delete: async (req, res) => {

        var errors = validationResult(req);
        if (!errors.isEmpty()) { return returnError(res, text.validationData, errors.array()) }

        const { user_id, education_id } = req.body

        try 
        {
            const education = await models.education.findOne({
                where: { 
                    [Sequelize.Op.and]: [
                        { id: education_id },
                        { user_id: user_id }
                    ]
                }
            })

            if (!education) throw(text.notFoundElement)

            await models.education_speciality.destroy({ where: { education_id: education.id } })
            await education.destroy()

            return successful(res, text.successUpdate('educación'))
            
        } catch (error) { return returnError(res, error) }

    }

}