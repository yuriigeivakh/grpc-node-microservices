const grpc = require('grpc');

const greets = require('../server/protos/greet_pb');
const service = require('../server/protos/greet_grpc_pb');

function greet(call, callback) {
    const greeting = new greets.GreetResponse();
    greeting.setResult("hello" + call.request.getGreeting().getFirstname());

    callback(null, greeting);
}

function Main() {
    const server = new grpc.Server();

    server.addService(service.GreetServiceService, { greet });
    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
    server.start();

    console.log('Server is running');
}

Main();