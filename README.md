![Go Drive](https://raw.githubusercontent.com/kulokenci/goindex-drive/master/go-drive-logo.png) 

## Source
Origin https://github.com/donwa/goindex
Dark Theme & Search https://github.com/ParveenBhadooOfficial/go-drive


## Quick Deployment
1. Open https://installen.gd.workers.dev
2. Auth and get the refresh_token and paste on line 8 or just copy the full code and paste in Cloudflare workers.
3. Deploy the code to [Cloudflare Workers](https://www.cloudflare.com/workers)

![Go Drive Dark Theme](https://raw.githubusercontent.com/kulokenci/goindex-drive/master/ss.jpg)  

## Use your own credentials and data
* Open https://console.developers.google.com/apis/credentials
* After creating project or if you already have one.
* Click create credentials.
* Select OAuth client ID.
* Select Web application.
* Give it a name. (anything for your own reference)
* In Authorized JavaScript origins add https://developers.google.com
* In Authorized redirect URIs add https://developers.google.com/oauthplayground
* Save and note down your Client ID and Secret
* Open https://developers.google.com/oauthplayground
* On Right Top Side click on Setting Icon ![](https://developers.google.com/oauthplayground/assets/images/settings.png)
* Click on Use your own OAuth credentials.
* Enter OAuth Client ID: and OAuth Client secret:
* Now back to same page https://developers.google.com/oauthplayground left side Step 1 i.e. Select & authorize APIs
* Find Drive API v3
* Select First Option i.e. https://www.googleapis.com/auth/drive
* Click on Authorize API. and give permissions using your google account.
* It will turn to Step 2 Exchange authorization code for tokens at the end of authentication.
* Click on Exchange authorization code for tokens, if it goes to step 3, click on Step 2 yourself.
* Select the option Auto-refresh the token before it expires.
* Copy the refresh token and paste in Line 8 of https://github.com/kulokenci/goindex-drive/blob/master/worker.js along with your own Client ID and Secret at Line 6 and Line 7.
* Copy the Code and paste it into https://workers.cloudflare.com Site.

