import axios from 'axios';
import fire from '../fire';

const url = 'http://localhost:8080/api';

export const addRatingToDb = async (book, rating) => {
  const header = await createToken();

  const payload = {
    book,
    rating,
  }
  try {
    const res = await axios.post(url, payload, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

// TODO: The following function mirrors the getPHoneBookEntries() funciton in the tutorial. I'm not building it out yet, as I may not need that particular functionality here.
// export const getRatings = async () => {
  // const header = await
// }

const createToken = async () => {
  const user = fire.auth().currentUser;
  const token = user && (await user.getIdToken());

  const payloadHeader = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
}
