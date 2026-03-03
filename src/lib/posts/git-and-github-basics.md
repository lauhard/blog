---
title: 'Git and GitHub basics'
excerpt: 'In this blog post, I will explain what Git is and how it works. I will cover just the very basics, but after reading this, you should have a better understanding what is actually going on when using Git in your projects.'

author: 'Andreas Launard'
created: 'March 04, 2026'
updated: 'March 04, 2026'
categories:
    - Git
    - GitHub
published: true
image: '/img/bp3_small.png'
seriesName: 'Git and GitHub 101'
seriesUrl: 'git-and-github-basics'
seriesHero: '/img/bp3_small.png'
---

<script>
    import Image from "$lib/components/Image.svelte";
</script>

## What is Git 
Git is an open source version control system for your source code.
It was created by the godfather of Linux, Linus Torvalds.  
It keeps the history of your project by saving snapshots (commits) over time. 

## How does Git work?
When you create a Git repository, you typically start with a default branch called `main`.  
With `git commit`, Git creates a new  commit (snapshot) with a unique ID and moves the current branch pointer to this latest commit.  
Each commit also stores a reference to its parent commit (the previous snapshot).  
A branch name like `main` is just a reference that usually points to the latest commit on that branch.  
You can think of it like a label (`main`) , that is pointing to a commit.  

`HEAD` is another reference that usually points to a branch name.  
It tells Git what you currently have checked out (the branch you are currently working on).

You can think of it, like an empty bracelet called “main” with no pearls on it. 
With every commit, you add a new pearl (the current state of your code) to your bracelet. 
Then you move the label `main` to the latest pearl.
You can think of the `HEAD` pointer as your "workbench" where you work on your "main bracelet".

Branches are basically additional pointers (references) to commits.
When you create a new branch, Git does not copy your whole project.
Instaed it is putting a second pointer on the same commit as your current branch at the time.
You can think of it like putting a second label to the commit the current branch name is pointing to.

``` js

console.log("test";


```

For example, you want to work on a new feature in your project but you don’t want to mess up your main branch.
You create a feature branch like `feature/login` and you switch or checkout that branch.
When you now create a new commit, only the branch pointer `feature/login` moves forward to the latest commit. The branch pointer `main` stays behind. 

Since you checked out `feature/login`, also `HEAD` points to the latest commit of this branch. 
If your feature is complete and well tested, you merge the branch `feature/login` back into the `main` branch. 
This step combines the history of both branches.

You can think of it like working on a "feature workbench" for your bracelet. 
You just see the latest pearl of your "main bracelet" and from there, you implement your fancy diamond charm on the "feature bracelet".
When you are done, you combine the "feature bracelet" back into the "main bracelet". 

I hope this gives you an idea what Git is and how it works under the hood :-)
Thanks for reading.

<br>
<br>


Cheers!
