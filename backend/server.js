const express = require("express");
const cors = require("cors");
require("dotenv").config();

// TAMBAHKAN BARIS INI
console.log("DATABASE_URL =", process.env.DATABASE_URL);

const db = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const stockRoutes = require("./routes/stockRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Backend AnnyeongShop berhasil berjalan!");
});

db.query("SELECT NOW()")
    .then(() => {
        console.log("✅ Berhasil terhubung ke Supabase");
    })
    .catch((err) => {
        console.error("❌ Gagal konek:", err.message);
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

