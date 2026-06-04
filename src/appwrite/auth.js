import ENV from  "../config/envConfig.js";
import { Client, Account, ID } from "appwrite"; 


export class AuthService{

  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(ENV.appwriteUrl).setProject(ENV.appwriteProjectId)

    this.account = new Account(this.client)
  }

  async createAccount ({email, password, name}){
    try {

      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      )

      if(user){
        // call another method
        this.login({email, password})
      }else{
        return user;
      }

      return 
    } catch (error) {
      console.error(error);
      ;
    }
  }

  async login({email, password}){
    try {
      return await this.account.createEmailPasswordSession(email, password)
    } catch (error) {
      console.error(error);
      
    }
  }

  async getCurrentUser(){
    try {
      return await this.account.get()
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  async logOut(){
    try {
      return await this.account.deleteSessions()
    } catch (error) {
      console.error(error);
      
    }
  }
};


const authService = new AuthService()

export default authService;
