const { boilerplateJS } = require('./boilerplateJS');
const { fetchProbAndTestCases } = require('../controllers/problemController.js');

const languages = ['js', 'py', 'go'];

const problemAndCode = async (language, problem, code) => {
  let lang = null;
  let prob = null;

  if (languages.includes(language)) {
    lang = language;
  }

  try {
    const probData = await fetchProbAndTestCases(problem);
    if (!probData) {
      console.log('❌ Problem not found in database');
      return;
    }

    const testCases = probData.test_cases;

    if (lang && testCases) {
      if (lang === 'js') {
        testCases.forEach((test) => {
          const params = [...test.input, test.output];
          boilerplateJS(problem, code, params);
        });
      }
    } else {
      console.log("Invalid language or problem name");
    }
  } catch (err) {
    console.log("Error fetching problem or running code:", err);
  }
};

module.exports = { problemAndCode };
