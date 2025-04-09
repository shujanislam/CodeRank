const express = require('express');

const app = express();

const { Kafka } = require('kafkajs');

const { problemAndCode } = require('./utils/problemAndCode');

const kafka = new Kafka({
  clientId: 'api-server',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'executor-group' });

const fetchCode = async() =>{
  await consumer.connect();

  await consumer.subscribe({ topic: 'code-submissions', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const submission = JSON.parse(message.value.toString());
     
      problemAndCode(submission.language, submission.problem, submission.code);

    },
  })
}

fetchCode();

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log('Running on PORT: 8081');
})
