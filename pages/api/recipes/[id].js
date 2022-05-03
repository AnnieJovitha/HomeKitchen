import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db("fresh");
  switch (req.method) {
    case "GET":
      const recipe = await db.collection("recipes").find({id: id}).toArray();
      res.json({ status: 200, data: recipe[0] });
      break;
  }
}