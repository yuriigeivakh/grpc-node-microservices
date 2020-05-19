const grpc = require('grpc');

const greetsService = require('../server/protos/greet_grpc_pb');
const greets = require('../server/protos/greet_pb');

const calculatorService = require('../server/protos/calculator_grpc_pb');
const calculator = require('../server/protos/calculator_pb');

function callGreetings() {
    const client = new greetsService.GreetServiceClient('localhost:50051', grpc.credentials.createInsecure());

    const request = new greets.GreetRequest();
    const greeting = new greets.Greeting();
    greeting.setFirstname('Yurii');
    greeting.setLastname('H');
    request.setGreeting(greeting);

    client.greet(request, (err, response) => {
        if (err) {
            console.log(err);
        }
        console.log('res', response.getResult());
    });
}

function callSum() {
    const client = new calculatorService.SumServiceClient('localhost:50051', grpc.credentials.createInsecure());
    const sumRequest = new calculator.SumRequest();
    sumRequest.setFirstnumber(10);
    sumRequest.setSecondnumber(15);
    client.sum(sumRequest, (err, response) => {
        if (err) {
            console.log(err);
        }
        console.log('res', response.getSumresult());
    });
    
}

function Main() {
    callGreetings();
    callSum();
}

Main();