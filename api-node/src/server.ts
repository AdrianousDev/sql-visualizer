import "dotenv/config";
import express from "express";
import visitorRoutes from "./routes/visitor.routes.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use("/visitors", visitorRoutes);

app.listen(port, () => {
    console.log(`API disponível em http://localhost:${port}`);
});
