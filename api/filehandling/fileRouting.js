const express = require('express');
// const authRequired = require('../middleware/authRequired');
// const fileModel = require('./fileModel');
const router = express.Router();
const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv');

const aws_id = process.env.AWS_ID;
const aws_secret = process.env.AWS_SECRET;
const aws_bucket = process.env.AWS_BUCKET_NAME;

const s3 = new AWS.S3({
  accessKeyId: 'AKIAJQ5FVCS7C4BTQRSA',
  secretAccessKey: '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',
});

const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: 'expressgroomerteambstorage',
    // Replace filename with userID
    Key: 'user_id',
    Body: fileContent,
  };
  // console.log(
  //   'Environmental Variables',
  //   AWS.S3.accessKeyId,
  //   AWS.S3.secretAccessKey
  // );

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    router.post('/', async (req, res, next) => {
      // Add url to the database
    });
  });
};

uploadFile('cat.jpg');
