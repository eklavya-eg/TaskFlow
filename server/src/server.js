const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
require("dotenv").config()
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const serviceRoutes = require('./routes/serviceRoutes');


const app = express();
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}));
// app.use(bodyParser.json());
app.use(`/tasks`, taskRoutes);
app.use(`/`, userRoutes);
app.use(`/service`, serviceRoutes);

// const dbConnection = process.env.DB_CONN_STRING;
// const dbName = process.env.DB_NAME;
// const collectionTodosName = process.env.DB_TODOS_COLLECTION_NAME;
// const collectionUsersName = process.env.DB_USERS_COLLECTION_NAME;

const servicePort = process.env.SERVICE_PORT;

app.listen(parseInt(servicePort), () => {
    console.log("Listening on port " + servicePort);
})
