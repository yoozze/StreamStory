var fs = require('fs');
var bunyan = require('bunyan');
var logformat = require('bunyan-format');
var fields = require('./fields.js');

var confFile = process.argv[2];

console.log('Reading configuration file: ' + confFile);
var configStr = fs.readFileSync(confFile);
var config = JSON.parse(configStr);

//================================================================
// LOG
//================================================================
global.log = bunyan.createLogger({
	name: 'ProaSense',
	stream: logformat({ 
		outputMode: 'short',
		out: process.stdout
	}),
	level: config.log.level
});

//================================================================
// INITIALIZATION
//================================================================
exports.INITIALIZE_ZERO = false;

//================================================================
// SERVER
//================================================================
exports.SERVER_PORT = config.server.port;
exports.WWW_DIR = '../ui';
exports.PING_INTERVAL = config.server.pingInterval;

//================================================================
// QMINER
//================================================================
global.QM_MODULE_PATH = config.qminer.path;
exports.QM_CREATE_PIPELINE = config.qminer.createPipeline;
exports.QM_DATABASE_PATH = config.qminer.dbPath;
exports.QM_DATABASE_MODE = config.qminer.mode;

global.qm = require(QM_MODULE_PATH);

// configure the stores

//================================================================
// REPLAY
//================================================================
exports.REPLAY_DATA = config.replay;

//================================================================
// STREAM STORY
//================================================================
exports.STREAM_STORY_FNAME = config.models.SSFName;

exports.STREAM_STORY_PARAMS = {
	transitions: {
		type: 'continuous',
		timeUnit: 'hour'
	},
	clustering: {
		type: 'dpmeans',
		lambda: 0.4,
		minClusts: 10,
		rndseed: 1,
		sample: 1,
		histogramBins: 20
	},
	pastStates: 2,
	verbose: true
};

//================================================================
// INTEGRATION
//================================================================

exports.useBroker = config.integration == 'broker';

//================================================================
// PRINT
//================================================================
log.info('Configured!');
log.info('================================================');
log.info('Working directory: %s', process.cwd());
log.info('Module path: %s', QM_MODULE_PATH);
log.info('Mode: ' + config.qminer.mode);
log.info('================================================');
