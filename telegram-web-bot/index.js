const TelegramBot = require('node-telegram-bot-api');

const token = '7089249194:AAGHVru29LrTSaem5qlYxjlPAHuMsw34Qao'
const webAppUrl = 'https://heartfelt-druid-d01cee.netlify.app/'
const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
    {
        command: '/start',
        description: "Bot haqida ma'lumot"
    },
    {
        command: '/info',
        description: "Bot haqida ma'lumot"
    },
])

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text

    if (text === '/start') {
        await bot.sendMessage(chatId, `Assalomu alekum. \nKuniga 50 sahifa challege da ishtirok etmoqchi bo'lsangiz: 
        \n@kitobim_admin ga ismingiz va familiyangizni yozing. Kun davomida barchaga raqam berib chiqaman. 
        \n‼️Salomlashish yoki challege da ishtirok etmoqchiman deb yozmang. Faqat ism va familiyangizni yozib jo'nating.
        \nHar kuni 50 sahifadan kitob o'qiysiz qaysi kitobligini farqi yo'q. Yana to'liq shartlarni keyin tushuntiraman.
        
        \nHayrli kun😊`, {
            reply_markup: {
                keyboard: [
                    [{ text: "Challenge formasini to'ldirishingiz mumkin", web_app: { url: webAppUrl } }]
                ]
            }
        })

        return bot.sendMessage(chatId, `Assalomu alaykum xurmatli ${chatId}`)
    }

    if (text === '/info') {
        await bot.sendMessage(chatId, `Assalomu alekum. \nKuniga 50 sahifa challege da ishtirok etmoqchi bo'lsangiz: 
        \n@kitobim_admin ga ismingiz va familiyangizni yozing. Kun davomida barchaga raqam berib chiqaman. 
        \n‼️Salomlashish yoki challege da ishtirok etmoqchiman deb yozmang. Faqat ism va familiyangizni yozib jo'nating.
        \nHar kuni 50 sahifadan kitob o'qiysiz qaysi kitobligini farqi yo'q. Yana to'liq shartlarni keyin tushuntiraman.
        
        \nHayrli kun😊`)
    }

    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data);

            const books = data.books || [];
            const message = books.map((book, index) => {
                const bookInfo = `\n${index + 1}. ${book.bookName}\n${book.pageFrom} - ${book.pageTo}\n Jami: ${book.pageTo - book.pageFrom}`;
                return bookInfo;
            });
            // 616200947
            await bot.sendMessage(chatId,
                `${data?.date}\n${data?.idNumber}-raqam${message.join('\n')}`
            );
        } catch (e) {
            console.log(e);
        }
    }
});