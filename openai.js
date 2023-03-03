import { Configuration, OpenAIApi } from 'openai';

export const registerOpenai = (app) => {
  // チャンネル別のメッセージ一覧
  const messages = {};

  const addMessage = (channel, role, message) => {
    if (typeof messages[channel] !== 'object') {
      messages[channel] = [];
    }

    messages[channel].unshift({role: role, content: message});
    messages[channel].splice(messageLimit());
  }

  const getMessages = (channel) => {
    if (typeof messages[channel] !== 'object') {
      return [];
    }
    
    return messages[channel].reverse();
  }

  // 最大メッセージ保持数
  const messageLimit = () => {
    return 10;
  }

  // OpenAI
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  app.message(/.*/, async ({ message, say }) => {
    console.log(message);
    // ユーザの発言以外は処理しない
    if (message.subtype === 'bot_message') {
      addMessage(message.channel, 'assistant', message.text); 
      return;
    }

    addMessage(message.channel, 'user', message.text); 

    // OpenAI呼び出し
    const res = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: getMessages(message.channel),
    });
    const messageText = res.data.choices[0].message.content;

    await say(messageText);
  })
};
