# BarterBox <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->
- [High Level Overview](#high-level-overview)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
- [Release Two](#release-two)
  - [Release Functionality](#release-functionality)
- [Dependencies](#dependencies)
- [Build from QR Code](#build-from-qr-code)
- [Build from Repository](#build-from-repository)

## High Level Overview 
BarterBox is a lending/borrowing platform that facilitates the exchange of goods between individuals. Users can search for items on the marketplace and contact the lender to request the item for a specified duration. This platform aims to provide a convenient and secure way for people to access items they need without having to purchase them outright.

### Features
-  Marketplace: Users can search for items they need or offer items they want to lend to others.

-   Borrowing: Once a user finds an item they want to borrow, they can contact the lender to request the item for an agreed-upon period of time.

-   Lending: Users can list their items for others to borrow and set their own terms and conditions for borrowing.

-   Ratings: Users can leave ratings of the lenders and borrowers to build trust within the community.

### Technologies Used
-   Backend: Firebase (link: https://console.firebase.google.com/u/0/project/barter-box-a2d9f/overview)
-   Frontend: React Native, Expo
-   Database: Firestore

## Release Two
All planned functionality has been added in this release 

### Release Functionality
- Users can sign up and create a profile that can be used to login to the app
- Users can view all items available on the marketplace and click into items for further details on them
- Users can see which items they have borrowed and also see which items they have added to the app that could be borrowed by other users
- Chat Function Implemented 
- Can request items and lend to other users 
- Users can Accept returned items and rate the interaction 
- In the marketplace screen users can search by category 
- Notifications for messages 
- Return items and rate interactions 
- Updates in the UI 
- Reduce the firestore polling rate
- General bug fixes 

## Dependencies
To install all dependencies from a cloned version of this repository:
-   manouver to the '/frontend' directory
-   run the following command
```bash
npm install
```

From this all necessary dependencies to build the project should be installed

## Build from QR Code
To view the app on an iOS or Android device that has 'Expo Go' installed, please scan the following QR Code.

iOS QR Code:

![iOS QR Code for App](images/iosqr_release2.png)

Android QR Code:

![Android QR Code for App](images/androidqr_release2.png)

The Login Credentials for viewing the Test User account are:
```
Username: test@barterbox.com 
Password: test1234
```
The Login Credentials for viewing the Botterweck account are:
```
Username: botterweck@barterbox.com
Password: test1234
```
The Login Credentials for Daniel Whelan account are:
```
Username: test1@barterbox.com
Password: test1234
```

## Build from Repository
To build the project run the following in the /frontend directory 
```bash
npx expo start
```

This should then provide a screen as such

![Image of Command Line Output](images/QR_Code.png)
From this a number of steps can be taken:

-   The QR code can be scanned using an android or iOS device that has the 'Expo Go' app installed 
-   If you are running on a MacOS device with XCode installed, press i, to emulate an iphone experience
-   Press w to open the web version of the app 
    -   (N.B. This app is not optimised for web use so for the best UI experience please use one of the methods prior to this) 

