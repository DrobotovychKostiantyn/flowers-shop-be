// Instruments
import { app } from './server';
import { getPort } from './utils';
import mongoose from 'mongoose';

const PORT = getPort();

app.listen(PORT, async () => {
  // eslint-disable-next-line
  console.log(`Server API is up on port ${PORT}`);

  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
});
