
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("fresh");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let newRecipe = await db.collection("recipes").insertOne(bodyObject);
      res.json(newRecipe);
      break;
  }
}