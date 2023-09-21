import app from './app';
import ServerBootstrap from './bootstrap/server.bootstrap';


(async () => {
  const serverBootstrap = new ServerBootstrap(app);
  try {
  
    await serverBootstrap.initialize();
      console.log('Databases is running');
  } catch (err) {
    console.log(err);
 
    serverBootstrap.close();
    process.exit(1);
  }
})();