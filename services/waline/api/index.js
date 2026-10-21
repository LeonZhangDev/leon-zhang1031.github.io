const handler = require('@waline/vercel')();

// Preserve the recovered service's suppression of SQL connection info logs.
global.think.logger.info = () => undefined;

module.exports = handler;
