import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("fresh");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      console.log(bodyObject)
      let r = await db.collection("plan").insertOne(bodyObject);
      res.json(r);
      break;
    case "GET":
      const plan = await db.collection("plan").find({}).toArray();
      res.json({ status: 200, data: plan });
      break;
  }
}