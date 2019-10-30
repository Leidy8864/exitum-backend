const AWS = require('aws-sdk');

const uuid = require('node-uuid');

const config = require('../config/index');

const helper = require('../libs/helper');

AWS.config.update({
    region: config.aws.s3.REGION,
    accessKeyId: config.aws.s3.ACCESS_KEY,
    secretAccessKey: config.aws.s3.SECRET_KEY
});

const s3Bucket = new AWS.S3();

module.exports = {

    putObject: (bucket, file) => {

        var fileName = helper.generateFileName(file);

        var params = {
            Bucket: bucket,
            Body: file.data,
            Key: fileName
        }
        s3Bucket.putObject(params, function (err, data) {
            if (err) {
                console.log('Error al subir el objeto', err.stack);
                throw new Error('Error al subir objeto');
            } else {
                console.log("Objeto subido correctamente");
                return data;
            }
        });
        return 'https://techie-exitum.s3-us-west-1.amazonaws.com/' + bucket + '/' + fileName;
    },

    deleteObject: (bucket, key) => {
        var params = {
            Bucket: bucket,
            Key: key
        }
        return s3Bucket.deleteObject(params, function (err, data) {
            if (err) {
                console.log("ERROR in callback", err);
                throw new Error('Error al eliminar objeto');
            } else {
                console.log("Objeto eliminado correctamente");
                return data;
            }
        });
    },

    downloadObject: (bucket, key) => {
        var params = {
            Bucket: bucket,
            Key: key
        }

        return s3Bucket.getObject(params)
            .createReadStream(key)
            .on('error', function (err) {
                res.status(500).json({ error: "Error -> " + err });
            })
    },
    
    getObject: (bucket, key) => {

        var params = {
            Bucket: bucket,
            Key: key
        }

        return s3Bucket.getObject(params).createReadStream();

    }
}