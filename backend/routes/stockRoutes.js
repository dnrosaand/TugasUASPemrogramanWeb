const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM stocks ORDER BY id DESC"
        );

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error mengambil data stock"
        });
    }
});

module.exports = router;