const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Serve static files (like CSS, JS, images, HTML)
app.use(express.static(path.join(__dirname)));

// ✅ Serve pf.html when visiting the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pf.html"));
});

// ✅ Ensure 'data' folder exists
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// ✅ Handle contact form submissions
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const contact = { name, email, message, date: new Date() };
  const filePath = path.join(dataDir, "contacts.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    let contacts = [];
    if (!err && data) {
      try {
        contacts = JSON.parse(data);
      } catch (parseError) {
        console.error("Error parsing contacts.json:", parseError);
      }
    }
    contacts.push(contact);

    fs.writeFile(filePath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error("Error saving contact:", err);
        return res.status(500).json({ error: "Failed to save message" });
      }
      res.json({ success: "Message received successfully!" });
    });
  });
});

// ✅ Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});