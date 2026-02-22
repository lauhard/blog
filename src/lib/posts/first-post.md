---
title: 'first-post'
excerpt: 'Vitest unit tests that run automatically on every push and PR. Type checking with svelte-check before every deploy. GitHub Actions as the automation engine — no manual deploys. Two environments: dev (workers.dev) and production (custom domain). Tag-based deploys — you control exactly when code goes live. Automatic tag cleanup when CI fails — no broken tags left behind. Version injection — the deploy tag is baked into the app at build time and readable at runtime.'

author: 'Andreas Launard'
created: 'Oct 20, 2024'
updated: 'Oct 20, 2024'
categories:
    - markdown
    - embedded
    - svelte
    - test
    - blub
    
published: false
image: '/img/bp1_small.png'
---

<script>
    import Repl from "$lib/components/Repl.svelte";
    import Image from "$lib/components/Image.svelte";
</script>


## 1. Test  

bla bla bla

### 1.1 Youtube Video  

<iframe class="video" width="100%" height="400px" src="https://www.youtube.com/embed/BBLQpiVEXko?si=djAKZoxGPwVnTiVb"
    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
</iframe>  

### 1.2 Code Embedding  

<iframe class="codesandbox"
  src="https://codesandbox.io/embed/new?codemirror=1"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

### 1.3 Website Embedding  

<iframe class="website"
  src="https://joyofcode.xyz/"
></iframe>

* Now our Theme switcher is ready. But the theme is not yet persistent.  
* We need to load the theme from cookies and change the `data-theme` in the head of the html file, before the page gets loaded.  
The `+hooks.server.ts` file is the right place to do this, because it runs on every request.  
Add the following code to the `+hooks.server.ts` file.  


<Image src='/img/raspberry.png'></Image>



<Repl url="https://svelte.dev/playground/319a0693a4054edcbfda2cac9b9ec84e?version=5.49.1"></Repl>

```css  
    background-color: red;
```



# Welcome to StackEdit

Hi! I'm your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.

# Files

StackEdit stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!**

## Create files and folders

The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.

## Switch to another file

All your files and folders are presented as a tree in the file explorer. You can switch from one to another by clicking a file in the tree.

## Rename a file

You can rename the current file by clicking the file name in the navigation bar or by clicking the **Rename** button in the file explorer.

## Delete a file

You can delete the current file by clicking the **Remove** button in the file explorer. The file will be moved into the **Trash** folder and automatically deleted after 7 days of inactivity.

## Export a file

You can export the current file by clicking **Export to disk** in the menu. You can choose to export the file as plain Markdown, as HTML using a Handlebars template or as a PDF.

# Synchronization

Synchronization is one of the biggest features of StackEdit. It enables you to synchronize any file in your workspace with other files stored in your **Google Drive**, your **Dropbox** and your **GitHub** accounts. This allows you to keep writing on other devices, collaborate with people you share the file with, integrate easily into your workflow... The synchronization mechanism takes place every minute in the background, downloading, merging, and uploading file modifications.

There are two types of synchronization and they can complement each other:

* The workspace synchronization will sync all your files, folders and settings automatically. This will allow you to fetch your workspace on any other device.
 > To start syncing your workspace, just sign in with Google in the menu.

* The file synchronization will keep one file of the workspace synced with one or multiple files in **Google Drive**, **Dropbox** or **GitHub**.
 > Before starting to sync files, you must link an account in the **Synchronize** sub-menu.

## Open a file

You can open a file from **Google Drive**, **Dropbox** or **GitHub** by opening the **Synchronize** sub-menu and clicking **Open from**. Once opened in the workspace, any modification in the file will be automatically synced.

## Save a file

You can save any file of the workspace to **Google Drive**, **Dropbox** or **GitHub** by opening the **Synchronize** sub-menu and clicking **Save on**. Even if a file in the workspace is already synced, you can save it to another location. StackEdit can sync one file with multiple locations and accounts.

## Synchronize a file

Once your file is linked to a synchronized location, StackEdit will periodically synchronize it by downloading/uploading any modification. A merge will be performed if necessary and conflicts will be resolved.

If you just have modified your file and you want to force syncing, click the **Synchronize now** button in the navigation bar.

> **Note:** The **Synchronize now** button is disabled if you have no file to synchronize.

## Manage file synchronization

Since one file can be synced with multiple locations, you can list and manage synchronized locations by clicking **File synchronization** in the **Synchronize** sub-menu. This allows you to list and remove synchronized locations that are linked to your file.

# Publication

Publishing in StackEdit makes it simple for you to publish online your files. Once you're happy with a file, you can publish it to different hosting platforms like **Blogger**, **Dropbox**, **Gist**, **GitHub**, **Google Drive**, **WordPress** and **Zendesk**. With [Handlebars templates](http://handlebarsjs.com/), you have full control over what you export.

> Before starting to publish, you must link an account in the **Publish** sub-menu.

## Publish a File

You can publish your file by opening the **Publish** sub-menu and by clicking **Publish to**. For some locations, you can choose between the following formats:

* Markdown: publish the Markdown text on a website that can interpret it (**GitHub** for instance),
* HTML: publish the file converted to HTML via a Handlebars template (on a blog for example).

## Update a publication

After publishing, StackEdit keeps your file linked to that publication which makes it easy for you to re-publish it. Once you have modified your file and you want to update your publication, click on the **Publish now** button in the navigation bar.

> **Note:** The **Publish now** button is disabled if your file has not been published yet.

## Manage file publication

Since one file can be published to multiple locations, you can list and manage publish locations by clicking **File publication** in the **Publish** sub-menu. This allows you to list and remove publication locations that are linked to your file.

# Markdown extensions

StackEdit extends the standard Markdown syntax by adding extra **Markdown extensions**, providing you with some nice features.

> **ProTip:** You can disable any **Markdown extension** in the **File properties** dialog.


```javascript

let x = Object.entries(xy).forEach((key,val)=>{
    console.log("key", key);
    console.log("val", val);
    console.log("val", val);
    console.log("val", val);
    console.log("val", val);
    console.log("val", val);
    console.log("val", val);
    console.log("val", val);
    console.log("val", val);
    console.log("val", val);
    console.log("val", val);
    console.log("val", val);
    console.log("val", val);
    console.log("val", val);
    console.log("val", val);
    console.log("val", val);
    console.log("val", val);
    console.log("val", valsdfffffffffffffffffffddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffffffffffffffffffffff);
})

```


## SmartyPants

SmartyPants converts ASCII punctuation characters into "smart" typographic punctuation HTML entities. For example:

|                |ASCII                          |HTML                         |
|----------------|-------------------------------|-----------------------------|
|Single backticks|`'Isn't this fun?'`            |'Isn't this fun?'            |
|Quotes          |`"Isn't this fun?"`            |"Isn't this fun?"            |
|Dashes          |`-- is en-dash, --- is em-dash`|-- is en-dash, --- is em-dash|

