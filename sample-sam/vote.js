
exports.handler = (event, context, callback) => {
  console.log(event)
  console.log(process.env.TABLE_NAME)
  callback(null, "Hello Local SAM")
}