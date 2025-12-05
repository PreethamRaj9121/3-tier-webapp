const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB connection
const MONGO_URL = "mongodb+srv://myuser:mypassword123@three-tier-db.ttyh5om.mongodb.net/?appName=three-tier-db";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

// ✅ Test model
const TestSchema = new mongoose.Schema({ message: String });
const Test = mongoose.model("Test", TestSchema);

// ✅ API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK ✅", mongo: mongoose.connection.readyState });
});

// ✅ Example Insert API
app.post("/api/add", async (req, res) => {
  const doc = await Test.create({ message: req.body.message });
  res.json(doc);
});

// ✅ Example Fetch API
app.get("/api/data", async (req, res) => {
  const docs = await Test.find();
  res.json(docs);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));

