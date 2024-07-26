const express = require("express")
const dotenv = require("dotenv").config();
const connectDB = require('./connect/database')

connectDB()

const port = process.env.PORT;

const app = express();
app.use(express.json());

app.use('/api/auth',require('./routes/auth_routes'))
app.use('/api/user',require('./routes/user_routers'))


app.listen(port, () => console.log(`Listening on http://localhost:${port}`));




