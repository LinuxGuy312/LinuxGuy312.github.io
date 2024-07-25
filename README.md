## Get This Cool Website for yourself
- [Create a Fork](https://github.com/LinuxGuy312/LinuxGuy312.github.io/fork)
- Edit your name and about in [index.html](index.html)
- Edit the image URL in [index.html](index.html#L42) & [style.css](src/style.css#L216)
- Enable [Pages](https://github.com/pages) from Settings
- Read the note about the Contact Form
- Voila! You're done

> [!NOTE] 
> If you don't want the button for Contact, you can remove [Lines 128 to 134](index.html#L127-L134) in index.html, delete the `contactform` directory and skip the deployment steps ahead

## Deployment of Contact Form on Cloudflare Workers

**Setup The Code Required:**

- Create a Telegram bot from [BotFather](https://t.me/botfather) and copy its API Token
- Start your newly created bot by sending `/start` in its PM
- Then goto [Yoshitsu](https://yoshitsubot.t.me?start=github) and send `/id` and copy your user id
- Open [cf-worker.js](contactform/cf-worker.js) and edit your Bot token and User ID you got from earlier.
- Copy the edited `cf-worker.js` to your clipboard.

**Deploy Cloudflare worker:**
- Go to [Cloudflare Workers](https://workers.cloudflare.com) & Create an Account.
- After that, Create a worker and Edit it to Paste the Javascript Code you Copied earlier.
- Save and Deploy the worker and copy its URL.

**Add in your website:**
- Just replace the [form_worker_url](index.html#L129) in index.html to your cloudflare worker URL and you are good to go!
