import express, { NextFunction } from 'express';
import Controllers from './Controllers';
import bodyParser from 'body-parser'

class Server{
  public express: express.Application;
  public controllers: Controllers
  public constructor() {
    this.express = express();
    this.controllers = new Controllers();
    this.routes();
  }



  private routes = async () => {
    this.express.get('/champions', async(req: express.Request, res: express.Response) => {
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

    this.express.post('/register', bodyParser.json(), async (req: express.Request, res: express.Response) => {
      res.send(await this.controllers.registerUser(req.body));
    });

    this.express.post('/login', bodyParser.json(), async (req: express.Request, res: express.Response) => {
      res.send(await this.controllers.login(req.body));
    })
  }

}

export default new Server().express;
