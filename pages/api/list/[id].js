import clientPromise from '../../../lib/mongodb';
import {ObjectId} from 'mongodb';

export default async function handler(req, res) {
  const id = req.query.id;
  const client = await clientPromise;
  const db = client.db("fresh");
  console.log(id)
  switch (req.method) {
    case "DELETE":
      let deletedItem = await db.collection("list").deleteOne({_id: ObjectId(id)});
      console.log(deletedItem);
      res.send(deletedItem);
  }
}