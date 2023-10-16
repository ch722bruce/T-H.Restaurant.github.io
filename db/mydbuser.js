/* eslint-disable no-useless-catch */
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const mydbuser = {
  async connectDatabase() {
    try {
      const client = new MongoClient(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const db = client.db();

      return { client, db };
    } catch (error) {
      throw error;
    }
  },

  async purchaseGiftCard(name, cardNumber, cvv, amount) {
    try {
      const { db, client } = await mydbuser.connectDatabase();

      // Insert gift card purchase details into the database
      await db.collection("giftCards").insertOne({
        name: name,
        cardNumber: cardNumber,
        cvv: cvv,
        amount: amount,
      });

      client.close();
    } catch (error) {
      throw error;
    }
  },

  async checkGiftCardBalance(name, cardNumber) {
    try {
      const { db, client } = await mydbuser.connectDatabase();

      // Query the gift card based on "name" and "cardNumber"
      const giftCard = await db
        .collection("giftCards")
        .findOne({ name, cardNumber });

      client.close();

      if (giftCard) {
        return { balance: giftCard.amount };
      } else {
        return { balance: 0 }; // Card not found
      }
    } catch (error) {
      throw error;
    }
  },
};

export default mydbuser;
