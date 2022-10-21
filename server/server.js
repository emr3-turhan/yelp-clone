require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();


app.use(express.json());

// Get All Restaurants
app.get("/api/v1/restaurants", (req, res) => {
    console.log("Route Handler Ran");
    res.status(200).json({
        status: "success",
        data: {
            restaurant: ["McDonalds", "Wendys"],
        },

    });
});

// Get a Restaurant
app.get("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params);

    res.status(200).json({
        status: "success",
        data: {
            restaurant: "McDonalds",
        },
    });
});


// Create a Restaurant
app.post("/api/v1/restaurants", (req, res) => {
    console.log(req.body);

    res.status(201).json({
        status: "success",
        data: {
            restaurant: "McDonalds",
        },
    });
});


//Update Restaurants

app.put("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params.id)
    console.log(req.body);

    res.status(200).json({
        status: "success",
        data: {
            restaurant: "McDonalds",
        },
    });
});

// Delete Restaurants
app.delete("/api/v1/restaurants/:id", (req, res) => {
    res.status(204).json({
        status: "success",
    });
});


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

