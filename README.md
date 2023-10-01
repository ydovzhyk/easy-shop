# Easy-shop

**_This is a small online marketplace for selling and buying various goods._**

---

Easy-shop site is made in a concise and stylish design that doesn't distract
users from their goals. The layout is adaptive with three breakpoints (480px,
768px, 1280px), for use on mobile, tablet and desktop devices. The user can
choose _the light or dark interface theme_ in the header of the site.

**_The header_** contains a bright animated **logo** with the name of the site
that is used as a navigation to the main page.  
Also there is **a product search window**. For authorized users the **button
"Додати товар"** implements a transition to the form of adding a new product for
sale, and for unauthorized ones - to **the registration/login page**. The
interface of the header for authorized users _in desktop version_ contains a
navigation buttons to the following pages: **shopping basket, dialogues page,
page of selected items (products, sellers, searches), profile page**.

![модальне вікно навігації](/public/images/readme/header_desktop.png)
![модальне вікно навігації](/public/images/readme/header_desktop_aut.png)

Such navigation buttons _in mobile_ version are displayed in the bottom of the
site.

![модальне вікно навігації](/public/images/readme/mobile_desktop_aut.png)

**_The main page_** of the site is a carousel of designed photos that are
changing change cyclically and can be flipped manually. **VIP ads** are
displayed a little lower, and even lower - **section with lists of discounted
products, new products and popular items**. Each of these lists has own
pagination.

**The footer** displays contact information for feedback, including **_social
media links_**, as well as **_a Google-maps map_** of the store's main office
location. In addition, by clicking on the **_"Команда розробників сайту"_**
button, you can go to the page with a list and contact details of all team
members who worked on the creation of the project.

![модальне вікно навігації](/public/images/readme/footer.png)

---

##Options

In order to use the entire range of site options, the user needs to **_register
(for new users)/login (for users with an existing account)_** by filling in the
appropriate ones validated forms. Authorization is possible, in particular,
through **a Google account**.

![модальне вікно навігації](/public/images/readme/login.png)

Each registered user has his own **_profile page_**, which displays: **its
rating, fact of verification, number of days since registration, location,
subscriber count, number of sales and stay on the site (in the case of online
status)**. This page is navigated by the button in the header (desktop version)
or at the bottom block (mobile version). Also at the profile page the user can
view:

- list of products for sale with the possibility of editing and deleting each of
  them;
- list of purchased goods with the possibility of filtering by status (all, new,
  confirmed, rejected);
- list of sold goods with the possibility of filtering by status (all, new,
  confirmed, rejected);
- lists of reviews received as a seller and as a buyer, as well as a list of
  reviews left.

  ![модальне вікно навігації](/public/images/readme/profile.png)

In the settings of this section the user can **edit contact data, change the
profile photo** (by uploading a photo no larger than 75 KB). Also, this section
implements **the verification** by email confirmation. So after clicking the
corresponding "Confirm" button a special link will be sent to the specified
email address, which is valid for 10 minutes from the moment of its formation
and which the user will need to switch to.

Every authorized user can **_add advertisement_** in the special page navigated
by the button "Додати товар" in the header. For this, it is necessary to fill
out the appropriate form:

- to indicate the name of the product, its description, brand, number of items,
  price, keywords;
- to select an option among presented items of the regarding status, category
  and section, size (you can choose several options), VIP status. In addition,
  the user is invited to upload up to 6 photos of the product, one of which will
  be the main one and will be displayed in the product card. When trying to send
  a form with unfilled mandatory field, the cursor will focus on such a field,
  and the page will scroll to the corresponding level.

  ![модальне вікно навігації](/public/images/readme/add.png)

After the submission of the product search window in header the user occurs in
**_the product catalog page_**.  
Navigation of this page is provided by clicking on the corresponding buttons at
the bottom of the header (on tablet and desktop versions) and consists of four
categories: **_"Чоловікам", "Жінкам", "Дитячі товари", "Краса та здоров'я"_**.

