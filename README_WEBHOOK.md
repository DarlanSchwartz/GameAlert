

# How to use Discord Webhook

## It's a JSON

First, learn JSON. It's not programming language, not even close.
Just follow syntax rules and you will be fine.

Recommended sources:

* [Learn X in Y minutes | Where X=json](https://learnxinyminutes.com/docs/json/)
* [JSON official site](https://www.json.org/json-en.html)

## Structure of Webhook Body

Second, learn the structure.
All root elements are *optional* unless stated otherwise. Body have to include `content` or `embeds`, otherwise request will fail.

> `element` : `[data type]` - description

* `[string]` - text
  * `[website url]` - ex.: `https://google.com`
    * `[image url]` - ex.: `https://www.w3schools.com/html/pic_mountain.jpg`
* `[array]` - comma-separated elements. ex.: `[1, 2, 3, 4]`
* `[number]` - ex. `1337`, `420.69`, `-1000`, etc.
* `[boolean]` - can be `true` or `false` only.
* `[object]` - can include `key: value`s

* `username` : `[string]` - overrides the default username of the webhook
* `avatar_url` : `[image url]` - overrides the default avatar of the webhook
* `content` : `[string]` - simple message, the message contains (up to 2000 characters)
* `embeds` : `[array]` - array of embed objects. That means, you can use more than one in the same body
  * `author` : `[object]` - embed author object
    * `name` : `[string]` - name of author
    * `url` : `[website url]` - url of author. If `name` was used, it becomes a hyperlink
    * `icon_url` : `[image url]` - url of author icon
  * `title` : `[string]` - title of embed
  * `url` : `[website url]` - url of embed. If `title` was used, it becomes hyperlink
  * `description` : `[string]` - description text
  * `color` : `[number]` - color code of the embed. You have to use Decimal numeral system, not Hexadecimal. Use [color picker](https://www.spycolor.com/)
  * `fields` : `[array]` - array of embed field objects
    * `name` : `[string]` - name of the field
    * `value` : `[string]` - value of the field
    * `inline` : `[boolean]` - if true, fields will be displayed in same line, but there can only be 3 max in same line or 2 max if you used thumbnail
  * `thumbnail` : `[object]` - embed thumbnail object
    * `url` : `[image url]` - url of thumbnail
  * `image` : `[object]` - embed image object
    * `url` : `[image url]` - image url
  * `footer` : `[object]` - embed footer object
    * `text` : `[string]` - footer text, doesn't support Markdown
    * `icon_url` : `[image url]` - url of footer icon

### Example for a webhook

```json
{
  "username": "Webhook",
  "avatar_url": "https://i.imgur.com/4M34hi2.png",
  "content": "Text message. Up to 2000 characters.",
  "embeds": [
    {
      "author": {
        "name": "Birdie♫",
        "url": "https://www.reddit.com/r/cats/",
        "icon_url": "https://i.imgur.com/R66g1Pe.jpg"
      },
      "title": "Title",
      "url": "https://google.com/",
      "description": "Text message. You can use Markdown here. *Italic* **bold** __underline__ ~~strikeout~~ [hyperlink](https://google.com) `code`",
      "color": 15258703,
      "fields": [
        {
          "name": "Text",
          "value": "More text",
          "inline": true
        },
        {
          "name": "Even more text",
          "value": "Yup",
          "inline": true
        },
        {
          "name": "Use `\"inline\": true` parameter, if you want to display fields in the same line.",
          "value": "okay..."
        },
        {
          "name": "Thanks!",
          "value": "You're welcome :wink:"
        }
      ],
      "thumbnail": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/3/38/4-Nature-Wallpapers-2014-1_ukaavUI.jpg"
      },
      "image": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/5/5a/A_picture_from_China_every_day_108.jpg"
      },
      "footer": {
        "text": "Woah! So cool! :smirk:",
        "icon_url": "https://i.imgur.com/fKL31aD.jpg"
      }
    }
  ]
}
```

### And how it looks

![example](https://i.imgur.com/kvEZU97.png "Example")

## Getting Started

### Account on IFTTT

Visit [IFTTT](https://ifttt.com/) and create an account (if you haven't one).

### Webhook on Discord

1. Go to **Server settings** -> **Webhooks** -> **Create Webhook**
1. Setup name, avatar and the channel, where it will be posted. Copy *Webhook URL*. **Do not share! Very dangerous!**
1. Click **`Save`** and then the **`Done`** button

## Creating an Applet

### If `this`

1. Go to [My Applets](https://ifttt.com/my_applets) -> `New Applet`
1. Click `[+]this`
1. `Choose a service`. In theory, you could use all of them
1. `Choose the trigger`. Read the description below every trigger and choose the needed one
1. `Complete trigger fields`. There can be more than one step. Read the descriptions and examples

### Then `that`

1. Click `[+]that`
1. `Choose the action service`. You need `Webhooks`. Use the search bar
1. `Choose action`. Choose `Make a web request`
1. Paste your *Webhook URL* to **URL** field
1. Select `POST` method
1. Select `application/json` content type
1. And now the hardest part™. You need to create your JSON body. Follow the structure, use it as an example and don't forget about common sense. Press `+ Ingredient` button and put the *Ingredients* into appropriate fields. If something says `URL` put it in `"url":"{{URL}}"`, if something says `ImageURL`, try to put that into `"image": {"url":"{{ImageURL}}"}`.  There's no universal solution
1. Click `Create Action` and then `Finish`
1. Done!

## Tips

* Use this awesome website to generate valid json wirh built-in preview: [Discohook](https://discohook.org/), also you can send webhooks to your server with it if you just wan't fancy embed in your channel without any automatization.
* Don't forget to check your JSON body with a JSON validator. If you don't know any use one of these:
  * [JSON Formatter](http://jsonformatter.org/)
  * [JSONLint](http://jsonlint.com/)
  * [JSON Editor Online](http://www.jsoneditoronline.org/)
* If the webhook *doesn't work*, check log for errors. **My Applets** -> *choose applet* -> *click gear* -> __*View activity log*__. `Maker error` means your JSON body has errors.
* Discord has built-in embeds for Twitter, Youtube and other sites so you can just add the link to the webhook: `{"content": "{{Link}}"}`.

## Examples

Check <https://birdie0.github.io/discord-webhooks-guide> Examples section!