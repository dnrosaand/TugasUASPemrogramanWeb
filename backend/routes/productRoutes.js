const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM products ORDER BY id");

        res.json(result.rows);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Gagal mengambil produk"
        });
    }
});

module.exports = router;