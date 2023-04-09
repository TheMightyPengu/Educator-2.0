const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Load environment variables from a file
// 

if (!process.env.REACT_APP_API_URL) {
  // Load environment variables from the .env file
  console.log("No env vars found, loading from .env file")
  require('dotenv').config();
}

// Define the environment variables to pass to the React app
const envVars = {
  REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  // add other environment variables here as needed
};

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
// Serve the built React app from the "build" directory
app.use(express.static(path.join(__dirname, 'build')));


const apiProxy = createProxyMiddleware('/api', {
  target: process.env.REACT_APP_API_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
  logLevel: 'debug'
});



app.use('/api', apiProxy);


// Send the index.html file for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server and listen on port 5000
app.listen(5000, () => {
  console.log('Server started on port 5000');
});