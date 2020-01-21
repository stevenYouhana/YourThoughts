const api = 'https://ipapi.co/json/';

module.exports.getLocation = function(app) {
  console.log("getLocation = function(app)>>>>")
  app.get(api, function(req, res) {

    console.log("app.get(api, function(req, res): ", req.body);
  })
}
