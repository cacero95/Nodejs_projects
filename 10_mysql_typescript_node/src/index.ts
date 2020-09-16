import Server from './server/server';
import router from './router/router';
import Mysql from './mysql/mysql';

const server = Server.init(3000);
server.app.use(router);
//Mysql.instance;
server.start();