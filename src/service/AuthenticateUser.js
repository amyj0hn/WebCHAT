import axios from 'axios';

async function authenticate(email, userPassword) {
  try {
    const response = await axios.post('/login', { email, userPassword });
    const token = response.data.token;
    applyToken(token);
  } catch (error) {
    console.error('Authentication failed:', error);
  }
}

function applyToken(token) {
  if (token) {
    axios.defaults.headers = {
      Authorization: `${token}`
    };
  }
}

export { authenticate, applyToken };