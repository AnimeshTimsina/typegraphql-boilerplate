import { ExpressContext } from "apollo-server-express"

import Container, { Service } from "typedi"
import { UserService } from "./userService"


@Service()
export class authUtilService {
  constructor(
    private userService: UserService
  ){}


  getUser:(c:ExpressContext)=>any= async (ctx:ExpressContext) => {
      const authHeader = (ctx.req).get('Authorization')
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '')        
      }
    }
}

export const authUtil = Container.get(authUtilService)