Navigation **_by categories and subcategories_** is done by opening a modal
window in the left part of the header.

![модальне вікно навігації](/public/images/readme/modal.png)

**_The product page_** consists of **_a filter section and a section list of
products_**. **_The filter section_** allows the user to search for products
according to the selected criteria: **_size_**(you can choose several options),
**_price_** (specific or within a certain range), **_condition_** (you can
choose several options) and **_brand_**. The installed filters will be applied
to product searches until the moment of filters reset by clicking on the
corresponding button or sending a new search word.

The product list section consists of:

- navigation by categories and subcategories of goods with display of the number
  of found products;
- block with buttons (reset filters, reset search word, subscribe to search (for
  authorized users) and sorting by popularity, by increasing price, by
  decreasing price, by date);
- a list of found products with pagination.

![модальне вікно навігації](/public/images/readme/filters.png)

By viewing **the general product card** the user can get acquainted with **_the
name of the product, its price, available sizes, the main photo, as well as the
number of users who assigned the product to their favorites_**. At the same
time, in order **_to rank product to the favorites_**, it is enough to click on
the "heart" icon in the lower right corner - such an icon will turn yellow. With
**_hover and focus on the product card_** the main product description will be
displayed on the muted background of photo.

By clicking on the product card, the user will occur at **the page of this
product**. Here it is possible to view each of the uploaded product photos in
full screen. Also this page contains **_detailed information about the product,
including its description, price, available sizes, condition, brand, available
shipping methods_**. By clicking on the corresponding icons, the user can **add
the product to favorites or ask the seller a question**. When you click on the
"Додати до кошика" button, the product is added to the list of products in the
basket, and in the header of the site the current number of products in this
list increases accordingly. Activating the "Купити зараз" button has as a result
the transition to **the page of the list of products in the basket**, where you
can finalize the order.

The product page contains general information about the seller of this product,
as well as sales possibility to subscribe to it. At the same time, clicking on
the seller's name will take user **to his page profile**, where there is an
opportunity to familiarize yourself with the list of the seller's ads, his
reviews (as a seller and as a buyer), as well as additional information about
him. The page also contains a button for making a subscription to the seller.

![модальне вікно навігації](/public/images/readme/productItem.png)

The list of cards of selected subscriptions to goods, sellers and searches is
displayed on the corresponding page, which can be navigated to by the button in
the header of the site. Each of the subscriptions can be deleted by clicking the
corresponding button in subscription cards.

The dialogues page displays active and archived dialogues between site users.
Communication is happening instantly, because the addressee receives the message
a few seconds after sending. The number of messages changes in the header of the
site immediately after receiving or reading.

The shopping basket page displays lists of ads that have been added to the
basket, grouped by each seller. At the end of lists, there are buttons for
adding other products of this seller (takes place a transition to the seller's
profile page) and for ordering. The checkout page displays:

- general information about the product;
- a form for filling in delivery data;
- the contact data receiving form, in which the data of the authorized user is
  filled by default;
- the price of the order with the "Checkout" button. After visiting the checkout
  page without making an order, such a draft order is saved in the user's
  profile in the section "My purchases" with the possibility to finalize such an
  order or ask questions to the seller. After placing an order, the user has the
  opportunity to leave a review. Such functionality is implemented by a modal
  window with the appropriate form for filling rating (from 1 to 5) and writing
  a review. In this modal window, the user can also read all of the other
  reviews of this seller. In addition, subscriptions to products, sellers,
  searches, deletion of such subscriptions, removal of products from the cart,
  adding an ad, placing an order and other actions are accompanied by a pop-up
  message in which the user is informed about the success of the corresponding
  actions. A 404 error page is also implemented on the site.

<p align="left"> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://heroku.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://sass-lang.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" alt="sass" width="40" height="40"/> </a> <a href="https://webpack.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/d00d0969292a6569d45b06d3f350f463a0107b0d/icons/webpack/webpack-original-wordmark.svg" alt="webpack" width="40" height="40"/> </a> </p>
