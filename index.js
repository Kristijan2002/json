const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");

const SECURE_KEY = "a2b6PuNHHQHC1Ds"; // Replace with your actual secure key

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(cors());
server.options("*", cors()); // Enable CORS for all routes
server.use(jsonServer.bodyParser);
server.use(middlewares);

// Secure key authentication middleware
server.use(async (req, res, next) => {
  const requestSecureKey = req.query.key;

  if (requestSecureKey !== SECURE_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Your custom logic here, if needed
  await next();
});

server.use(router);

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
