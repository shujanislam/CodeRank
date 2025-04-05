
const { boilerplateJS } = require('./boilerplateJS');

const languages = ['js', 'py', 'go'];

const problems = {
  'add': ['1', '2'],         // example: add(a, b)
  'subtract': ['3', '1'],    // example: subtract(a, b)
};

const problemAndCode = (language, problem, code) => {
  let lang = null;
  let prob = null;

  if (languages.includes(language)) {
    lang = language;
  }

  if (problems.hasOwnProperty(problem)) {
    prob = problem;
  }

  if (lang && prob) {
    if (lang === 'js') {
      // Get the parameters for the problem
      const params = problems[prob]; // e.g., ['a', 'b']
      boilerplateJS(prob, code, params);
    }

    // You can later add Python and Go versions here
    // if (lang === 'py') { ... }
  } else {
    console.log("Invalid language or problem name");
  }
};

module.exports = { problemAndCode };
