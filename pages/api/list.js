import clientPromise from "../../lib/mongodb";
import {ObjectId} from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("fresh");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let listItem = await db.collection("list").insertMany(bodyObject);
      res.json(listItem);
      break;
    case "GET":
      const list = await db.collection("list").find({}).toArray();
      res.json({ status: 200, data: list });
      break;
  }
}