// pm2 config for the Electrique Valley API.
// Start:  pm2 start deploy/ecosystem.config.js   (run as the ubuntu user, never with sudo)
// Then:   pm2 save
const path = require('path');

module.exports = {
    apps: [
        {
            name: 'electriquevalley-api',
            // The API reads .env and the video folder relative to its working directory.
            cwd: path.join(__dirname, '..', 'server'),
            script: 'dist/index.js',
            env: { NODE_ENV: 'production' },
            max_memory_restart: '300M',
            time: true, // timestamps in pm2 logs
        },
    ],
};
