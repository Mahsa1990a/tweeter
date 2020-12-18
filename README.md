# Tweeter Project

Tweeter is a simple, single-page Twitter clone.


## Final Product 

!["login page"]()
!["register page"]()
!["shortURL"]()
!["creat new URL"]()

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
- body-parser
- chance

## Technology

Mostly a front-end project, with focus on having a good-looking UI.

This app uses HTML, CSS, JS, jQuery and AJAX on the front-end; and Node, Express and MongoDB on the back-end.

## Responsive Design

For desktops and laptops (over 1024px), your profile will appear on the left, and tweets on the right.

For smaller devices like mobile, sections will be stacked on top of each other, profile being on top and tweets bottom.

## Features

- Tweet validation prevents you from sending empty tweets, or those with over 140 characters.
- Tweeting field toggles on/off as you prefer.
- Each tweet shows the user's name, handle, and when hovered over, social icons.
