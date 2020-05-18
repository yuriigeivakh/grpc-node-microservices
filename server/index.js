const grpc = require('grpc');

function Main() {
    const server = new grpc.Server();

    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
    server.start();

    console.log('Server is running');
}

Main();