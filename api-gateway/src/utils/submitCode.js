const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'api-server',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const submitCode = async (language, problem, code) => {
  await producer.connect();

  const submission = {
      language,
      problem,
      code,
      submittedAt: new Date().toISOString(),
    };

  await producer.send({
    topic: 'code-submissions',
    messages: [{
      value: JSON.stringify(submission), 
    },
    ],
  });

  console.log(submission);

  console.log('working')
}

module.exports = { submitCode };
