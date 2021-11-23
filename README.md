# Food-Tier-Maker (temp name)

## Background
This project was created independently as a means to familiarize myself (GiveKumaAGun) with Typescript and Google Cloud Platform's services. Idea was based on [a project I created during my time at a programming bootcamp](https://github.com/GiveKumaAGun/menu-item-rating/).

## About this project

Food-Tier-Maker is a web app for creating tier lists of menu items at restaurants. 

While there are no restrictions in how the app's features are actually used, development will focus on allowing a user to create a tier list for a specific restaurant, and the contents of that tier list will be the restaurant's menu items.

## Demo

The demo can be previewed at: https://menu-item-ranker.an.r.appspot.com/

### Operation flow
1. Login using google or the public demo settings
2. Click 'Create a list' and give it a name to create a new tier list
3. Click 'View Details' of a list to view and edit its contents.
4. Use buttons to customize the tier list.
    - 'Add Tier' creates a new row
    - 'Add Item' creates a new item
    - 'Edit Tiers' allows you to rename and delete rows.
    - 'Delete List' deletes the entire list.
5. Click on an item to edit its name and comment, and change its row.

### Notes about the demo
- Logging in with Google uses Firebase authentication.

- The public demo settings use a guest account with lists that are visible, editable, and deletable by anyone using the public demo settings.

## Planned features

- Allow users to upload images for items in tier lists
- Allow a user to view the lists of other users
- Use Google Places API to fetch restaurant data

