const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();  // For reading environment variables like your bot token

const client = new Client({
    intents: [GatewayIntentBits.Guilds]  // Make sure you have the correct intents
});

const ROLE_ID = '957433899837960213';  // Replace with the ID of the role you want to update
const GUILD_ID = '805590639336620064';  // Replace with the ID of your guild/server

client.once('ready', () => {
    console.log('Bot is online!');
    
    // Start the color update loop
    setInterval(updateRoleColor, 1000);  // Update every 1 seconds
});

async function updateRoleColor() {
    try {
        const response = await fetch('https://x-colors.yurace.pro/api/random');
        const data = await response.json();
        
    
        const hexColor = data.hex;  // Example: "#CCFB7B"
        
        console.log('Hex Color:', hexColor);  // Log the color being used
        
        // Remove the '#' and convert the hex string to an integer
        const intColor = parseInt(hexColor.replace('#', ''), 16);
        
        const guild = client.guilds.cache.get(GUILD_ID);
        if (!guild) {
            console.log('Guild not found!');
            return;
        }
        
        const role = await guild.roles.fetch(ROLE_ID);  // Force fetch the latest role data
        if (!role) {
            console.log('Role not found!');
            return;
        }

        
        
        // Update the role color with the integer value
        await role.setColor(intColor);
        console.log(`Updated role color to: ${hexColor}`);
    } catch (error) {
        console.error('Error updating role color:', error);
    }
}

// Login to Discord with your app's token
client.login(process.env.DISCORD_TOKEN);
