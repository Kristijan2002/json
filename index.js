const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(cors());
server.options("*", cors()); // Enable CORS for all routes
server.use(jsonServer.bodyParser);
server.use(middlewares);

// Async function as middleware
server.use(async (req, res, next) => {
  // Your custom logic here, if needed
  await next();
});

server.use(router);

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
