console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.other = {
  omdb: process.env.omdb,
  bit: process.env.bit
}