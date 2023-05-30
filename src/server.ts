import mongoose from "mongoose";
import app from "./app";
import config from "./config";
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`🌭 database is connected on port ${config.port}`)
    })
  } catch (error) {
    console.error('Database connection faild',error);
  }
}
main()