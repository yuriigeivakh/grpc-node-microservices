const grpc = require('grpc');

const service = require('../server/protos/greet_grpc_pb');
const greets = require('../server/protos/greet_pb');

function Main() {
    const client = new service.GreetServiceClient('localhost:50051', grpc.credentials.createInsecure())

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

Main();