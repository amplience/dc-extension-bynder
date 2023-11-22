# dc-extension-bynder

This extension allows customers to browse and select files from Bynder / WebDAM directly in the Amplience Dynamic Content CMS.

![Bynder Summary](./media/bynder-extension-view.png)

## 🏁 Quickstart

### Register Extension

This extension needs to be [registered](https://amplience.com/docs/development/registeringextensions.html) against a Hub with in the Dynamic Content application (Developer -> Extensions), for it to load within that Hub.

- Category: Content Field
- Label: Bynder
- Name: bynder (needs to be unique with the Hub)
- URL: [https://bynder.extensions.content.amplience.net](https://bynder.extensions.content.amplience.net)
- Description: Bynder asset picker (can be left blank, if you wish)
- Initial height: 200

> Note: You can use our deployed version of this extension (builds from the "production" branch) -

[https://bynder.extensions.content.amplience.net](https://bynder.extensions.content.amplience.net)

As this is an open source project you're welcome to host your own "fork" of this project. You can use any standard static hosting service (Netlify, Amplify, Vercel, etc.) if you wish. Further information can be found on the [developing and building locally](./docs/developing+building-locally.md) and [support](./support.md) page.

#### URL options for Extension Setup

- Amplience hosted (if you are not self hosting which points to our 'production' branch): `https://bynder.extensions.content.amplience.net`
- Self hosted: This will be your main brand deployment URL
- Development: This will either be `http://localhost:3000` of your dev branch deployement url

![Register Bynder extension](./media/bynder-extension-setup.png)

### Extension Permissions Settings

Under the Permissions tab, select the following:

![Bynder Extension Permissions](./media/bynder-extension-permissions.png)

API Permissions:

- ✅ Read Access
- ✅ Modify Access

Sandbox Permissions:

- ✅ Allow Same Origin
- ✅ Allow Pop-ups
- ✅ Allow Pop-ups to escape sandbox

### Installation Parameters

Here is a sample installation parameters payload:

```json
{
  "bynderConfig": {
    "portal": {
      "url": "{{YOUR_BYNDER_PORTAL_URL}}"
    },
    "assetTypes": ["image"],
    "mode": "SingleSelect"
  },
  "amplienceConfig": {}
  
}
```

For more detailed information, please refer to the links below.

## 🌍 Useful Links

- [Configuration](./docs/CONFIGURATION.md)
- [Example Schemas](./docs/EXAMPLES.md)
- [Usage](./docs/USAGE.md)
- [Automation](./docs/AUTOMATION.md)
- [FAQ](./docs/FAQ.md)
- [Contributing](./CONTRIBUTING.md)
- [Hosting](./docs/HOSTING.md)
- [Support](./support.md)
- [Licensing](./LICENSE)
