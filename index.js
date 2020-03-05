const express = require('express')
const mining = require('./mining.js');

const link='https://www.fvhospital.com/find-a-doctor/'

const app = express();

// mining.getHtml(link);



require('./db.js')



app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});