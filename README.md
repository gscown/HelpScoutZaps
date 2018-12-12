# HelpScoutZaps

JavaScript Zap actions to set custom fields and to set tags on HelpScout via Zapier

# App Setup on HelpScout

Follow the instructions here under "OAUTH2 APPLICATION" to create an App ID and App Secret for use on HelpScout:

[https://developer.helpscout.com/mailbox-api/overview/authentication/](https://developer.helpscout.com/mailbox-api/overview/authentication/)

I recommend "Zapier" for your App Name for later reference. You can use anything for the Redirection URL, as that won't be used.

# SetField.js

Find your custom field ID:

1. Click on mailbox settings
2. Choose Custom Fields
3. View the page source
4. Search for "customFields" (including the quotation marks)
5. Find the "id" which matches your custom field in the associated JSON, for example:

<pre><code>
    "customFields": [
        {
            "id": <b>XXXXX</b>,
            "mailboxId": YYYYY,
            "name": "Testing",
            "order": 1,
            "required": false,
            "status": 1,
            "type": "multiline"
        }
    ]
</code></pre>

In this case, the custom_field_id for the "Testing" custom field is XXXXX.

To use:

1. Add a "Code by Zapier" step to your zap
2. Select "Run JavaScript" as the type of code action to create, and click Continue
3. Create and set the following variables for inputData:

	**access_token**: (optional) set from previous HelpScout scripting step
	**client_id**: your Zapier App ID from HelpScout (see "App Setup" above)
	**client_secret**: your Zapier App Secret from HelpScout (see "App Setup" above)
	**custom_field_id**: see "Find your custom field ID" above
	**message_id**: set from previous step where conversation was found or created
	**description**: set from previous step or with static text

4. Copy and paste the content of SetField.js into the Code field
5. Test the code

# SetTag.js

To use:

1. Add a "Code by Zapier" step to your zap
2. Select "Run JavaScript" as the type of code action to create, and click Continue
3. Create and set the following variables for inputData:

	**access_token**: (optional) set from previous HelpScout scripting step
	**client_id**: your Zapier App ID from HelpScout (see "App Setup" above)
	**client_secret**: your Zapier App Secret from HelpScout (see "App Setup" above)
	**message_id**: set from previous step where conversation was found or created
	**tag**: set single tag from previous step or with static text

4. Copy and paste the content of SetTag.js into the Code field
5. Test the code
