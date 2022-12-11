const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const validator = require("validator");

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "mewsic",
  })
  .promise();

const getTracksSQL = async (user_id) => {
  const [rows] = await pool.query("SELECT * FROM tracks WHERE user_id = ?", [
    user_id.toString(),
  ]);
  return rows;
};

const getTrackSQL = async (id) => {
  const [rows] = await pool.query("SELECT * FROM tracks WHERE _id = ?", [id]);
  return rows[0];
};

const createTrackSQL = async (
  title,
  artist,
  album,
  cover,
  audio,
  cover_cloudinary_id,
  audio_cloudinary_id,
  user_id
) => {
  const [result] = await pool.query(
    "INSERT INTO tracks (title, artist, album, cover, audio, cover_cloudinary_id, audio_cloudinary_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      title,
      artist,
      album,
      cover,
      audio,
      cover_cloudinary_id,
      audio_cloudinary_id,
      user_id.toString(),
    ]
  );
  const id = result.insertId;

  return getTrackSQL(id);
};

const deleteTrackSQL = async (id) => {
  const track = getTrackSQL(id);
  await pool.query("DELETE FROM tracks WHERE _id = ?", [id]);
  return track;
};

const updateTrackSQL = async (
  id,
  title,
  artist,
  album,
  cover,
  cover_cloudinary_id
) => {
  const [rows] = await pool.query(
    "UPDATE tracks SET title = ?, artist = ?, album = ?, cover = ?, cover_cloudinary_id = ? WHERE _id = ?",
    [title, artist, album, cover, cover_cloudinary_id, id]
  );
  return rows[0];
};

const createUserSQL = async (email, password) => {
  await pool.query(`INSERT INTO users (email, password) VALUES (?, ?)`, [
    email,
    password,
  ]);

  return getUserSQL(email);
};

const getUserSQL = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

const getUserByIdSQL = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE _id = ?", [id]);
  return rows[0];
};

const signUpSQL = async (email, password) => {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await getUserSQL(email);

  console.log(exists);

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  await createUserSQL(email, hash);

  return getUserSQL(email);
};

const logInSQL = async (email, password) => {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await getUserSQL(email);

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = {
  getTracksSQL,
  getTrackSQL,
  createTrackSQL,
  deleteTrackSQL,
  updateTrackSQL,
  getUserByIdSQL,
  signUpSQL,
  logInSQL,
};
