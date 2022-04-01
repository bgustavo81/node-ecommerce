const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// initialize middleware
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/routes", require("./routes/api/admin"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/products", require("./routes/api/products"));
app.use("/api/test", require("./routes/api/test"));
app.use("/api/users", require("./routes/api/users"));

// Serve static assets
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5005;

app.listen(PORT);