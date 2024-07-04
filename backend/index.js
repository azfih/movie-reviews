import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import MoviesDAO from './dao/moviesDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';

async function main() {
  dotenv.config();
  console.log('MOVIEREVIEWS_DB_URI:', process.env.MOVIEREVIEWS_DB_URI);
  console.log('PORT:', process.env.PORT);

  const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);
  const port = parseInt(process.env.PORT, 10) || 8000;

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected to MongoDB');
    await MoviesDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);

    app.listen(port, () => {
      console.log('Server is running on port: ' + port);
    });
  } catch (e) {
    console.error('Failed to connect to MongoDB', e);
    process.exit(1);
  }
}

main().catch(console.error);
