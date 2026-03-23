import express from 'express';
import cloudinaryWebhook from '../controllers/webhook.controller.js';

const route = express.Router();

route.post(
  '/cloudinary',
  express.raw({ type: 'application/json' }), // gets Buffer, not parsed object
  (req, res, next) => {
    req.rawBody = req.body; // Buffer — used for HMAC
    req.body = JSON.parse(req.body); // parse manually for the controller
    next();
  },
  cloudinaryWebhook
);

export default route;
