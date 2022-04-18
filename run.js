const express = require('express');

const app = express();
const path = require('path');
const public = path.join(__dirname,'public');

app.use(express.static(public));

app.get('/', function(req, res)
{ res.sendFile(path.join(public, 'about.html'));
})
 
app.get('/map', function(req, res)
{ res.sendFile(path.join(public, 'map.html'));
})

app.get('/about', function(req, res)
{ res.sendFile(path.join(public, 'about.html'));
})

app.get('/contact', function(req, res)
{ res.sendFile(path.join(public, 'contact.html'));
})

app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.'); })