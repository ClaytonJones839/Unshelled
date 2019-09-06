const express = require("express");

const app = require("./server/server");

const port = process.env.PORT || 5000;
const path = require('path');
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});