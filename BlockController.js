const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./Block.js');

const Block = require('./Block.js');
const Blockchain = require('./Blockchain.js');
const Boom = require('boom');

/**
 * Controller Definition to make routes work with blocks based on the Examples provided in the Blockchain Developer Nanodegree Blockchain Web Services module
 */
class BlockController {

    /**
     * Constructor to create a new BlockController.
     * @param {*} server 
     */
    constructor(server) {
        this.server = server;
        this.blocks = [];
        this.initializeBlockchain();
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * GET Controller to get a Block by its height, url: "/api/block/:index"
     */
    async getBlockByIndex() {
        this.server.route({
            method: 'GET',
            path: '/api/block/{index}',
            handler: async (request, h) => {
                let block = await this.blockChain.getBlock(request.params.index);
                if(!block){
                    throw Boom.notFound("Block not found.");
                }else{
                    return block;
                }
            }
        });
    }

    /**
     * POST Controller to create a new Block, url: "/api/block"
     */
    postNewBlock() {
        this.server.route({
            method: 'POST',
            path: '/api/block',
            handler: async (request, h) => {
                if(request.payload==undefined || request.payload.length==0 || !request.payload.body){
                    throw Boom.badRequest("You have to specify a valid json object with a body property.");
                }
                let newBlock = new Block.Block(request.payload.body);
                let blockData = await this.blockChain.addBlock(newBlock);
                return h.response(blockData).code(201);
            }
        });
    }

    /**
     * Method to initialize a Mock dataset or connect to the levelDB Blockchain, based an a environment variable. Thanks to @StefanelS for this suggestion
     */
    initializeBlockchain() {
       if(process.env.NODE_ENVTEST!=undefined){
            if(this.blocks.length === 0){
                for (let index = 0; index < 10; index++) {
                    let blockAux = new BlockClass.Block(`Test Data #${index}`);
                    blockAux.height = index;
                    blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
                    this.blocks.push(blockAux);
                }
            }
        }else{
            this.blockChain = new Blockchain.Blockchain();
        }
    }

}

/**
 * Exporting the BlockController class
 * @param {*} server 
 */
module.exports = (server) => { return new BlockController(server);}