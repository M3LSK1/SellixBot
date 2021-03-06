const Discord = require('discord.js');
const e = require('express');
const macros = require('../../commands/macros')

function Order(data) {
    for (var [key, value] of Object.entries(data)) {
        if(!value)
            data[key] = 'nil';
      }
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('BsnkSki Data')
		.setDescription(`BankSki order data - **${data.uniqid}**`)
        .setThumbnail('https://cdn.discordapp.com/attachments/902726643972472853/903098414861004820/20211028_094026.png')
		.addFields(
			{ name: 'Product: ', value: `${data.product_title} (${data.product_id})`, inline: true },
			{ name: 'Quantity: ', value: data.quantity, inline: true },
			{ name: 'Price', value: `$${data.total}`,inline:true},
			{ name: 'Email: ', value: data.customer_email, inline: true },
			{ name: 'Gateway: ', value: data.gateway, inline: true },
            { name: 'Status: ', value: data.status, inline: true },
			{ name: 'Date: ', value: (macros.displayDate(data.created_at)), inline: true },
			{ name: 'Type: ', value: data.product_type, inline: true },
			{ name: `${data.product_type}`, value: (data.product_type==="SERIALS")?((data.serials[0])?data.serials[0]:'nil'):data.file_attachment_uniqid, inline: true },
		)
		.setTimestamp()
		.setColor('#000000');
	return dataEmbed;
}

function Product(data) {
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('BankSkiProduct Lookup')
		.setDescription(`What we know about the product you're looking for **${data.uniqid}**`)
        .setThumbnail('https://cdn.discordapp.com/attachments/902726643972472853/903098414861004820/20211028_094026.png')
		.addFields(
			{ name: 'Title: ', value: `${data.title}`, inline: true },
			{ name: 'Price: ', value: `$${data.price}`, inline: true },
			{name: '\u200b',value: '\u200b',inline:true},
			{ name: 'Type: ', value: data.type, inline: true },
			{ name: 'Stock: ', value: data.stock,inline: true},
			{name: '\u200b',value: '\u200b',inline:true},
            { name: 'Sold: ', value: data.sold_count, inline: true },
            { name: 'Average Score: ', value: data.average_score, inline: true },
			{name: '\u200b',value: '\u200b',inline:true},
		)
		.setTimestamp()
		.setColor('#000000');
	return dataEmbed;
}

function Query(data) {
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('BankSkiQuery')
		.setDescription(`Bankski query data **${data.uniqid}**`)
        .setThumbnail('https://cdn.discordapp.com/attachments/902726643972472853/903098414861004820/20211028_094026.png')
		.addFields(
			{ name: 'Title: ', value: `${data.title}`, inline: true },
			{ name: 'Customer Email: ', value: `${data.customer_email}`, inline: true },
			{name: '\u200b',value: '\u200b',inline:true},
		)
        data.messages.forEach(o=>{
            dataEmbed.addField(`${o.role} ${macros.displayTime(o.created_at)}`,o.message,false);
        })
		dataEmbed.setTimestamp()
		dataEmbed.setColor('#000000');

	return dataEmbed;
}

function Feedback(data) {
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('Bankski Feedback')
		.setDescription(`Feedback data **${data.uniqid}**`)
        .setThumbnail('https://cdn.discordapp.com/attachments/902726643972472853/903098414861004820/20211028_094026.png')
		.addFields(
			{ name: 'Customer Invoice: ', value: `${data.invoice_id}`, inline: true },
			{ name: 'Product: ', value: `${data.product_title}`, inline: true },
			{name: '\u200b',value: '\u200b',inline:true},
			{ name: 'Feedback: ', value: data.message, inline: true },
            { name: 'Reply: ', value: data.reply?data.reply:"NONE",inline: false},
			{ name: 'Score: ', value: `${data.score}/5`,inline: false},
		)
		.setTimestamp()
		.setColor('#000000');

	return dataEmbed;
}
function FeedbackReply(data) {
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('Bankski Reply')
		.setDescription(`Our reply **${data.uniqid}**`)
        .setThumbnail('https://cdn.discordapp.com/attachments/902726643972472853/903098414861004820/20211028_094026.png')
        .addFields(
			{ name: 'Feedback: ', value: data.message, inline: true },
            { name: 'Reply: ', value: data.reply?data.reply:"NONE",inline: false},
		)
		.setTimestamp()
		.setColor('#000000');

	return dataEmbed;
}

function QueryReply(data) {
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('Our Query Reply')
		.setDescription(`Bankski query reply **${data.uniqid}**`)
        .setThumbnail('https://cdn.discordapp.com/attachments/902726643972472853/903098414861004820/20211028_094026.png')
        data.messages.forEach(o=>{
            dataEmbed.addField(`${o.role} ${macros.displayTime(o.created_at)}`,o.message,false);
        })
		dataEmbed.setTimestamp()
		dataEmbed.setColor('#000000');

	return dataEmbed;
}

