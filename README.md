# Amonzo Expronzo

## what is??

this is for chee to make spending money on their American Express card feel like spending money.

i run it on a loop on my server.

it goes like this:

* get the amount of money in my `amex` pot from monzo
* log onto the amex website w/ puppeteer
	- get current available balance
	- take that off the total available credit to get how much has probably been spent
* if there is more spent than in the `amex`pot, top up the `amex` pot from current account
* send an item into the monzo feed (which sends a push notification)

## how to use

basically don't? and if you do, leave me alone.

that being said:

the script `run` is how you get it started. you'll need to run it in the directory where `get-balance.js` is, because it expects it to be there and i haven't used `dirname $(readlink -f $0)`. run it in a loop. i run it every minute on a server. you'll need to set some env vars:

### environment variables

name | description
------- | ---------------
pot_id | the pot id you will be keeping your card-paying-off money in (find it via [monzo api](https://docs.monzo.com/#pots))
access_token | your [monzo access token](http://developers.monzo.com)
account_id | your monzo account id
amex_user | your amex username
amex_pass | your amex password
available_credit | the total available credit in your amex account

## disclaimer

* don't rely on this
* don't expect it to work tomorrow
* don't @ me
* pull requests welcome
* actually you can @ me sorry for being defensive

## credits

simon legg thought of this
