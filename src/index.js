import {Client, CommandInteractionOptionResolver, Intents } from 'discord.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fun from 'fun-responses'

dotenv.config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.once('ready', async()=> {
    console.log('Ready');
});


async function restLoveGifs(){
    let random = Math.floor(Math.random() * 51);
    let quote = await (await fetch(`https://g.tenor.com/v1/search?q=romantic&key=LIVDSRZULELA&limit=1&pos=${random}`))
    let json_ = await quote.json()
    return json_.results[0].url;
}
client.on('messageCreate', async(message)=> {
    if(!message.author.bot){
        if(message.content.startsWith('.new')){
            if(message.content.startsWith('.new topic'))
                await message.reply(await fun.topic())
            else if(message.content.startsWith('.new roast'))
                await message.reply(await fun.roast())
            else if(message.content.startsWith('.new toast'))
                await message.reply(await fun.toast())
            else if(message.content.startsWith('.new joke'))
                await message.reply(await fun.joke())
            else if(message.content.startsWith('.new'))
                await message.reply(await fun.pickup())
        }
        if(message.content.startsWith('.gif')){
            message.reply(await restLoveGifs(), "wait for a few")
        }
    }
})

client.login(process.env.DJS_TOKEN);
