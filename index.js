import * as dotenv from 'dotenv';
dotenv.config();

import Bolt from '@slack/bolt';
const { App } = Bolt;
import { registerOpenai } from './openai.js';


const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

registerOpenai(app);

(async () => {
  // Start the app
  const port = process.env.PORT || 3000;
  await app.start(port);

  console.log(`⚡️ Bolt app is running! port=${port}`);
})();
