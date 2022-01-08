const qn = require('qiniu')
var accessKey = 'tCtyvBZG6Z1BgchTf7cBb1PskRSrgiFTw7E6kbGq'
var secretKey = 'vRe5BCgITnAUFfLnYw2OliPXXsB6qesOVrRVdGZI'
var mac = new qn.auth.digest.Mac(accessKey, secretKey)
var options = {
  scope: 'emoji-img'
}
var putPolicy = new qn.rs.PutPolicy(options)
console.log(putPolicy.uploadToken(mac))
