# Hosting

## Hosting the Bynder extension

This document describes a straightforward method of forking and hosting the extension yourself. This is useful if you want full control over your target version and features - you can easily fork this repository and host your own version of the Bynder Extension with a few simple commands. Of course, the extension can be hosted on any static hosting service (e.g. Netlify, Amplify), this guide simply describes a simple way of doing this.

Alternatively, return to [README.md](../README.md) for more information on the extension.

## Forking the repository

On GitHub, you can fork the repository by clicking the "Fork" button at the top right. This will create a copy of the repository that you have write access to, hosted under your GitHub account.

You will then need to clone the repository onto your computer using Git. You can get a clone url from the "Code" dropdown on your fork, or you can open with GitHub Desktop. Make sure you have Node installed too, as it is used to build the extension.

## Building the repository

To build the extension, you will first need to install the project with `npm install` (`npm i`). Once installed, you can then build it with `npm run build`.

If you want to run the extension itself locally, this can be done with `npm run start` .

## Hosting the extension

If you choose to host the extension yourself it must be hosted on an HTTPS location. Your extension settings and URL should be updated to reflect your hosting location.

## Keeping your fork updated with remotes

When you fork a GitHub project, you actually create a copy of the repository at the time it is forked. You won't get any updates to the base repository automatically, you need to pull them in yourself.

Remotes allow you to use multiple remote git repositories and move commits between them. If you want to use new commits in our base repository, you'll want to add it as a remote as follows:

`git remote add <remote-name> https://github.com/amplience/dc-extension-bynder.git`

Branches will then be accessible via Git. For example, you can get the master branch of a remote using the following: `<remote-name>/master`. This will let you view and use commits from our base repository to update your own.

A good example remote name is `upstream`.

### Resetting a branch to match ours

If you're using your fork as a version snapshot of our repository and want to update, then you can easily reset your master branch to match the one in our repo. Checkout _your_ master branch with `git checkout master`, then reset it to the state of ours with `git fetch <remote-name>`, followed by `git reset --hard <remote-name>/master`.

### Rebasing changes on top of the latest master

If you've made your own changes to the extension, but want to pull in changes that we've made on the master branch or recently released, then you can also rebase your modified branch on top of our master branch. Simply make sure that your remote is configured, and run `git fetch <remote-name>`, followed by `git rebase <remote-name>/master`

You may run into merge conflicts along the way if you've changed the same files as the source. If this happens, look at the files listed, resolve the conflicts, and continue with `git rebase --continue` until all of your commits have been applied.

## Github Pages Specific notes

### Publishing GitHub Pages on your fork

After you've built your version of the Bynder extension, you can publish it with the following command:

`npx gh-pages -d build`

Note: if you're on a remote, you'll want to publish with this command:

`npx gh-pages -d build -o remote-name`

This will create or update the `gh-pages` branch on your repository for you. You may be asked for GitHub authentication, depending on how you configured Git in the first place.

### Setting up GitHub Pages for the first time

After you've published the `gh-pages` branch, you'll want to enable GitHub Pages hosting on your repository. Head over to the "Settings" tab on your fork, then near the bottom of "Options" you'll see a "GitHub Pages" section. Make sure that you set the branch to `gh-pages`, and save to publish the site.

It may take some time for the site to actually publish, but when it does you should be shown a URL for your version of the Bynder extension.

It will typically result in a URL like this: `https://<username>.github.io/dc-extension-bynder/index.html`

You can use this URL directly as an extension from DC. You will only have to do this once - all future publishes should update the version at this URL automatically!
