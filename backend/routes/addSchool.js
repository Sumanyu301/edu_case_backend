import express from "express";
const router = express.Router();
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const schoolSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

// Add School API:
// Endpoint: /addSchool
// Method: POST
// Payload: Includes name, address, latitude, and longitude.
// Functionality: Validates the input data and adds a new school to the schools table.
// Validation: Ensure all fields are properly validated before insertion (e.g., non-empty, correct data types).

router.post("/addSchool", async (req, res) => {
  try {
    const { name, address, latitude, longitude } = schoolSchema.parse(req.body);

    await prisma.school.create({
      data: {
        name,
        address,
        latitude,
        longitude,
      },
    });
    res.status(200).json({ message: "School added successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors });
    } else if (
      error instanceof SyntaxError &&
      error.message.includes("Unexpected token")
    ) {
      res.status(400).json({ message: "Invalid JSON payload" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

export default router;
