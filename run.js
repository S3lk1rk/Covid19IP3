const express = require('express');                         // Express web server framework

const app = express();                                      // Create a new Express application
const path = require('path');                               // Node.js built-in module for file paths
const public = path.join(__dirname,'public');               // Path to public directory

app.use(express.static(public));                            // Use public directory as static directory

app.get('/', function(req, res)                             // Handle requests to the root URL
{ res.sendFile(path.join(public, 'about.html'));            // Send the about.html file
})
 
app.get('/map', function(req, res)                          // Handle requests to the map URL
{ res.sendFile(path.join(public, 'map.html'));              // Send the map.html file
})

app.get('/about', function(req, res)                        // Handle requests to the about URL
{ res.sendFile(path.join(public, 'about.html'));            // Send the about.html file
})


app.listen(3000, () => {                                    // Listen on port 3000
    console.log('Server started on port 3000. Ctrl^c to quit.'); })                     // Log to console