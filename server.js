require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Debug middleware to log requests
app.use((req, res, next) => {
  next();
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

// Check for required environment variables
const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS', 'RECIPIENT_EMAIL'];
const missingEnvVars = requiredEnvVars.filter(env => !process.env[env]);



// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail', // e.g., 'gmail'
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS  // your email password or app password
  }
});

// Test email configuration on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

// Form submission endpoint
app.post('/api/submit-form', async (req, res) => {
  try {

    
    // Check if required fields are present
    const requiredFields = ['first-name', 'last-name', 'email', 'store-name'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {

      return res.status(400).json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }
    
    const {
      'first-name': firstName,
      'last-name': lastName,
      email,
      phone,
      'store-address': storeAddress,
      'floor-suite': floorSuite,
      'store-name': storeName,
      'business-type': businessType,
      'country-code': countryCode
    } = req.body;

   
    // Create email content with improved design
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'New Merchant Sign Up - ' + storeName,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Merchant Registration</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333333;
              max-width: 600px;
              margin: 0 auto;
            }
            .email-container {
              border: 1px solid #e0e0e0;
              border-radius: 5px;
              overflow: hidden;
            }
            .email-header {
              background-color: #000000;
              color: white;
              padding: 20px;
              text-align: center;
            }
            .email-header h1 {
              margin: 0;
              font-size: 24px;
            }
            .email-content {
              padding: 20px;
              background-color: #ffffff;
            }
            .merchant-info {
              background-color: #f9f9f9;
              border-left: 4px solid #06C167;
              padding: 15px;
              margin-bottom: 20px;
            }
            .info-row {
              margin-bottom: 10px;
              border-bottom: 1px solid #eeeeee;
              padding-bottom: 10px;
            }
            .info-row:last-child {
              border-bottom: none;
              margin-bottom: 0;
              padding-bottom: 0;
            }
            .label {
              font-weight: bold;
              color: #555555;
            }
            .value {
              color: #333333;
            }
            .email-footer {
              background-color: #f5f5f5;
              padding: 15px;
              font-size: 12px;
              text-align: center;
              color: #777777;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .logo span {
              color: #06C167;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <div class="logo">Uber<span>Eats</span></div>
              <h1>New Merchant Registration</h1>
            </div>
            <div class="email-content">
              <p>A new merchant has submitted a registration form on your Uber Eats platform. Here are the details:</p>
              
              <div class="merchant-info">
                <div class="info-row">
                  <div class="label">Full Name:</div>
                  <div class="value">${firstName} ${lastName}</div>
                </div>
                <div class="info-row">
                  <div class="label">Email Address:</div>
                  <div class="value">${email}</div>
                </div>
                <div class="info-row">
                  <div class="label">Phone Number:</div>
                  <div class="value">${countryCode ? `+${countryCode} ` : ''}${phone || 'N/A'}</div>
                </div>
                <div class="info-row">
                  <div class="label">Store Name:</div>
                  <div class="value">${storeName}</div>
                </div>
                <div class="info-row">
                  <div class="label">Store Address:</div>
                  <div class="value">${storeAddress || 'N/A'}</div>
                </div>
                <div class="info-row">
                  <div class="label">Floor/Suite:</div>
                  <div class="value">${floorSuite || 'N/A'}</div>
                </div>
                <div class="info-row">
                  <div class="label">Business Type:</div>
                  <div class="value">${businessType || 'N/A'}</div>
                </div>
              </div>
              
              <p>Please reach out to the merchant as soon as possible to discuss their business needs.</p>
            </div>
            <div class="email-footer">
              <p>This is an automated email sent from your Uber Eats merchant platform.</p>
              <p>&copy; ${new Date().getFullYear()} Uber Technologies Inc.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    console.log('Sending email to:', process.env.RECIPIENT_EMAIL);
    
    // Send email
    await transporter.sendMail(mailOptions);

    
    return res.status(200).json({ success: true, message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error in /api/submit-form:', error);
    return res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server URL: http://localhost:${PORT}`);
}); 