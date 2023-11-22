# Automation

Included in the automation folder are examples of extensions, content schemas and content types that you can install in your Amplience Dynamic Content instances to get started with this integration.

Functionality of the automation includes for each of the common modes which are:

1. Single Select
2. Multi Select
3. Single Select File

Automation:

- Content Type Schemas
- Content Types
- Extensions (Bynder) + Snippets
- Default Icons
- Default Cards
- Default Visualisation (JSON Preview)

> Note: The automation has minimal configuration, only settings for each mode and a default `assetType` filter for `image` only as these configurations are optional and specific to an implementation and your Bynder account.
> Feel free to add specifics like your portal url manually or via the Amplience Dynamic Content Extension Settings UI.

## Prerequisites for automation

Details for what is required to automate into your Amplience account as well as other assumptions and options.

## Mandatory

In order for this automation to work, you must have the following:

- An Amplience Dynamic Content Account.
- A valid API key (`clientId` & `clientSecret`) for this hub with a minimum of a [Developer role](https://amplience.com/developers/docs/concepts/permissions/roles/#developer)
- Your Amplience Dynamic Content `hubId` to import into
- Your Amplience Dynamic Content `contentRepoId` to import into

## Other assumptions

These are other assumptions for the automation, but can be changed to match your Amplience Dynamic Content account setup.

### Default Repository

The automation assumes that you have a repository in your Dynamic Content hub with a 'name' of `content`. This is default in most account setups.

If you have a different setup, or would like to apply this to multiple repositories simply do the following before running any automation:

1. Browse to `automation-files/type`
2. Open up all of the `*.hbs` files
3. Find the `repositories` object and amend the name to the repository name (s) in your account
4. Save the files and run the automation

## Running the automation

The files in `automation-files` are content types and content type schemas that allow you to create Bynder content items.

Firstly install the project dependencies ensuring that you are node version `18.x` first and then running `npm i`.

The easiest way to import these is through a script included with the project. Use `npm run import` to obtain a list of arguments, and provide them like `npm run import -- --clientId a --clientSecret b --hubId c --contentRepoId d` to import to a specific hub.

## Automation options

Here is a list of arguments when running `npm run import`:

```
Import Content

Options:
      --help                       Show help                           [boolean]
      --version                    Show version number                 [boolean]
  -a, --automationDir              automation files directory
                   [string] [default: "./amplience-automation/automation-files"]
  -t, --tempDir                    temporary directory for all run files
      --hubId                      amplience hub id          [string] [required]
      --clientId                   amplience client id       [string] [required]
      --clientSecret               amplience client secret   [string] [required]
      --contentRepoId              content repository id     [string] [required]
      --mapFile                    mapFile                [string] [default: ""]
      --schemaBaseUri              schemaBaseUri
                           [string] [default: "https://demostore.amplience.com"]
```

These additional options are not mandatory but may be useful:

| Option            | Alias | Meaning                                                                                                                                     |
| :---------------- | :---- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `--schemaBaseUri` |       | determines what base URI is used for the schema IDs being imported. If not provided, this will default to `https://demostore.amplience.com` |

## Automation result

Once you've run the automation, your account will be populated with content schemas, content types, dependant extensions, cards, icons and JSON visualisation.

## Customisations & Implementation

### Icons, Cards & Visualisations

The automation comes with default icons, cards and visualisations. These are stand-alone examples to enable you to get started quickly.

When using for your implementation it is likely that you will want to amend these to point to your application. You can amend directly in each content-type in the Amplience Dynamic Content UI after importing, or amend in the automation before importing.

1. Browse to `automation-files/type`.
2. Open up all of the `*.hbs` files.
3. Depending on what you would like to change, see the attributes [`icons`](#customising-icons), [`cards`](#customising-cards) or [`visualisations`](#customising-visualisations) object and amend as appropriate.
4. Save the files and run the automation.

#### Customising Icons

You can change your icon URL to be any HTTPS URL to an image of your choice. Feel free to use these as a basis.

More information here: [Icons documentation](https://amplience.com/developers/docs/dev-tools/guides-tutorials/content-types/#choosing-an-icon).

#### Customising Cards

These are iframed HTML pages which provide a preview of the content when selecting from the library view.

More information here: [Cards documentation](https://amplience.com/developers/docs/dev-tools/guides-tutorials/content-types/#configuring-a-card).

By default, the cards used map to known attributes stored by Bynder regardless of the mode used which are:

- Name: `name`
- Image(s): `originalUrl`

You can find more information about cards and customisations [here](../docs/CARDS.md)

#### Customising Visualisations

These are iframed HTML pages displayed alongside the Amplience content editor to see the result of your content edits as you make them.

More information here: [Visualisations documentation](https://amplience.com/developers/docs/dev-tools/guides-tutorials/content-types/#setting-up-visualizations).

We would recommend that these visualisations point to render your actual application to give users a clear representation of their content.

### Configuration

As notes, this automation comes with minimum configuration. See the documentation on [Configuration](../docs/CONFIGURATION.md) for more details that you can either put into your automation files or manually in the Amplience Dynamic Content UI.
