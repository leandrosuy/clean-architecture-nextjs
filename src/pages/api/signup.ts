import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const dataFilePath = path.resolve("data/users.json");

interface SignUpData {
    name: string;
    email: string;
    password: string;
    token?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const data: SignUpData = req.body;
            const rawData = await fs.readFile(dataFilePath, "utf-8");
            const users: SignUpData[] = JSON.parse(rawData);
            const existingUser = users.find(
                (user) => user.email === data.email
            );
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    error: "Email already exists",
                });
            }
            const token = crypto.randomBytes(16).toString("hex");
            const newUser: SignUpData = { ...data, token };
            users.push(newUser);
            await fs.writeFile(
                dataFilePath,
                JSON.stringify(users, null, 2),
                "utf-8"
            );
            res.status(200).json({ success: true, data: newUser });
        } catch (error) {
            console.error("Error processing signup:", error);
            res.status(500).json({
                success: false,
                error: "Internal Server Error",
            });
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}
