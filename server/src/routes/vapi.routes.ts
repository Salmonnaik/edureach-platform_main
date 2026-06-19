import { Router } from "express";
import { initiateVapiCall } from "../controllers/vapi.controller.ts";

const router = Router();

// POST /api/vapi/call - Initiate AI counselor call
router.post("/call", initiateVapiCall);

export default router;
