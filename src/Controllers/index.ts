import {
  Request,
  Response,
  NextFunction,
} from 'express';
import { model } from 'mongoose';
import ChampScheema from '../Models'

class Controllers{
  public data: Object;

  public getData = async (req?: Request, res?: Response, next?: NextFunction) => {
    // throw new Error("Teste error")
    try{
      const data = await ChampScheema.find();
      return {data: data};
    } catch {
      throw new Error('Error when get data');
    }
  }
}

export default Controllers;