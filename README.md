# Easy-shop

**_This is a small online marketplace for selling and buying various goods._**

#### Frontend

<div> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/><a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://sass-lang.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" alt="sass" width="40" height="40"/> </a> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>  <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://webpack.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/d00d0969292a6569d45b06d3f350f463a0107b0d/icons/webpack/webpack-original-wordmark.svg" alt="webpack" width="40" height="40"/> </a> <a href="https://redux-toolkit.js.org" target="_blank" rel="noreferrer"> <img src="/public/images/readme/redux.svg" alt="redux" width="40" height="40"/></a> <a href="https://axios-http.com/" target="_blank" rel="noreferrer"> <img src="/public/images/readme/axios.png" alt="axios" width="40" height="40"/> </a></div>

---

#### Backend

<div> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a>  <a href="https://heroku.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a>  <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://websockets.spec.whatwg.org/" target="_blank" rel="noreferrer"> <img src="/public/images/readme/websocket.png" alt="websocket" width="40" height="40"/> </a> </div>

---

## General description

Easy-shop site is made in a concise and stylish design that doesn't distract
users from their goals. The layout is adaptive with three breakpoints (480px,
768px, 1280px), for use on mobile, tablet and desktop devices. The user can
choose _the light or dark interface theme_ in the header of the site.

**_Header_** contains a bright animated **logo** with the name of the site that
is used as a navigation to the main page, **a product search window** and a
**button "Додати товар"**.

> For authorized users the button "Додати товар" implements a transition to the
> form of adding a new advertisement, and for unauthorized ones - to the
> registration/login page

For unauthorized users **buttons for loginazation or registration** are also
located in the header.

<img src='/public/images/readme/header_desktop.png' alt="Header for unauthorized users" width='90%'
heigth='auto'></img>

The interface of the header in desktop version _for authorized users_ contains a
navigation buttons to the following pages: **shopping basket, dialogues,
favourite items (products, sellers, searches), profile** and an **exit button**.

<img src='/public/images/readme/header_desktop_aut.png' alt="Header for authorized users" width='90%'
heigth='auto'></img>

Same navigation buttons in mobile version are displayed in the bottom of the
site.

<img src='/public/images/readme/mobile_desktop_aut.png' alt="Navigation in mobile version" width='300px'
heigth='auto'></img>

**_Main page_** displays a carousel of designed photos that are changing
cyclically and can be flipped manually. **VIP ads** are viewed a little lower,
and even lower there is **a section with lists of discounted products, new
products and popular items**. Each of these lists has own pagination.

<img src='/public/images/readme/main_page.png' alt="Navigation in mobile version" width='90%'
heigth='auto'></img>

**Footer** displays contact information for feedback, including **_social media
links_**, as well as **_a Google-maps map_** of the store's main office
location. In addition, by clicking on the button **_"Команда розробників
сайту"_**, the user can go to the page with a list and contact details of all
team members who worked on the project.

<img src='/public/images/readme/footer.png' alt="Footer" width='90%'
heigth='auto'></img>

---

## Options

### Loginization/registration

In order to use the entire range of site options, the user needs to
`register (for new users)/login (for users with an existing account)` by filling
in the appropriate ones validated forms. Navigation to these pages is displayed
in the header in desktop version or in the bottom in mobile version.  
**To register**, you must enter your login, e-mail and password (more than 7
characters). In order **to login** there are two fields to enter e-mail and
password. Authorization is possible, in particular, through **a Google
account**.

<img src='/public/images/readme/login.png' alt="Login Page" width='90%'
heigth='auto'></img>

### Profile page

Each registered user has own **_profile page_**, that displays: **rating, fact
of verification (if verifired), number of days since registration, location,
subscriber count, number of sales and online status**. This page is navigated by
the button in the header (desktop version) or at the bottom block (mobile
version).  
Also at the profile page the user can view:

- **_selling goods_** with the possibility of editing and deleting each of them:
- **_purchased goods_** with the possibility of filtering by status: all, new,
  confirmed, rejected;
- **_sold goods_** with the possibility of filtering by status (all, new,
  confirmed, rejected);
- **_received reviews_** as a seller and as a buyer, and **_reviews that were
  left_**;
- **_settings_**.

<img src='/public/images/readme/profile.png' alt="Profile Page" width='90%'
heigth='auto'></img>

In the settings the user can `edit contact data, change the profile photo` (by
uploading a photo no larger than 75 KB) and `verify the email`. So after
clicking the corresponding button "Підтвердити" a special link will be sent to
the specified email address, which is valid for 10 minutes from the moment of
its formation and which the user needs to follow.

### Adding a new ad

Every authorized user can `add advertisement` at the special page that is
navigated by the button "Додати товар" in the header. For adding new add it is
necessary to `fill out the fields in the appropriate form`:

- indicate **the name of the product, its description, brand, number of items,
  price, keywords**;
- select an option among presented ones for **the regarding status, category and
  section, size (you can choose several options), VIP status**;
- upload up to 6 **photos of the product**, one of which will be the main one
  that means displaying in the product card.

If the user will try to `send a form with unfilled required field`, the cursor
is focused on such a field, and the page scrolls to the corresponding level.

<img src='/public/images/readme/add.png' alt="Add Page" width='90%'
heigth='auto'></img>

