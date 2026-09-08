import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("FinMatch server is running!");
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "FinMatch backend is working"
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`FinMatch server running at http://localhost:${PORT}`);
});