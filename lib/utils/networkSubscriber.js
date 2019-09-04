const request = require('superagent');

module.exports = () => {
  return request
    .post('http://temp.alchemycodelab.io/subscribe')
    .send({ url: process.env.HOST })
    .then(res =>{
      console.log(res.body);
    });
};
