import express from 'express';

import ScriptMethods from '../scripts-methods';

const Router = express.Router();

Router.get('/script', async (req, res) => {
  try {
    const { query } = req;
    const {
      method,
      ...rest
    } = query;

    await ScriptMethods({
      method,
      ...rest
    });

    res.send('OK');
  } catch (error) {
    console.log(`Error: ${error}`);
    res.send(error.message);
  }
});

export default Router;
