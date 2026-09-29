import { Router } from "express";
import {
    createVisitor,
    deleteVisitor,
    getVisitorById,
    listVisitors,
    updateVisitor,
} from "../controllers/visitor.controller.js";

const visitorRoutes = Router();

visitorRoutes.post("/", createVisitor);
visitorRoutes.get("/", listVisitors);
visitorRoutes.get("/:id", getVisitorById);
visitorRoutes.put("/:id", updateVisitor);
visitorRoutes.delete("/:id", deleteVisitor);

export default visitorRoutes;
