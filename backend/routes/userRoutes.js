const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const upload = require("./upload");

// ================= LOGIN =================

router.post("/login", async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        // cek email
        const result = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0){
            return res.status(404).json({
                message: "Email belum terdaftar."
            });
        }

        const user = result.rows[0];

        // cek password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Password salah."
            });
        }

        res.json({
            message: "Login berhasil.",
            token: "login-success",
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
                photo: user.photo
            }
        });


    } catch (err){
        console.error(err);
        res.status(500).json({
            message: "Server Error"
        });
    }

});

// ================= REGISTER =================

router.post("/register", async (req, res) => {

    const {
        fullname,
        email,
        phone,
        password,
        province,
        city,
        district,
        village,
        street,
        houseNumber,
        rtRw,
        detail
    } = req.body;

    try {

        const checkUser = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (checkUser.rows.length > 0) {
            return res.status(400).json({
                message: "Email sudah terdaftar."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            `INSERT INTO users
            (
                fullname,
                email,
                phone,
                password,
                province,
                city,
                district,
                village,
                street,
                house_number,
                rt_rw,
                detail
            )
            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
            )`,
            [
                fullname,
                email,
                phone,
                hashedPassword,
                province,
                city,
                district,
                village,
                street,
                houseNumber,
                rtRw,
                detail
            ]
        );

        res.status(201).json({
            message: "Registrasi berhasil."
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// ================= UPLOAD FOTO ================= //

router.post(
    "/upload-photo/:id",
    upload.single("photo"),
    async (req, res) => {
        try {
            const id = req.params.id;
            if (!req.file) {
                return res.status(400).json({
                    message: "Tidak ada foto."
                });
            }

            const photo = `/uploads/${req.file.filename}`;
            await db.query(
                "UPDATE users SET photo = $1 WHERE id = $2",
                [photo, id]
            );

            res.json({
                message: "Foto berhasil diupload.",
                photo
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
)

// ================= EXPORT =================

module.exports = router;