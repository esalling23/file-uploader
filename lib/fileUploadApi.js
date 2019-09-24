require('dotenv').config()

// Require AWS SDK for Node.js
const AWS = require('aws-sdk')
// Config AWS to use our region
AWS.config.update({ region: 'us-east-1' })
// Create S3 service object
const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

module.exports = (key, file) => {
  // Creating a promise to be run
  return new Promise((resolve, reject) => {
    // Building an object with parameters for S3 upload
    // Included: `Bucket` name, `Key` (file name), `Body` (file data)
    // and `ACL` to control access (in this case, public read)
    const uploadParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Body: file,
      ACL: 'public-read'
    }

    // Used the `upload` method to upload to S3 using params
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        reject(err) // reject error
      } else {
        resolve(data) // resolve with data
      }
    })
  })
}
