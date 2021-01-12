import express from 'express';
import Controllers from './Controllers';

class Server{
  public express: express.Application;
  public controllers: Controllers

  public constructor() {
    this.express = express();
    this.controllers = new Controllers();
    this.routes();
  }

  private routes = async () => {
    this.express.get('/', async(req: express.Request, res: express.Response) => {
      try {
        const data = await this.controllers.getData();
        res.send(data);
      } catch (error) {
        res.json({data: {
          message: "error when get data"
        }})
      }
    })

    this.express.get('/version', (req: express.Request, res: express.Response) => {
      res.send("v0.0.1");
    })
  }

}

export default new Server().express;
