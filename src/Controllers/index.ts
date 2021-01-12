import {
  Request,
  Response,
  NextFunction,
} from 'express';
import { ChampModel, UserModel } from '../Models'
import * as jsonWebToken from 'jsonwebtoken'

interface UserData{
  name: String,
  email: String,
  password: String
}

class Controllers{
  public data: Object;

  public getData = async (req?: Request, res?: Response, next?: NextFunction) => {
    // throw new Error("Teste error")
    try{
      const data = await ChampModel.find();
      return {data: data};
    } catch {
      throw new Error('Error when get data');
    }
  }

  public registerUser = async(user: UserData): Promise<Object> => {
    const userName = user.name;
    const userEmail = user.email;
    const userPassword = user.password


    try{
      let nameInUse = await UserModel.find({ name: userName })
      let emailInUse = await UserModel.find({ email: userEmail })

      nameInUse = nameInUse.length > 0 ? true : false;
      emailInUse = emailInUse.length > 0 ? true : false;

      if(nameInUse) return {"error": "user name is already in use"}
      if(emailInUse) return {"error": "email is already in use"}

      const newUser = new UserModel({name: userName, email: userEmail, password: userPassword});
      try {
        // return await newUser.save();
        await newUser.save();
        return {"message": "novo usuário criado com sucesso"}
      } catch {
        return {"erro": "erro ao criar usuário"};
      }

    }catch{
      return {"erro": "erro interno"}
    }
  }

  public async login(user: UserData) {
    const userEmail = user.email;
    const userPassword = user.password;

    try{
      let alreadyUser = await UserModel.find({ email: userEmail });
      const emailExist = alreadyUser.length > 0 ? true : false;
      if(!emailExist) return {"message": "no user founds"}
      if(alreadyUser[0].password != userPassword) return {"message": "invalid password"}


      const secret = process.env.TOKEN_SECRET;
      const id = alreadyUser[0]._id; 
      const token = jsonWebToken.sign({id}, secret, {
        expiresIn: 300
      })
      
      return {"logged": true, "message": "logged", "token": token}

    } catch {
      return {"erro": "erro interno"}
    }
  }

  public async checkToken(token: string) {
    if(!token) return {"message": "invalid token"}
    const secret = process.env.TOKEN_SECRET;
    try {
      jsonWebToken.verify(token, secret);
      return {"message": "valide token"}
    } catch{
      return { "message": "invalide token" }
    }
  }
}

export default Controllers; 