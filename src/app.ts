import express, { Application, Response, Request } from "express";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/', (req: Request, res: Response) => {
      res.send("Oi.");
    });
  }
}

export default new App().app;
