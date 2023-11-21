# dc-extension-bynder

## Table of Contents

- [Extension Configuration](#extension-configuration)
  - [Bynder Configuration (bynderConfig)](#bynder-configuration-bynderconfig)
  - [Amplience Configuration (amplienceConfig)](#amplience-configuration-amplienceconfig)
- [Schema Configuration](#schema-configuration)
  - [Single select Schema configuration](#single-select-schema-configuration)
  - [Multi select Schema Configuration](#multi-select-schema-configuration)
- [Supported capabilities](#supported-capabilities)
  - [General](#general)
  - [Single select](#single-select)
  - [Multi select](#multi-select)
- [Access](#access)
- [Documentation](#documentation)
- [Out of scope](#out-of-scope)
- [Feature requests](#feature-requests)
- [Public listings  ](#public-listings)

## Extension configuration

Bynder has a list of properties that can be sent to their asset browser to configure the user experience. Instead of limiting these, Amplience will enable these to be configured in the installation parameters of the extension to enable customers to:

1. Be in control of their experience and their implementation

2. If Bynder release updates and new functionality then they can be taken advantage of without the requirement for Amplience to update the extension.

Documentation: (See Optional options): [Bynder & WebDAM UI components](https://developer-docs.bynder.com/ui-components)

You do not have to send any configuration options at all for this extension to function. The configuration options allow customers to aid usability and control the experience away from default behaviour.

All attributes are customisable APART from any functions which include but may not be limited to:

- `onSuccess`
- `onLogout`
- `container`
- `authentication`

Options documented by Bynder at time of build of the extension are listed below directly from their documentation.

| **Attribute**                 | **Description**                                                                                                                                                                | **Possible Values**                                                    | **Default Value**                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | --------------------------------------- |
| onSuccess                     | Comma separated list of asset types to display                                                                                                                                 | function (assets: array(asset), additionalInfo?: AdditionalInfo): void | console.log                             |
| container                     | A DOM element to act as the container for Compact View (disables modal)                                                                                                        | A Dom.HTMLElement instance                                             | None                                    |
| portal                        | Portal config object                                                                                                                                                           | {url: string, editable: bool}                                          | None                                    |
| portal.url                    | Set a default portal URL for the Compact View login screen (set on the Login component if using the [npm package](https://www.npmjs.com/package/@bynder/compact-view) package) | A string containing Bynder portal URL                                  | None                                    |
| portal.editable               | If false, limits Compact View tot a single portal                                                                                                                              | true , false                                                           | true                                    |
| defaultSearchTerm             | Set the initial value for search term                                                                                                                                          | "Keyword"                                                              | None                                    |
| language                      | Set language for the Compact View                                                                                                                                              | "en_US", "nl_NL", "de_DE", "fr_FR", "es_ES"                            | "en_US"                                 |
| mode                          | Set the Compact View to allow multiple or single asset selection                                                                                                               | "MultiSelect", "SingleSelect", "SingleSelectFile"                      | "SingleSelect"                          |
| theme                         | A theme object for customizing Compact View look and feel                                                                                                                      |     Theme                                                              | None                                    |
| assetTypes                    | An array of strings for limiting allowed asset types                                                                                                                           | AssetType[]                                                            | ["image", "audio", "video", "document"] |
| assetFieldSelection           | A multiline string containing desired asset fields (see below)                                                                                                                 | String                                                                 | All fields                              |
| hideExternalAccess            | If true, removes access to external DAM from assets and collections                                                                                                            | true, false                                                            | false                                   |
| selectedAssets                | An array of asset ids. When mode is different than MultiSelect, the last id in the array will be selected                                                                      | ["id1", "id2", "id3"]                                                  | []                                      |
| assetFilter                   | Predefined filters for UCV                                                                                                                                                     | AssetFilterJson                                                        | None                                    |
| authentication                | Authentication config object. (set on the Login component if using the [npm package](https://www.npmjs.com/package/@bynder/compact-view) package)                              | { getAccessToken: () => '', hideLogout: false }                        | None                                    |
| authentication.getAccessToken | Function to provide an OAuth access_token and bypass the authentication flow.                                                                                                  | () => ''                                                               | None                                    |
| authentication.hideLogout     | If true, logout button will not be displayed. This property can only be used in combination with authentication.getAccessToken.                                                | true, false                                                            | false                                   |
| hideLimitedUse                | If true, limited assets will be hidden for all users.                                                                                                                          | true, false                                                            | false                                   |
| modalStyles                   | An object with css properties for modal window wrapper.                                                                                                                        | {"width": "100%"}                                                      | None                                    |
| onLogout                      | Callback, will be fired after logout.                                                                                                                                          | () => void                                                             | None                                    |

These properties for the configuration can be set in the installation parameters in the Amplience Extension Screen.

Documentation: https://amplience.com/developers/docs/integrations/extensions/register-use/#installation-parameters

This should be supplied in the following format:

```json
{
  "bynderConfig":{
    // Bynder configuration properties
  },
  "amplienceConfig":{
    // Amplience configuration properties
  }
}
```
Further information about settings for these properties is listed below.

### Bynder Configuration (bynderConfig)

#### General
You can use any of the attributes from Bynder to customise your extension to your account. Below is an example of these settings:

```json
{
  "bynderConfig":{
    "portal": {
      "url": "{{YOUR_BYNDER_PORTAL_URL}}",
      "readOnly": true,
      "editable": false
    },
    "mode": "SingleSelect",
    "language": "fr_FR",
    "defaultSearchTerm" : "Logo",
    "assetTypes": ["image"],
    "modalStyles": {
      "width": "100%"
    },
    "assetFilter": {
      "showToolbar": true,
      "isLimitedUse": true
    },
    "theme": {
      "colorPrimary": "{{YOUR_HEX_COL_#123456}}",
      "colorButtonPrimary": "{{YOUR_HEX_COL_#123456}}",
      "colorButtonPrimaryLabel": "{{YOUR_HEX_COL_#123456}}",
      "colorButtonPrimaryActive": "{{YOUR_HEX_COL_#123456}}",
      "colorButtonPrimaryHover": "{{YOUR_HEX_COL_#123456}}",
      "colorButtonPrimaryHoverLabel": "{{YOUR_HEX_COL_#123456}}"
    },
    "authentication": {
      "token": "{{YOUR_BYNDER_ACCESS TOKEN}}"
    }
  },
  "amplienceConfig":{
    // Amplience configuration properties
  }
}
```

#### Using a Bynder Access token
If you wish for all users in the Amplience Dynamic Content CMS to be able to browse and select assets **without** having to login, you can provide a Bynder Access token in your extension settings.

> Note: It is also recommended that you provide your portal URL.

The example below has just these settings with `{{PLACEHOLDER}}`` content for your specific details

```json
{
  "bynderConfig":{
    "portal": {
      "url": "{{YOUR_BYNDER_PORTAL_URL}}"
    },
    "mode": "SingleSelect", // Can be any mode
    "authentication": {
      "token": "{{YOUR_BYNDER_ACCESS TOKEN}}"
    }
  },
  "amplienceConfig":{
    // Amplience configuration properties
  }
}
```

### Amplience Configuration (amplienceConfig)

TODO: Content Mapping


## Schema Configuration

Schemas in Amplience will need to be updated to use the extension (you will find exmples in the following page: [Example Schemas](./EXAMPLES.md)). This will be no different than any other content field extensions:

Documentation: https://amplience.com/developers/docs/integrations/extensions/register-use/#enabling-a-content-editor-extension-for-a-content-type

[Registering and using extensions | Amplience Developer Portal](https://amplience.com/developers/docs/integrations/extensions/register-use/#enabling-a-content-editor-extension-for-a-content-type)

The extension will then replace the field.

### Single select Schema configuration

This will be a single object which can hold information for a single asset from Bynder:

```json
"bynder": {
    "title": "Bynder Object",
    "description": "A single reference to an item in Bynder",
    "type": "object",
    "properties": {},
    "ui:extension": {
        "name": "bynder"
    }
}
```

### Multi select Schema Configuration

This will be an Array of objects. Each object can hold information for a single asset in Bynder:

```json
"bynder": {
    "title": "Bynder Array",
    "description": "A list of references to items in Bynder",
    "type": "array",
    "items": {},
    "ui:extension": {
        "name": "bynder"
    }
}
```

> Note: These are the most basic forms of schema configuration. You can strongly type these if you prefer and enforce values. Strongly typing can be useful if consuming via our GQL API as you can then return only the fields that you require.

## Supported capabilities

### General

In all configurations of this extension the customer will be able to:

- Add an asset from Bynder into the content form
- Remove an asset from Bynder into the content form
- If an asset is already in the content form they will be able to swap that asset for another asset from Bynder
- If an asset is already in the content form they will be able to click directly to the Bynder interface to view / edit the asset. Permissions for this are based on their permission in Bynder. Link will open in a new tab
- See a card preview for selected assets
- Have a hover tooltip for selected assets

As a developer / setting up the extension you will be able to:

- Pass through a Bynder configuration in the extension installation parameters. Common parameters are:
  - Specifying a portal URL so that a user does not have to do this
  - Changing the theme of action buttons
  - Setting the locale of the UI for Bynder
  - Setting the mode (Single Select / Multi Select)
  - Limiting asset types the user can select (only images, or images and videos etc)
- Enforce limitations of the Schema
- Map root level fields from Bynder to attributes in the Amplience content form

### Single select

- As per general but only one item can be selected at any one time (both in Amplience and when selecting in Bynder)

### Multi select

In addition to the functionality mentioned in General, Multi Select views will also allow:

- Drag and drop re-ordering of assets in the content form
- If you have validation for maximum items in for the array in your schema - when you have reached the maximum you will not be able to add more unless you remove items to comply with your restrictions
- Swapping an asset will swap a single item in place in the content form

## Access

This extension will be hosted on a production URL by Amplience so customers looking to use this integration will not have to set up infrastructure to use it. This URL will be:
https://bynder.extensions.content.amplience.net

This hosted URL will have the same SLA as the Amplience Back Office for uptime.

Amplience will also make this extension publicly available in an Amplience Github repository. This gives customers:

- Access to the code if they wish to customise
- Ability to raise PRs if they wish to contribute
- Additional developer documentation
- Ability to fork, build and host themselves if they choose to

Github URL: https://github.com/amplience/dc-extension-bynder

> Note: any customisations made will be unsupported.

## Documentation

All documentation will be surfaced on the github page for this extension which will be available publicly on release.

Amplience may also put additional documentation on our documentation site found here: https://amplience.com/developers/docs/

[Home | Amplience Developer Portal](https://amplience.com/developers/docs/)

## Out-of-scope

The following items are out-of-scope for this integration with Bynder.

1. This will be a READ-ONLY integration to allow users to browse and select assets from within the Amplience Dynamic Content CMS. It will not push or change any data in Bynder itself.

2. This is also an authoring extension so any front end integrations ( Live Site, Visualisations, Previews etc) are the responsibility of the customer using the data stored in the content form.

3. This is an extension and an integration. It will not automatically work with other extensions which assume Amplience media (like di-transform, AI capabilities, shoppable image etc).

4. As assets are not in Amplience they will not apply to any Virtual Staging (VSE) rules. However the content item will.

5. With Amplience assets we automatically publish them when the content is published. This will not be possible as this is Bynder's responsibility and we are not in control. Assets must be on a public location to render in the front end.

6. SSO / OAUTH is out of scope for using the extension. User will login into Bynder using their credentials as this also gives the right permissions for the right user.

## Feature requests

We welcome feature requests at Amplience as they enhance the product for all customers. This can be via the feedback bot in the Amplience Dynamic Content interface, via support, via your implementation team (Expert Services), or via your account manager & customer success manager.

All requests are triaged and evaluated by the Amplience product team who may ask the requester for more information.

The Amplience product team has discretion on whether features will be put onto the roadmap or not. And control over priorities and timing based on other priorities.

## Public listings

This extension will be available on the Amplience Github on release.

Amplience will also list this in the Amplience Marketplace found here: [Marketplace | Amplience](https://amplience.com/marketplace/)

Amplience will also contact Bynder to list on their integrations page found here: [Bynder Integration Marketplace | Bynder](https://marketplace.bynder.com/)
