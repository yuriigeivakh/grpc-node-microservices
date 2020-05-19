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

function sum(call, callback) {
    const sumResponse = new calculator.SumResponse();
    sumResponse.setSumresult(call.request.getFirstnumber() + call.request.getSecondnumber());

    callback(null, sumResponse);
}

function Main() {
    const server = new grpc.Server();

    server.addService(greetsService.GreetServiceService, { greet });
    server.addService(calculatorService.SumServiceService, { sum });
    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
    server.start();

    console.log('Server is running');
}

Main();