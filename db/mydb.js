import { MongoClient} from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

class MyMongoDB {
  constructor() {
    this.client = new MongoClient(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async connectDatabase() {
    try {
      await this.client.connect();
      this.db = this.client.db();
    } catch (error) {
      throw error;
    }
  }

  async connectDel() {
    try {
      await this.client.connect();
      this.db = this.client.db();
    } catch (error) {
      throw error;
    }
  }

  async submitReservation(name, phone, date, time, people, special) {
    try {
      await this.connectDatabase();
      await this.db.collection("reservations").insertOne({
        name: name,
        phone: phone,
        date: date,
        time: time,
        people: people,
        special: special,
      });
      this.client.close();
    } catch (error) {
      throw error;
    }
  }

  async getReservations(name, phone) {
    try {
      await this.connectDatabase();
      const reservations = await this.db
        .collection("reservations")
        .find({ name, phone })
        .toArray();
      this.client.close();
      return reservations;
    } catch (error) {
      throw error;
    }
  }

  async updateReservation(name, phone, updatedData) {
    try {
      await this.connectDatabase();
      const reservations = this.db.collection("reservations");
      const filter = { name, phone };
      const updateDoc = {
        $set: updatedData,
      };
      const result = await reservations.updateOne(filter, updateDoc);
      this.client.close();
      return result.modifiedCount > 0;
    } catch (error) {
      throw error;
    }
  }

  async deleteReservation(name, phone) {
    try {
      await this.connectDatabase();
      const reservations = this.db.collection("reservations");
      const filter = { name, phone };
      const result = await reservations.deleteOne(filter);
      this.client.close();
      return result.deletedCount;
    } catch (error) {
      throw error;
    }
  }
}

const mydb = new MyMongoDB();
export default mydb;
