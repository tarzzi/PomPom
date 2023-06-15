# PomPom Pomodoro Timer

- Pomodoro timer for Teams
- Built using SPFx and Teams Toolkit
- Quick hack - Fun hack

## Initial view

![p3.png](p3.png)

## Running

![p2.png](p2.png)

## Demo

![](demo.gif)

## Summary

The SharePoint Framework (SPFx) is a page and web part model that provides full support for client-side SharePoint development, easy integration with SharePoint data, and extending Microsoft Teams. This project applies SPFx to Teams personal tab and group tab support.

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Prerequisites

> - [Set up SharePoint Framework development environment](https://aka.ms/teamsfx-spfx-dev-environment-setup)
> - An Microsoft 365 account. Get your own free Microsoft 365 tenant from [Microsoft 365 developer program](https://developer.microsoft.com/en-us/microsoft-365/dev-program)
> - [Teams Toolkit Visual Studio Code Extension](https://aka.ms/teams-toolkit) version 5.0.0 and higher or [TeamsFx CLI](https://aka.ms/teamsfx-cli)

## Minimal Path to Awesome

1. Open the project with VSCode, click `Provision` in LIFECYCLE panel of Teams Toolkit extension.

    Or you can use TeamsFx CLI with running this cmd under your project path:
    `teamsfx provision`

    It will provision an app in Teams App Studio. You may need to login with your Microsoft 365 tenant admin account.

2. Build and Deploy your SharePoint Package.
    - Click `Deploy` in LIFECYCLE panel of Teams Toolkit extension, or run `Teams: Deploy` from command palette. This will generate a SharePoint package (*.sppkg) under sharepoint/solution folder.
  
    Or you can use TeamsFx CLI with running this cmd under your project path:
        `teamsfx deploy`

    - After building the *.sppkg, the Teams Toolkit extension will upload and deploy it to your tenant App Catalog. Only tenant App Catalog site admin has permission to do it. You can create your test tenant following [Setup your Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant).
3. Go back to Teams Toolkit extension, click `Teams: Publish` in LIFECYCLE panel.

    Or you can use TeamsFx CLI with running this cmd under your project path:
        `teamsfx publish`

    You will find your app in [Microsoft Teams admin center](https://admin.teams.microsoft.com/policies/manage-apps). Enter your app name in the search box. Click the item and select `Publish` in the Publishing status.

4. You may need to wait for a few minutes after publishing your teams app. And then login to Teams, and you will find your app in the `Apps - Built for {your-tenant-name}` category.

5. Click "Add" to use the app as a personal tab. Click "Add to a team" to use the app as a group tab.