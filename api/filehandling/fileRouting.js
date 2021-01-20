const express = require('express');
const router = express.Router();
const fs = require('fs');
const AWS = require('aws-sdk');
const fileUpload = require('./fileModel');
const { json } = require('express');
require('dotenv');

const aws_id = process.env.AWS_ID;
const aws_secret = process.env.AWS_SECRET;
const aws_bucket = process.env.AWS_BUCKET_NAME;

const s3 = new AWS.S3({
  accessKeyId: aws_id,
  secretAccessKey: aws_secret,
});

const uploadFile = (id, fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: aws_bucket,
    Key: userId,
    Body: fileContent,
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    const location = data.Location;
    router.post('/', async (req, res, next) => {
      try {
        await fileUpload.update(location).then(() => {
          res.status(200).json({ message: 'Image Uploaded' });
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error has occurred' });
      }
    });
  });
};

module.exports = uploadFile;