function OrderRedeem(OrderID, DiscordID, DateRedeemed,Expiry)
{
	const embed = new Discord.MessageEmbed()
	.setTitle('Your order has been redeemed')
	.setDescription('You have reedemed an order, thanks for using BankSki!')
	.setThumbnail('https://cdn.discordapp.com/attachments/902726643972472853/903098414861004820/20211028_094026.png')
	.addFields(
		{name: 'OrderID', value: OrderID, inline:false},
		{name: 'DiscordID', value: `<@${DiscordID}>`,inline:false},
		{name: 'Date Redeemed',value: DateRedeemed,inline: false},
		{name: 'Expiry', value: Expiry,inline:false}
	)
	.setTimestamp()
	return embed;
}

function DatabaseEntry(row)
{
	const embed = new Discord.MessageEmbed()
	.setTitle('Bankski Database')
	.setDescription('An entry has been found in the database!')
	.setThumbnail('https://cdn.discordapp.com/attachments/902726643972472853/903098414861004820/20211028_094026.png')
	.addFields(
		{name: 'OrderID', value: row.OrderID, inline:false},
		{name: 'DiscordID', value: `<@${row.DiscordID}>`,inline:false},
		{name: 'Date Redeemed',value: macros.displayDate(row.RedeemedOn),inline: false},
		{name: 'Expiry', value: macros.displayDate(row.Expiry),inline:false}
	)
	.setTimestamp()
	return embed;
}

function AllEntries(users)
{
	const embed = new Discord.MessageEmbed()
	.setTitle(`All Database Entries`)
	.setDescription('A list of all entries in the database')
	.setThumbnail('https://cdn.discordapp.com/attachments/902726643972472853/903098414861004820/20211028_094026.png')
	users.forEach(o=>{embed.addField(`OrderID ${o.OrderID}`,`DiscordID <@${o.DiscordID}>\nExpiry: ${macros.displayDate(o.Expiry)}`)})
	embed.setTimestamp()

	return(embed);
}

function AllExpired(users)
{
	const embed = new Discord.MessageEmbed()
	.setTitle(`Expired Users`)
	.setDescription('A list of all expired users in the database')
	.setThumbnail('https://cdn.discordapp.com/attachments/902726643972472853/903098414861004820/20211028_094026.png')
	users.forEach(o=>{embed.addField(`OrderID ${o.OrderID}`,`DiscordID <@${o.DiscordID}>\nExpiry: ${macros.displayDate(o.Expiry)}`)})
	embed.setTimestamp()
	return(embed);
}


function WebhookChannel(WebhookEvent, ChannelID)
{
	const embed = new Discord.MessageEmbed()
	.setTitle(`Webhook Event Channel Set: ${WebhookEvent}`)
	.setDescription('A channel has been set to receive webhooks')
	.setThumbnail('https://cdn.discordapp.com/attachments/902726643972472853/903098414861004820/20211028_094026.png')
	.addFields(
		{name: 'Webhook Event', value: WebhookEvent, inline:false},
		{name: 'Channel ID', value:`<#${ChannelID}>`, inline:false}
	)
	.setTimestamp()
	return embed;
}

function AddNickname(Nickname, ProductID)
{
	const embed = new Discord.MessageEmbed()
	.setTitle(`Nickname Added to Config.json`)
	.setDescription('A nickname has been created')
	.setThumbnail('https://cdn.discordapp.com/attachments/902726643972472853/903098414861004820/20211028_094026.png')
	.addFields(
		{name: 'Nickname', value: Nickname, inline:false},
		{name: 'ProductID', value: ProductID, inline:false}
	)
	.setTimestamp()
	return embed;
}

function RemoveNickname(Nickname)
{
	const embed = new Discord.MessageEmbed()
	.setTitle(`Nickname Removed From Config.json`)
	.setDescription('A nickname has been removed')
	.setThumbnail('https://cdn.discordapp.com/attachments/902726643972472853/903098414861004820/20211028_094026.png')
	.addFields(
		{name: 'Nickname', value: Nickname, inline:false}
	)
	.setTimestamp()
	return embed;
}
function AllNicknames(map)
{
	const embed = new Discord.MessageEmbed()
	.setTitle(`All Nicknames`)
	.setDescription('A list of all nicknames')
	.setThumbnail('https://cdn.discordapp.com/attachments/902726643972472853/903098414861004820/20211028_094026.png')
	map.forEach(o=>{embed.addField(`Nickname ${o.nickname}`,`ProductID ${o.productid}`)})
	embed.setTimestamp()

	return(embed);
}

function ShowAdmins(admins)
{
	const embed = new Discord.MessageEmbed()
	.setTitle(`All Sellix Discord Bot Admins`)
	.setDescription('A list of all Discord tags with access to admin commands.')
	.setThumbnail('https://cdn.discordapp.com/attachments/902726643972472853/903098414861004820/20211028_094026.png')
	admins.forEach(o=>{embed.addField('Admin',`<@${o}>`)})
	embed.setTimestamp()
	return embed;
}
module.exports = { 
    Order:Order,
    Feedback:Feedback,
    Query:Query,
    Product:Product,
	QueryReply:QueryReply,
	FeedbackReply:FeedbackReply,
	OrderRedeem:OrderRedeem,
	WebhookChannel:WebhookChannel,
	ShowAdmins:ShowAdmins,
	DatabaseEntry:DatabaseEntry,
	AddNickname:AddNickname,
	RemoveNickname:RemoveNickname,
	AllNicknames:AllNicknames,
	AllEntries:AllEntries,
	AllExpired:AllExpired
}