require("dotenv").config();
const express = require("express");
const db = require("./db");

const morgan = require("morgan");

const app = express();


app.use(express.json());

// Get All Restaurants

app.get("/api/v1/restaurants", async (req, res) => {

    try {
        const results = await db.query("SELECT * FROM restaurants")
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows,
            },

        });
    } catch (err) {
        console.log(err);
    }

});

// Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id);

    try {
        const results = await db.query("SELECT * FROM restaurants WHERE id = $1", [
            req.params.id
        ]);

        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        });

    } catch (err) {
        console.log(err); // This is where the error is thrown / Burada hatanın nerede olduğunu fırlatılıyor
    }
});


// Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);

    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
        console.log(results);

        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});


//Update Restaurants

app.put("/api/v1/restaurants/:id", async (req, res) => {

    try {

        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Delete Restaurants
app.delete("/api/v1/restaurants/:id", (req, res) => {

    try {
        const results = db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
});


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

