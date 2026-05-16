const chatController = require("../controllers/chatController");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/auth");
const roomsRouter = require("./routes/rooms");
const reservationsRouter = require("./routes/reservations");
const paymentsRouter = require("./routes/payments");
const adminRouter = require("./routes/admin");

const reviewsRouter = require("./routes/reviews");
const contactRouter = require("./routes/contact");

const app = express();

// Configure CORS
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      "http://localhost:3000",
      "https://fontendmain-x17k.vercel.app"
    ];

    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());
// Gemini Chat endpoint (must be after app is defined)
app.post("/chat", chatController);

app.use("/api/auth", authRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/reservations", reservationsRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/admin", adminRouter);

app.use("/api/reviews", reviewsRouter);
app.use("/api/contact", contactRouter);

app.get("/", (req, res) => res.send("Smart Hotel Backend is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
