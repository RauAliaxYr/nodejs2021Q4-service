import * as uuid from "uuid";
/**
 * The main model of user.
 */
class User {
  id:string
  name:string|null
  login:string|null
  password:string|null

  constructor(name:string,login:string,password:string) {

    this.id = uuid.v4();
    this.name = name
    this.login = login
    this.password = password
  }

  static toResponse(user:User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export {User}