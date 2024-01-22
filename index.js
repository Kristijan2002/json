const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

server.get("/ourTeam/:id", (req, res, next) => {
  const teamId = parseInt(req.params.id, 10);
  const member = router.db.get("ourTeam").find({ id: teamId }).value();

  if (member) {
    res.jsonp(member);
  } else {
    res.sendStatus(404);
  }
});

server.use(router);

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
