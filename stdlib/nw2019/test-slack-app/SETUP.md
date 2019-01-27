# Getting Started

Thanks for checking out this Slack app Source Code! In a few minutes, you'll have a fully customizable, infinitely scalable Slack bot live in one of your Slack channels running on StdLib!

## Installing From Your Browser

To get started, press the __Install to Slack__ button below the editor to deploy the functions that will power your Slack app. After that, we'll walk you through some additional steps in your Slack dashboard.

## Installing From The Command Line

### CLI Setup

If you would like to install this source from the command line, make sure you have [Node.js](https://nodejs.org/en/) installed on your machine. Then, install our command line tools by following the directions on [this page](https://github.com/stdlib/lib). Once you've done that, create a StdLib workspace with `lib init` (you will be prompted to create an account if you haven't already). From that workspace, run `lib create -s @slack/app` to retrieve this source and generate a scaffold __StdLib service directory__ for you Slack app. `cd` into the directory you've just created.

You’ll be asked to enter a Service Name, we recommend `slack-app` for this tutorial.

### Creating a Slack App

Next, you should create a Slack app. First, make sure you’re signed in to Slack. Next, visit your Slack Apps page at https://api.slack.com/apps. You’ll see a screen that looks like the following, though you may not have any existing apps yet.

![Slack create app screen](https://cdn-images-1.medium.com/max/1600/1*XGmxmG0B6nzoToUkxCc4bA.png)

At the next screen, simply click Create New App to create your app. You’ll be presented with a modal to enter in your App Name (I recommend “Test App” for the purposes of this tutorial) and the Development Slack Team you’d like to add it to.

![Slack create app modal](https://cdn-images-1.medium.com/max/1600/1*lscS5MN95vZtrU4BnTkT-w.png)

From here, click __Create App__ and you’ll find yourself on a _Basic Information_ page.

### Adding Your Slack App Credentials

You should now make sure your Slack App Credentials are properly assigned to your StdLib service. Switch back to your command line — you’ll want to open your `env.json` (environment variables) file in the main service directory you've just created, open the file in your text editor of choice. We’ll be making modifications to the "dev" environment variables — __make sure you’re modifying the right set!__

![StdLib env.json](https://cdn-images-1.medium.com/max/1600/1*pxYnLGk4AEgr2Y6iml49Og.png)

First, fetch your StdLib Token from your [StdLib Dashboard](https://dashboard.stdlib.com/dashboard). You’ll be asked to log in again — once you’ve done so, click on Library Tokens on the left and you’ll see this page:

![StdLib dashboard](https://cdn-images-1.medium.com/max/1600/1*yJHYIq8SkyAIKM6hb_-X5w.png)

This is your StdLib auth token. Click __Show token__ to see its value and copy and paste it to your env.json file under `STDLIB_TOKEN`. Please note that dev values are for your dev environment and release values should only be populated when you’re ready to release your app.

Next, fill out `SLACK_APP_NAME`. You should differentiate between your dev / release apps — make sure this is unique for every app you build, as it sets a unique identifier for data storage and retrieval. For the dev environment you can set this to "Test App".

Finally, go back to your Slack App, and scroll down on the Basic Information panel:

![Slack basic information panel](https://cdn-images-1.medium.com/max/1600/1*xUWqyYSAs9gh45FAwtBkaw.png)

Copy each of these values to dev section of env.json: `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`, and `SLACK_VERFICIATION_TOKEN`.

As a last step, modify `SLACK_REDIRECT` to `https://<username>.lib.id/slack-app@dev/auth/` where `<username>` is your StdLib username. You may also need to change the `slack-app` section of the URL as well if you have named your service something other than `slack-app`.

### Locally Testing Your Slack App

To make sure your Slack app is ready, we can test it locally. Let's try running a test “Slash” command — for example, this would respond to /hello hey there when run in your team in the channel “general” by the user “test”. From a terminal, set your working directory to your StdLib service directory if it isn't there already, and run:

```
$ lib .commands.hello test general "hey there"
```

You should see a response like this:

![StdLib test command response](https://cdn-images-1.medium.com/max/1600/1*qLBvckouwNAgv3NROmV6Ag.png)

We can test events as well. For example, this as a “message” event that will be triggered any time a message is posted to a public channel (somebody writes “hey”):

```
$ lib .events.message test general "hey"
```

And you should see something like the following:

![StdLIb test event response](https://cdn-images-1.medium.com/max/1600/1*QcTdW279wHzR_x1pK75rFQ.png)

### Deploying Your Service

Now that we’ve set the appropriate environment variables in our StdLib Slack service, we’re ready to push our app live! Simply deploy with:

```
$ lib up dev
```

### Enable a Bot User, Commands, OAuth and Events

Before your app will be functional in your Slack channel, you'll have to register a few more webhooks in your [Slack dashboard](https://api.slack.com/apps). We'll walk through these steps now.

#### Enabling a Bot User

Any interaction models that involve conversation, uploading files, etc. will rely on a bot, so let’s make sure we add one. Find the __Bot Users__ option on the left sidebar, under the Features heading.

![Slack Bot Users tab](https://cdn-images-1.medium.com/max/1600/1*lz8DzAukSQlDyfn8DppXOg.png)

Click __Add a Bot User__ to create your bot. You’ll be given an option to enter in the bot username — the default `@test_app` should work just fine. Click Add Bot User to complete the process, and that’s it! Your bot user is now added and ready to be used.

#### Enabling OAuth

Next, we’ll enable OAuth. On the sidebar menu, click __OAuth & Permissions__. Once there, you’ll want to enter in a _Redirect URL_ as follows: `https://<username>.lib.id/slack-app@dev/auth/`.

![Slack OAuth setup](https://cdn-images-1.medium.com/max/1600/1*X0cQeHxNtcyQ5IibF1lB_w.png)

Hit Add and then click __Save URLs__. You should get a success message, and OAuth is ready!

#### Enabling Slash Commands

Slash Commands are how Slack Apps respond to `/command` style queries. You can read more about them on the [Slack Slash Commands API Reference](https://api.slack.com/slash-commands). We know from a previous step that our service has a pre-built response to `/hello`, so let’s add that first. Click _Slash Commands_ on the sidebar.

![Create a New Slash Command](https://cdn-images-1.medium.com/max/1600/1*ENLJgEJ2rdR9ZiN0AJ1F6Q.png)

After clicking __Create New Command__, you’ll be asked to enter some command details. Make sure you enter the following:
* Command: `/hello`
* Request URL: `https://<username>.lib.id/slack-app@dev/commands/:bg`
* Short Description: `Hello World!`

#### Enabling Event Subscriptions

Finally, we want to enable _Event Subscriptions_. Events are anything that can happen in your public channels, groups and messages. You can read more about the [Slack Events API here](https://api.slack.com/events-api).

To enable them, click on __Event Subscriptions__ option on the left sidebar. Toggle events to __On__ in the top right, and then put in your Request URL: `https://<username>.lib.id/slack-app@dev/events/:bg`

![Slack Event Subscriptions tab](https://cdn-images-1.medium.com/max/1600/1*7gfk-7fRF513kaY3Pgqp5Q.png)

Slack sends a `challenge` parameter to this endpoint, which is why we had to make sure we deployed our service earlier. This endpoint should get automatically verified, if not, make sure you go back and ensure that you deployed your service.

Finally, scroll down a bit to __Subscribe to Team Events__ and add __message.channels__. Make sure to hit __Save Changes__ in the bottom right corner!

### Adding Your Slack App To Your Channel

Visit `https://<username>.lib.id/slack-app@dev/` in your web browser. You’ll see a very simple “Add to Slack” button.

![Add to Slack button](https://cdn-images-1.medium.com/max/1600/1*NV0gF2JyKbIVBQrO4rB7LQ.png)

Click this button, and accept the requested permissions (we set them up previously), you’ll have to scroll down and click __Authorize__.

![Authorizing your Slack app](https://cdn-images-1.medium.com/max/1600/1*PzgoNYyZWGha6jaae8O1Yg.png)

You’ll be returned to your specified auth callback, which should give a success message!

Please note, your bot is now “production-ready,” by authorizing access above and setting up commands and events, your bot is all ready to go — though you can invite your bot to specific channels, it is not necessary for the basic interaction model.

**Note:** If you get an error with something like `OAuth Error: invalid_team_for_non_distributed_app`, Slack thinks you are trying to install your app to the wrong workspace. To fix this, change the URL in your browser to the URL for the workspace you would like to add your app into.

### Playing With Your Slack App

You’re all done. Try it out! Your Slack App is now available for use in the Slack Team you authorized it for. By default, “Test App” should respond to a `/hello` command and to the regex pattern `/hi|hello|sup|hey/` in normal channel messages.

You can modify these behaviors in your StdLib service directory at `functions/commands/hello.js` and `functions/events/message/__main__.js`. You can even create your own event responses and commands — just make sure for __Slash Commands__ that you enable them via the Slack App management portal and your app has the correct permissions.

You can also Enable Distribution for this app and share it with other people by linking them to `https://<username>.lib.id/slack-app@dev/`, but we recommend creating a separate Slack App for this purpose and using `lib release` (so you don’t need the @dev qualifier). Full documentation for the StdLib command line tools is available [on Github](https://github.com/stdlib/lib).
