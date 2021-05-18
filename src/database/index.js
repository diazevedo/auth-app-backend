import mongoose from "mongoose";

class Database {
  constructor() {
    this.mongo();
  }

  async mongo() {
    this.mongoConnection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });

    this.mongoose = mongoose;

    this.gfs = new mongoose.mongo.GridFSBucket(this.mongoose.connection.db, {
      bucketName: "profile-images",
    });
  }

  async getFile(userId) {
    return new Promise((resolve, reject) => {
      this.gfs
        .find(
          {
            "metadata.userId": userId,
          },
          { sort: { uploadDate: -1 } }
        )
        .toArray((err, files) => {
          if (!files || files.length === 0) {
            reject(err);
          }

          resolve(files[0]);
        });
    });
  }

  async stream_file(filename) {
    return new Promise((resolve, reject) => {
      this.gfs
        .find({
          filename: filename,
        })
        .toArray((err, files) => {
          if (!files || files.length === 0) {
            reject("file not found");
          }

          resolve(this.gfs.openDownloadStreamByName(filename));
        });
    });
  }
}

export default new Database();
