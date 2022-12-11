const cloudinary = require("../utils/cloudinary");
const {
  getTracksSQL,
  getTrackSQL,
  createTrackSQL,
  deleteTrackSQL,
  updateTrackSQL,
} = require("../utils/database");

const getTracks = async (req, res) => {
  const user_id = req.user._id;
  const tracks = await getTracksSQL(user_id);
  res.status(200).json(tracks);
};

const getTrack = async (req, res) => {
  const { id } = req.params;

  const track = await getTrackSQL(id);

  if (!track) {
    res.status(404).json({ error: "Track not found" });
  }

  res.status(200).json(track);
};

const createTrack = async (req, res) => {
  const { title, artist, album } = req.body;
  const files = req.files;
  let result = [];
  for (const [name, obj] of Object.entries(files)) {
    result.push(
      await cloudinary.uploader.upload(obj[0].path, {
        resource_type: "auto",
      })
    );
  }

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!artist) {
    emptyFields.push("artist");
  }

  if (
    !result.filter((obj) => {
      return obj.resource_type === "image";
    })[0]
  ) {
    emptyFields.push("cover");
  }

  if (
    !result.filter((obj) => {
      return obj.resource_type === "video";
    })[0]
  ) {
    emptyFields.push("audio");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all the fields",
      emptyFields,
    });
  }

  try {
    const user_id = req.user._id;

    const track = await createTrackSQL(
      req.body.title,
      req.body.artist,
      req.body.album || null,
      result.filter((obj) => {
        return obj.resource_type === "image";
      })[0].secure_url,
      result.filter((obj) => {
        return obj.resource_type === "video";
      })[0].secure_url,
      result.filter((obj) => {
        return obj.resource_type === "image";
      })[0].public_id,
      result.filter((obj) => {
        return obj.resource_type === "video";
      })[0].public_id,
      user_id
    );
    res.status(200).json(track);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTrack = async (req, res) => {
  const { id } = req.params;

  let t = await getTrackSQL(id);

  await cloudinary.uploader.destroy(t.audio_cloudinary_id, {
    resource_type: "video",
  });
  await cloudinary.uploader.destroy(t.cover_cloudinary_id);

  const track = await deleteTrackSQL(id);

  res.status(200).json(track);
};

const updateTrack = async (req, res) => {
  const { id } = req.params;

  let t = await getTrackSQL(id);

  await cloudinary.uploader.destroy(t.cover_cloudinary_id);

  const file = req.file;

  let result = await cloudinary.uploader.upload(file.path);

  const data = {
    title: req.body.title || t.name,
    artist: req.body.artist || t.artist,
    album: req.body.album || t.album,
    cover: result?.secure_url || t.cover,
    cover_cloudinary_id: result?.public_id || t.cover_cloudinary_id,
  };

  const track = await updateTrackSQL(
    id,
    data.title,
    data.artist,
    data.album,
    data.cover,
    data.cover_cloudinary_id
  );

  if (!track) {
    res.status(404).json({ error: "Track not found" });
  }

  res.status(200).json(track);
};

module.exports = { createTrack, getTracks, getTrack, deleteTrack, updateTrack };
