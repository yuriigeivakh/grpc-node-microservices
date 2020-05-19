const grpc = require('grpc');

const greets = require('../server/protos/greet_pb');
const greetsService = require('../server/protos/greet_grpc_pb');

const calculator = require('../server/protos/calculator_pb');
const calculatorService = require('../server/protos/calculator_grpc_pb');

function greet(call, callback) {
    const greeting = new greets.GreetResponse();
    const firstName = call.request.getGreeting().getFirstname();
    const lastName = call.request.getGreeting().getLastname();
    greeting.setResult(`hello ${firstName} ${lastName}`);

    callback(null, greeting);
}

function greetManyTimes(call, callback) {
    const firstName = call.request.getGreeting().getFirstname();
    let count = 0;
    let intervalID = setInterval(() => {
        const greeting = new greets.GreetManyTimesResponse();
        greeting.setResult(firstName);
        call.write(greeting);
        call.end();
        if (++count > 9) {
            clearInterval(intervalID);
            call.end();
        }
    }, 1000);

    callback(null, greeting);
}

function sum(call, callback) {
    const sumResponse = new calculator.SumResponse();
    sumResponse.setSumresult(call.request.getFirstnumber() + call.request.getSecondnumber());

    callback(null, sumResponse);
}

function Main() {
    const server = new grpc.Server();

    server.addService(greetsService.GreetServiceService, { greet, greetManyTimes });
    server.addService(calculatorService.SumServiceService, { sum });
    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
    server.start();

    console.log('Server is running');
}

Main();