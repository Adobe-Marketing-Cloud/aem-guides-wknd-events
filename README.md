# WKND Events SPA Editor Project

This is the code companion for a tutorial that walks through the process of setting up an AEM project to leverage the Single Page App or SPA Editor feature.

View the tutorial on HelpX: [Getting Started with the AEM SPA Editor - WKND Tutorial](https://helpx.adobe.com/experience-manager/kt/sites/using/getting-started-spa-wknd-tutorial-develop.html)

## Modules

The main parts of the template are:

* react-app: a webpack project for the React application. The App is built and deployed to AEM in the form of a client library via the ui.apps module. see the README beneath the react-app for more details.
* core: Java bundle containing all core functionality like OSGi services, listeners or schedulers, as well as component-related Java code such as servlets or request filters.
* ui.apps: contains the /apps (and /etc) parts of the project, ie JS&CSS clientlibs, components, templates, runmode specific configs as well as Hobbes-tests
* ui.content: contains sample content using the components from the ui.apps

## How to build

To build all the modules run in the project root directory the following command with Maven 3:

    mvn clean install

If you have a running AEM instance you can build and package the whole project and deploy into AEM with  

    mvn clean install -PautoInstallPackage

Depending on your maven configuration, you may find it helpful to force the resolution of the Adobe pubic repo with

    mvn clean install -PautoInstallPackage -Padobe-public
    
Or to deploy it to a publish instance, run

    mvn clean install -PautoInstallPackagePublish
    
Or alternatively

    mvn clean install -PautoInstallPackage -Daem.port=4503

Or to deploy only the bundle to the author, run

    mvn clean install -PautoInstallBundle


## Maven settings

If you experience the following error when building:

```
[ERROR] Unresolveable build extension: Plugin com.day.jcr.vault:content-package-maven-plugin:0.5.1 
```

Use `mvn clean install -PautoInstallPackage -Padobe-public` command. 

Alternatively you can add the `adobe-public` repository to your Maven settings by referring to:

    http://helpx.adobe.com/experience-manager/kb/SetUpTheAdobeMavenRepository.html
