# Support

This is an open source integration which you are free to use and customise for your implementation. Amplience supports this integration for the expected behaviour in the project documentation.

The roles between the three key parts of the integration can be summarised as:

1. [Amplience](https://amplience.com/) Platform
2. [Bynder/WebDAM](https://www.bynder.com/en/webdam/) Platform
3. [Bynder/WebDAM - UI Components](https://developer-docs.bynder.com/ui-components) Script

Support is directly via the [Amplience Support Desk](https://support.amplience.com) as a first line. Amplience will triage the issue and investigate the ownership. If the ownership is outside of Amplience they will ask you to contact Bynder support.
If you know that the issue is directly with the Bynder platform or the Bynder UI components Script then you should log an issue directly with Bynder using [Bynder Support](https://support.bynder.com/)

## Ownership between vendors
This extension works by enabling teams browse and select media assets from Bynder directly in the Amplience Dynamic Content CMS. In order to interface with Bynder, we use the Bynder UI Components Library supported and maintained by Bynder. Specifically the Bynder Universal Compact view.

- **Amplience Platform**: Storing the selected asset responses from Bynder and delivering to digital applications. Also showing selected assets in the content form as cards. 
- **Bynder/WebDAM Platform**: Authentication and access to the Bynder platform via the Universal Compact View.
- **Bynder/WebDAM - UI Components Script**: Ability to browse and select assets from Bynder using their UI.

### Using the stored content in your Front end applications
This extension stores information from Bynder in the Amplience Content form. When implementing this content into your FE you can use the information availble from Bynder to render / serve the media asset that you have selected.

This may be directly from Bynder and their CDN, or via another service.

Your FE should use the data / transform the data to meet your requirements.

### Examples
As an example, you may use this extension to browse and select assets from Bynder in your content form. But when you click to add an asset it says that your login is invalid for Bynder so you cannot browse and select an asset.
In this case, the issue is with logging into the Bynder platform and their responsibility to support you.

Another example would be that the extension itself is not loading at all. This would go via Amplience support as your configuration / extension settings may be invalid.

## Hosting
We provide a production URL as part of this extension to enable customers to get up and running quickly.

Should you want to host the extension on your own HTTPS hosting environments, please feel free to do so and update any URLs used in your extension settings.

## Watch
We recommend that you watch this repository so that you can be notified of updates and releases.

## Customisations
We expect customers to amend their configurations in their extensions configuration to point to their specific Bynder account with their properties that they require.

Should you customise the actual extension code then Amplience reserves the right to no longer support the customised extension.