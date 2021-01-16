import express, { NextFunction } from 'express';
import Controllers from './Controllers';
import bodyParser from 'body-parser';
import cors from 'cors';

class Server{
  public express: express.Application;
  public controllers: Controllers
  public constructor() {
    this.express = express();
    this.controllers = new Controllers();
    this.express.use(cors());
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

    this.express.post('/check', bodyParser.json(), async (req: express.Request, res: express.Response) => {
      console.log(req.headers['x-acess-token']);
      res.send(await this.controllers.checkToken(req.headers['x-acess-token'].toString()));
    })
  }

}

export default new Server().express;
