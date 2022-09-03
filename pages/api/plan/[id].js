import clientPromise from '../../../lib/mongodb';
import {ObjectId} from 'mongodb';

export default async function handler(req, res) {
  const id = req.query.id;
  const client = await clientPromise;
  const db = client.db("fresh");
  switch (req.method) {
    case "DELETE":
      let deletedItem = await db.collection("plan").deleteOne({recipeId: id});
      res.send(deletedItem);
  }
}