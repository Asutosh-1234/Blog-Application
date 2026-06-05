import ENV from "../config/envConfig";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service{
  client = new Client();
  database;
  bucket;

  constructor(){
    this.client.setEndpoint(ENV.appwriteUrl).setProject(ENV.appwriteProjectId)

    this.database = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  async createPost({title, slug, content, featuredImage, status, userId}){

    try {
      return await this.database.createDocument(
        ENV.appwriteDatabaseId,
        ENV.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId
        }
      )
    } catch (error) {
      console.error(error);
    }
  }

  async updatePost(slug,{title,content,featuredImage,status}){
    try {
      return await this.database(ENV.appwriteDatabaseId,
        ENV.appwriteCollectionId,
        slug,{
          title,
          content,
          featuredImage,
          status
        }
      )
    } catch (error) {
      console.error(error);
      
    }
  }

  async deletePost(slug){
    try {
      await this.database.deleteDocument(
        ENV.appwriteDatabaseId,
        ENV.appwriteCollectionId,
        slug
      ) 

      return true
    } catch (error) {
      console.error(error);
      return false
    }
  }

  async getPost(slug){
    try {
      return await this.database.getDocument(
        ENV.appwriteDatabaseId,
        ENV.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.error(error);
      return false
    }
  }

  async getPosts(queries = [Query.equal('status','equal')]){
    try {
      return await this.database.listDocuments(
        ENV.appwriteDatabaseId,
        ENV.appwriteCollectionId,
        [
          queries
        ]
      )
    } catch (error) {
      console.error(error);
      return false
    }
  }

  // file upload services
  async uploadFile(file){
    try {
      return await this.bucket.createFile(
        ENV.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
      console.error(error);
      return false
    }
  }

  async deleteFile(fileId){
    try {
      await this.bucket.deleteFile(
        ENV.appwriteBucketId,
        fileId
      )

      return true
    } catch (error) {
      console.error(error);
      
    }
  }

  getFIlePreview(fileId){
    return this.bucket.getFilePreview(
      ENV.appwriteBucketId,
      fileId
    )
  }
}

const service = new Service();
export default service;