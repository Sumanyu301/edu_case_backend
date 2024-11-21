// List Schools API:
// Endpoint: /listSchools
// Method: GET
// Parameters: User's latitude and longitude.
// Functionality: Fetches all schools from the database, sorts them based on proximity to the user's location, and returns the sorted list.
// Sorting Mechanism: Calculate and sort by the geographical distance between the user's coordinates and each school's coordinates.

import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router.get("/listSchools", async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        if (!latitude || !longitude) {
        return res.status(400).json({ message: "Latitude and longitude are required" });
        }
    
        const schools = await prisma.school.findMany();
        const sortedSchools = schools.sort((a, b) => {
        const distanceA = calculateDistance(latitude, longitude, a.latitude, a.longitude);
        const distanceB = calculateDistance(latitude, longitude, b.latitude, b.longitude);
        return distanceA - distanceB;
        });
    
        res.status(200).json({ schools: sortedSchools });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
    });

// Function to calculate the distance between two geographical coordinates using the Haversine formula.
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

// Function to convert degrees to radians.
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

export default router;