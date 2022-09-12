import * as express from 'express';
import * as cors from 'cors';
import ErrorHandler from './middleware/error.middleware';
import 'express-async-errors';
import {
  routerUser,
  routerTeam,
  routerMatch,
  routerLeaderboard,
} from './routes/index';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.routes();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private corsConfig():void {
    const options: cors.CorsOptions = {
      methods: 'GET, OPTIONS, POST, DELETE, PUT, PATCH',
      origin: '*',
    };

    this.app.use(cors(options));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.corsConfig();
    this.app.use(ErrorHandler);
  }

  private routes(): void {
    this.app.use(routerUser);
    this.app.use(routerTeam);
    this.app.use(routerMatch);
    this.app.use(routerLeaderboard);
  }

  private errorMiddleware(): void {
    this.app.use(ErrorHandler);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
