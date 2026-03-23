import crypto from 'crypto';
import SubSection from '../models/subSection.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { videoStatus } from '../utils/constants.js';
import { formatDuration } from '../utils/formatDuration.js';

// Verify the request genuinely came from Cloudinary
const verifyCloudinarySignature = (req) => {
  const signature = req.headers['x-cld-signature'];
  const timestamp = req.headers['x-cld-timestamp'];

  if (!signature || !timestamp) return false;

  // Replay attack guard — reject requests older than 5 minutes
  const age = Math.floor(Date.now() / 1000) - parseInt(timestamp, 10);
  if (age > 300) return false;

  const rawBody = JSON.stringify(req.body); // needs express.json() to have preserved the raw body
  const expected = crypto
    .createHmac('sha256', process.env.CLOUDINARY_API_SECRET)
    .update(rawBody + timestamp)
    .digest('hex');

  return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex'));
};

const cloudinaryWebhook = async (req, res) => {
  try {
    // --- Security check ---
    if (!verifyCloudinarySignature(req)) {
      return ApiError(res, 401, null, 'Invalid webhook signature');
    }

    const { notification_type, public_id, duration, secure_url } = req.body;

    // 'upload'  = initial upload finished (small files or last chunk of large files)
    // 'eager'   = async transformations finished
    if (notification_type === 'upload') {
      const durationInSeconds = duration ? Math.floor(duration) : 0;
      const formattedDuration = formatDuration(durationInSeconds);

      await SubSection.findOneAndUpdate(
        { video_publicId: public_id },
        {
          videoUrl: secure_url,
          durationInSeconds,
          timeDuration: formattedDuration,
          videoStatus: videoStatus.COMPLETED,
        }
      );
    }

    if (notification_type === 'eager') {
      // eager body shape: { public_id, eager: [{ secure_url, ... }] }
      // The top-level secure_url here is the *original* video URL, which is what we want
      await SubSection.findOneAndUpdate(
        { video_publicId: public_id },
        { videoStatus: videoStatus.COMPLETED }
      );
    }

    if (notification_type === 'error') {
      console.error('Cloudinary processing error:', req.body);
      await SubSection.findOneAndUpdate(
        { video_publicId: public_id },
        { videoStatus: videoStatus.FAILED }
      );
    }

    return ApiResponse(res, 200, null, 'Webhook received successfully');
  } catch (error) {
    console.error('Webhook error', error);
    return ApiError(res, 500, null, 'Webhook error', error);
  }
};

export default cloudinaryWebhook;
