# Revenue-Game

To install you need **node, npm, bower, mongodb**. Use command `npm install`.

## Map your IP address to didnrsjina6.in.sas.com

For Example in Windows:

- Add `172.26.123.20 didnrsjina6.in.sas.com` in `C:\Windows\System32\drivers\etc\hosts`.

## Configuration

- Update google/twitter/facebook OAuth `clientID/consumerKey` and `clientSecret/consumerSecret`  in `config/properties.js` to the one associated with your account .
- Update googleAnalytics.trackingId in `config/properties.js` to your own tracking ID.
- Do not use mine.
- Update IP address in database url inside `config/properties.js` Or update url to where your mongodb is hosted.

## To run the project

- Use command `mongod` in cmd.
- Navigate to directory and use command `./bin/www`.
