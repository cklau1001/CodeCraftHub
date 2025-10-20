const app = require('./app');
const serverConfig = require('./config/serverConfig');

app.listen(serverConfig.PORT, () => {
    console.log(`Server running on port ${serverConfig.PORT}`);
});
