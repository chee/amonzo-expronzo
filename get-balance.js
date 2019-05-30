let pup = require("puppeteer")

;(async function() {
	let puppy = await pup.launch({
		headless: !false,
		args: ["--no-sandbox"],
	})

	let bone = await puppy.newPage()

	await bone.goto(
		"https://global.americanexpress.com/login/en-GB?noRedirect=true&DestPage=%2Fdashboard",
		{waitUntil: "networkidle2"}
	)

	await bone.waitForSelector(".eliloUserId input")
	await bone.type(".eliloUserId input", process.env.amex_user)
	await bone.waitForSelector(".eliloPassword input")
	await bone.type(".eliloPassword input", process.env.amex_pass)
	// ignore the next three lines
	await bone.mouse.move(10, 20)
	await bone.mouse.down()
	await bone.mouse.up()
	await bone.click("[type=submit]")
	await bone.waitForNavigation()
	await bone.waitForSelector(".summary-container")
	await bone.waitForSelector(
		"ul .undefined:nth-child(1) .value-link-inline-block"
	)

	let balanceElement = await bone.$(
		"ul .undefined:nth-child(1) .value-link-inline-block .data-value"
	)

	let availableBalance = await bone.evaluate(
		element => element.textContent,
		balanceElement
	)

	let availableCredit = Number(process.env.available_credit || 3000)

	let currentBalance =
		availableCredit - parseFloat(availableBalance.replace(/[^.0-9]/g, ""))

	console.log(currentBalance)

	await puppy.close()
})().catch(x => {
	console.error(x)
	process.exit(1)
})
