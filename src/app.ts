import express, { Application } from "express";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {}

  private routes(): void {}
}

export default new App().app;
