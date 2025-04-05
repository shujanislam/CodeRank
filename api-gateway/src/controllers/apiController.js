
const { errorCheck } = require('../utils/errorCheck');

const { submitCode } = require('../utils/submitCode');

const apiController = (language, problem, code) =>{
  if(errorCheck(code) == true){
    console.log('error');
  }
  else{ 
    submitCode(language, problem, code);
  }
}

module.exports = { apiController };
