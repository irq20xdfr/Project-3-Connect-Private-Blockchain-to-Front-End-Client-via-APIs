const Hapi=require('hapi');

/**
* Class to create and initialize hapi.js server and its controllers based on the Examples provided in the Blockchain Developer Nanodegree Blockchain Web Services module
*
*/
class BlockAPI {

constructor() {
    this.server = Hapi.Server({
        port: 8000,
        host: 'localhost'
    });
    this.initControllers();
    this.start();
}

//Initializes hapi.js controllers 
initControllers() {
		require("./BlockController.js")(this.server);
}

// Function to start the server
async start() {
    await this.server.start();
    console.log(`Server running at: ${this.server.info.uri}`);
}
}

new BlockAPI();