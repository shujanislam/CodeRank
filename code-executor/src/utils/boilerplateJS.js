
const boilerplateJS = (prob, code, params) => {
  const wholeCode = `
    function execute(a, b){
      ${code}
    };

    execute(${params});`;

  console.log(wholeCode);
}

module.exports = { boilerplateJS };
