const express = require('express');
const app = express();
const shmotRouter = require('./routes/shmot.routes');
const PORT = 5000;

app.use(express.static(`${__dirname}/css`));
app.use(express.static(`${__dirname}/uploads`));
app.use("/shmot", shmotRouter);

const start = () => {
    app.listen(PORT,  () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

start()
