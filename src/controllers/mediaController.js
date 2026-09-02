import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, `aydara-${cleanName}-${uniqueSuffix}${ext}`);
  }
});

// File Filter for Images and Web Videos
const fileFilter = (req, file, cb) => {
  const allowedExts = /\.(jpeg|jpg|png|webp|avif|gif|mp4|webm|mov|m4v|ogv)$/i;
  const isImage = file.mimetype.startsWith('image/');
  const isVideo = file.mimetype.startsWith('video/') || file.mimetype === 'application/octet-stream';

  if (allowedExts.test(file.originalname) || isImage || isVideo) {
    return cb(null, true);
  }
  cb(new Error('Unsupported media format. Please upload web-friendly images (JPG, PNG, WEBP, AVIF) or videos (MP4, WEBM).'));
};

export const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB max for high-res video & image
  fileFilter
});

export const handleMediaUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No media file provided.' });
  }

  const port = process.env.PORT || 5001;
  const protocol = req.protocol || 'http';
  const host = req.get('host') || `localhost:${port}`;
  const relativeUrl = `/uploads/${req.file.filename}`;
  const fullUrl = `${protocol}://${host}${relativeUrl}`;
  const isVideo = req.file.mimetype.startsWith('video/') || /\.(mp4|webm|mov|m4v)$/i.test(req.file.filename);

  return res.status(200).json({
    success: true,
    message: 'Media uploaded and persisted successfully.',
    url: fullUrl,
    relativeUrl,
    filename: req.file.filename,
    originalName: req.file.originalname,
    mediaType: isVideo ? 'video' : 'image',
    size: req.file.size
  });
};

// List all files in Media Library
export const getMediaList = (req, res) => {
  try {
    if (!fs.existsSync(uploadsDir)) {
      return res.status(200).json({ success: true, media: [] });
    }

    const files = fs.readdirSync(uploadsDir);
    const port = process.env.PORT || 5001;
    const protocol = req.protocol || 'http';
    const host = req.get('host') || `localhost:${port}`;

    const mediaList = files.map(file => {
      const filePath = path.join(uploadsDir, file);
      const stats = fs.statSync(filePath);
      const isVideo = /\.(mp4|webm|mov|m4v|ogv)$/i.test(file);

      return {
        id: file,
        filename: file,
        url: `${protocol}://${host}/uploads/${file}`,
        relativeUrl: `/uploads/${file}`,
        type: isVideo ? 'video' : 'image',
        size: stats.size,
        createdAt: stats.birthtime || stats.mtime
      };
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({ success: true, media: mediaList });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Unable to read media library: ' + err.message });
  }
};

// Delete media file with safety
export const deleteMedia = (req, res) => {
  try {
    const { filename } = req.params;
    if (!filename || filename.includes('..')) {
      return res.status(400).json({ success: false, message: 'Invalid file parameter.' });
    }

    const targetPath = path.join(uploadsDir, filename);
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
      return res.status(200).json({ success: true, message: 'Media removed from storage.' });
    }
    return res.status(404).json({ success: false, message: 'File not found.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete media: ' + err.message });
  }
};