### Product page

After the submission of the product search window in header the user occurs on
**_the product page_**. Navigation of this page is provided by clicking on the
corresponding buttons at the bottom of the header (on tablet and desktop
versions) and consists of four categories: **_"Чоловікам", "Жінкам", "Дитячі
товари", "Краса та здоров'я"_**. Navigation **_by categories and
subcategories_** is displayed by opening a modal window in the left part of
header.

<img src='/public/images/readme/modal.png' alt="Modal window of the catalog" width='90%'
heigth='auto'></img>

> **_The product page_** consists of two sections: \***\*filters and list of
> products\*\***.

**The section of filters** allows the user
`to search for products according to the selected criteria`: **_size_**(you can
choose several options), **_price_** (specific or within a certain range),
**_condition_** (you can choose several options) and **_brand_**. The installed
filters will be applied to product searches until the moment of filters reset by
`clicking on the corresponding button or submitting a new search word`.

**The section of products** consists of:

- **_navigation by categories and subcategories of goods_** with displaying the
  number of found products;
- **_block with buttons_**
  `(reset filters, reset search word, subscribe to search (for authorized users) and sorting by popularity, by increasing price, by decreasing price, by date)`;
- **_list of found products_** with pagination.

<img src='/public/images/readme/filters.png' alt="Product page" width='90%'
heigth='auto'></img>

### General product card and Product item page

By viewing **the general product card** at any page the user can get acquainted
with **_the name of the product, its price, available sizes, the main photo, as
well as the number of users who assigned the product to their favorites_**. In
order **_to rank product to the favorites_**, it is enough to
`click on the "heart" icon` in the lower right corner - such an icon will turn
yellow. With **_hover and focus on the product card_** the main product
description will be displayed on the muted background of the photo.

`By clicking on the product card`, the user will occur at **the page of this
product**. Here it is possible
`to view each of the uploaded product photos in full screen`. Also this page
contains **_detailed information about the product, including its description,
price, available sizes, condition, brand, available shipping methods_**.  
By clicking on the corresponding icons, the user can **_add the product to
favorites or ask the seller a question_**. If the user
`clicks on the button "Додати до кошика"`, the product will be added to the list
of products in the basket, and in the header of the site the current number of
products in this list will increase accordingly.
`Activating the button "Купити зараз"` has as a result the transition to **the
page of the list of products in the basket**, where the user can finalize the
order.  
Also the product item page contains general information about the seller of this
product, as well as a possibility `to subscribe to the seller` by the
corresponding button.
<img src='/public/images/readme/productItem.png' alt="Product item page" width='90%'
heigth='auto'></img>

### Seller's profile page

Clicking on the seller's name in the the product item page will take user **to
seller's profile page**, where there is an opportunity to familiarize yourself
with **_the list of the seller's ads, reviews_** (as a seller and as a buyer),
as well as **_additional information about the seller_**. The page also contains
`a button for making a subscription` to the seller.

<img src='/public/images/readme/seller_profile.png' alt="Seller's profile page" width='90%'
heigth='auto'></img>

### Favourites

The list of cards of **selected subscriptions to goods, sellers and searches**
is displayed on the corresponding page, which can be navigated to by
`the button in the header of the site`. Each of the subscriptions can be
`deleted` by clicking the corresponding button located on subscription cards.

<img src='/public/images/readme/favorites.png' alt="Favourites page" width='90%'
heigth='auto'></img>

### Dialogues

The dialogues page displays **_active and archived dialogues_** between site
users. Communication is happening instantly, because the addressee receives the
message a few seconds after sending. The number of messages changes in the
header of the site immediately after receiving or reading.

<img src='/public/images/readme/dialogues.png' alt="Favourites page" width='90%'
heigth='auto'></img>

### Shopping basket

**_Shopping basket page_** displays lists of **ads that have been added to the
basket**, grouped by each seller. At the end of each list, there are buttons for
`adding other products of this seller (by transition to the seller's profile page) and for ordering`.

<img src='/public/images/readme/basket.png' alt="Basket page" width='90%'
heigth='auto'></img>

### Checkout

The checkout page displays:

- **general information** about the product;
- **a form for filling in** delivery data;
- **the contact data receiving form**, in which the data of the authorized user
  is filled by default;
- the block that contains **the price of the order** and the button "Оформити".

After `visiting the checkout page without making an order` a kind of a draft
order will be saved in the user's profile page in the section "Мої покупки" with
a possibility `to finalize` such an order or `ask a question to the seller`.  
 <img src='/public/images/readme/how to do a review.png' alt="Basket page" width='90%' heigth='auto'></img>

### Leaving the review

After placing an order, the user has the opportunity to `leave a review`. Such
functionality is implemented by **a modal window** with the appropriate
`form for filling rating (from 1 to 5) and writing a review`. In this modal
window, the user can also `read all of the other reviews of this seller`.
<img src='/public/images/readme/how to do a review.png' alt="Basket page" width='90%' heigth='auto'></img>

Making the subscriptions to products, sellers, searches, deletion of such
subscriptions, removal of products from the cart, adding an ad, placing an order
and other actions are accompanied by **_a pop-up message_** in which the user is
informed about the success of the corresponding actions.
