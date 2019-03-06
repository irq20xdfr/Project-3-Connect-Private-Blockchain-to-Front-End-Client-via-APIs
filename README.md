# REST API for a private blockchain implementation using JavaScript, NodeJS, hapi.js and levelDB

Blockchain has the potential to change the way that the world approaches data. Develop Blockchain skills by understanding the data model behind Blockchain by developing your own simplified private blockchain.
This projects provides a easy way to communicate with the private NodeJS blockchain, allowing clients to request block data for a given height and to create new blocks.

## NodeJS

This project depends on NodeJS to work, you can download it and install it for your platform from [here](https://nodejs.org/es/download/) 

## Install node packages

`npm install`

## Install dependencies

All the necessary packages are automatically installed by npm based on the package.json file

### Dependencies

1. [boom v7.3.0](https://github.com/hapijs/boom) for easy hapi.js exception handling
2. [crypto-js v3.1.9-1](https://www.npmjs.com/package/crypto-js) to generate SHA256 hashes and crypto related functionality
3. [hapi v18.1.0](https://hapijs.com/) NodeJS framework to create REST API
4. [level v4.0.0](https://www.npmjs.com/package/level) Fast & simple storage. A Node.js-style LevelDB wrapper.

## Running the server

The server runs on localhost, port 8000. To execute the NodeJS app run the following

`node BlockAPI.js`

The server and port are showed in the console, as well as the current Blockheight

```
Server running at: http://localhost:8000
Current Blockchain Height 0
```


## API

Currently, the API supports two methods:

* http://localhost:8000/api/block/{index} Get block by height - **GET**  - Return a JSON representation of the block with the height passed as parameter<br />

#### Response example

```
{
"hash": "8b43a6453a8e26cd28bc186e7adf76221005f20e50d0ee9f741faf7bb088d54e",
"height": 2,
"body": "datos2",
"time": "1551744127",
"previousBlockHash": "9e626346fe4f6024e79bf859864837d62df6814e6b7c48249f1feef824a6811d"
}
```

If an out-of-bounds height is passed, server responds with a 404 HTTP code
```
{
"statusCode": 404,
"error": "Not Found",
"message": "Block not found."
}
```

* http://localhost:8000/api/block/ Creates a new block in the chain - **POST** - Creates a new block with the data passed in the body property of JSON Object sent in the request and returns the new block as response with 201 Create HTTP Code <br />

#### Example of JSON sent in the body request

```
{"body":"data for the block"}
```

It is important to indicate the _content-type_ header as _application/json_

#### New block method response example

```
{  
   "hash":"e32c7fdf49cdf878e690bcfa9dc568f71795e56d55aece0945067e8ba7496bd6",
   "height":7,
   "body":"data for the block",
   "time":"1551829104",
   "previousBlockHash":"cdbe67d80e9f865875eecf58cd5960d2967473bd8665a817d741c35e3a86964d"
}
```
If there's no a valid JSON object sent in the request, the server responds with a 400 HTTP code
```
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "You have to specify a valid json object with a body property."
}
```
## Authors
* [Daniel Fragoso](https://www.linkedin.com/in/daniel-fragoso-67631596/)

## License
This project is licensed under the MIT License, for more information refer to the [LICENSE.md](LICENSE.md) file

## Acknowledgements

I would like to thank to all of the Udacity team 

Specially to the instructors in the following courses that helped me to make this project possible

* Udacity Blockchain Developer Nanodegree Program (https://www.udacity.com/course/blockchain-developer-nanodegree--nd1309)
* Designing RESTful APIs (https://www.udacity.com/course/designing-restful-apis--ud388)
* Writing READMEs (https://www.udacity.com/course/writing-readmes--ud777)