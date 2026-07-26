const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json([
        {
            id: 1,
            name: "BTS The 5th Album 'ARIRANG'",
            price: 475000
        },
        {
            id: 2,
            name: "ILLIT Bomb",
            price: 345000
        }
    ]);
});

module.exports = router;