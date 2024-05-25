import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



// -r dotenv/config: The -r flag stands for --require. It tells Node.js to require a module before running the script. In this case, it is requiring dotenv/config. The dotenv module is used to load environment variables from a .env file into process.env. By using dotenv/config, it automatically loads the .env configuration without needing to manually call require('dotenv').config() in your code.

// --experimental-json-modules: This flag enables experimental support for JSON modules in Node.js. Normally, Node.js requires the .js or .mjs file extension to load modules. With this flag, you can directly import JSON files as modules using the import statement.


const MongoDBConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `MONGO DB is Connected Successfully ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error in the MONGO DB connection");
    process.exit(1);
    throw error;
  }
};

export default MongoDBConnect;
