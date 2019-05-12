---
layout: default
title: CLI
has_children: false
nav_order: 7
permalink: /cli
has_toc: false
---

# CLI
Swup handy CLI serves to start creating plugins and themes in a matter of seconds. 

## Installation
Install swup CLI globally on your machine
```shell
npm install @swup/cli -g
```

## Usage
To create new plugin, run following command. 
```shell
swup create --name MyName
```
Swup CLI will create *SwupMyNamePlugin* folder, download plugin template and use defined name where it needs to. 

To start creating a theme, define a type flag. 

```shell
swup create --name MyName --type theme
```

Swup CLI will create *SwupMyNameTheme* folder, download theme template and use defined name where it needs to. 


