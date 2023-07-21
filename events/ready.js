const client = require("../index");
const chalk = require("chalk");
const {
  version: discordjsVersion
} = require("discord.js");
const {
  prefix,
  botdashToken
} = require("../botconfig/main.json");
const main_json = require("../botconfig/main.json");
const botdash = require('botdash.pro');

client.on("ready", async () => {
  const supportServer = client.guilds.cache.get(`${main_json.TestingServerID}`);
  if (!supportServer) return console.log(chalk.white("["),
    chalk.green.bold("Support Server"),
    chalk.white("]"),
    chalk.gray(" : "),
    chalk.white.bold("Bot isn't on support server"));
  // ———————————————[Status]———————————————
  client.user.setActivity(
    `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} ${
      client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
        ? "Users"
        : "User"
    }`, {
      type: "WATCHING"
    }
  );
  setInterval(() => {

    client.user.setActivity(
      `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} ${
      client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
        ? "Users"
        : "User"
    }`, {
        type: "WATCHING"
      }
    );
  }, 600000)
  // ———————————————[Ready MSG]———————————————
  console.log(chalk.green.bold("Success!"));
  console.log(chalk.gray("Connected To"), chalk.yellow(`${client.user.tag}`));
  console.log(
    chalk.white("Watching"),
    chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
    chalk.white(
      `${
        client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
          ? "Users,"
          : "User,"
      }`
    ),
    chalk.red(`${client.guilds.cache.size}`),
    chalk.white(`${client.guilds.cache.size > 1 ? "Servers." : "Server."}`)
  );
  console.log(
    chalk.white(`Prefix:` + chalk.red(` ${prefix}`)),
    chalk.white("||"),
    chalk.red(`${client.commands.size}`),
    chalk.white(`Commands`)
  );
  console.log(
    chalk.white(`Support-Server: `) +
    chalk.red(`${supportServer.name || "None"}`)
  );
  var dashboard = "";
  try {
    dashboard = new botdash.Client(botdashToken);
    console.log(
      chalk.white("Dashboard : ") +
      chalk.green("On") + chalk.blue(` (https://coffee.botdash.pro)`)
    );
  } catch (error) {
    console.log(
      chalk.white("Dashboard : ") +
      chalk.red("Off")
    );
  }
  console.log("");
  console.log(chalk.red.bold("——————————[Statistics]——————————"));
  console.log(
    chalk.gray(
      `Discord.js Version: ${discordjsVersion}\nRunning on Node ${process.version} on ${process.platform} ${process.arch}`
    )
  );
  console.log(
    chalk.gray(
      `Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
        2
      )} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
        2
      )} MB`
    )
  );
});
/*
 * ———————————————[Credits]———————————————
 * Made by : DrakeZee#5223
 * Support Server : dsc.gg/BotsWay
 * Youtube : youtube.com/DrakeZee
 * Please Help Me Reach 1k Subs DJs Codes And More Amazing * Stuff!
 * Also Add Me Friend When Using This, I Have No Friends :(
 *
 * This Was Only Possible By Following People :
 *
 * recon#8448  | youtube.com/reconlxx | discord.gg/recon
 * Tomato#6966 | milrato.dev         | discord.gg/milrato
 */