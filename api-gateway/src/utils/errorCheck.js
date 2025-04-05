
const bannedPatterns = [
  'while(true)',
  'while (true)',
  'for(;;)',
];

const errorCheck = (code) => {
  for(const pattern of bannedPatterns){
    if(code.includes(pattern)){
      return true;
    }
    else{
      return false;
    }
  }
}

module.exports = { errorCheck };
