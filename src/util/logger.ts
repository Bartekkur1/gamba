import * as log4js from 'log4js';

log4js.configure({
    appenders: {
        out: {
            type: 'stdout',
            layout: {
                type: 'basic'
            }
        },
        file: {
            type: 'file',
            filename: 'gamba.log'
        }
    },
    categories: {
        default: { appenders: ['out', 'file'], level: 'debug' }
    }
});

export default log4js.getLogger();