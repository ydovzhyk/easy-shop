import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loader from 'components/Loader';
import PublicRoute from './PublicRoutes';
import PrivateRoute from './PrivateRoutes';
import CheckoutPage from 'pages/CheckoutPage/CheckoutPage';

const HomePage = lazy(() => import('pages/HomePage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const BasketPage = lazy(() => import('pages/BasketPage'));
const FavoritesPage = lazy(() => import('pages/FavoritesPage'));
const ProfilePage = lazy(() => import('pages/ProfilePage'));
const ProductsSearchPage = lazy(() => import('pages/ProductsSearchPage'));
const MyWares = lazy(() => import('components/Profile/MyWares/MyWares'));
const MyPurchases = lazy(() =>
  import('components/Profile/MyPurchases/MyPurchases')
);
const MyReviews = lazy(() => import('components/Profile/MyReviews/MyReviews'));
const AddProductPage = lazy(() => import('pages/AddProductPage'));
const EditProductPage = lazy(() => import('pages/EditProductPage'));
const MessagePage = lazy(() => import('pages/MessagePage'));
const MySettings = lazy(() =>
  import('components/Profile/MySettings/MySettings')
);
const EmailVerification = lazy(() =>
  import('components/Profile/EmailVerification/EmailVerification')
);
const ProductDetails = lazy(() => import('pages/ProductDetailsPage'));
const ProductsPage = lazy(() => import('pages/ProductsPage'));
const SellerInfoPage = lazy(() => import('pages/SellerInfoPage'));
const Wares = lazy(() => import('components/SellerInfo/Wares/Wares'));
const About = lazy(() => import('components/SellerInfo/About/About'));
const Reviews = lazy(() => import('components/SellerInfo/Reviews/Reviews'));
const MySales = lazy(() => import('components/Profile/MySales/MySales'));
const LikedProducts = lazy(() => import('components/Favorites/LikedProducts/LikedProducts'));
const UserSubscriptions = lazy(() => import('components/Favorites/UserSubscriptions/UserSubscriptions'));

const UserRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/easy-shop-test" element={<HomePage />} />
          <Route path="/registration" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product" element={<ProductsSearchPage />}>
            <Route index element={<ProductsPage />} />
            <Route path=":category" element={<ProductsPage />} />
            <Route path=":category/:subcategory" element={<ProductsPage />} />
          </Route>
          <Route
            path="/product/:category/:subcategory/:id"
            element={<ProductDetails />}
          />
          <Route path="/member/:id" element={<SellerInfoPage />}>
            <Route index element={<Wares />} />
            <Route path="mywares" element={<Wares />} />
            <Route path="myreviews" element={<Reviews />} />
            <Route path="about" element={<About />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/edit-product/:id" element={<EditProductPage />} />
          <Route path="/message" element={<MessagePage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/favorites" element={<FavoritesPage />}>
            {/* <Route index element={<LikedProducts />} /> */}
            <Route path="liked-products" element={<LikedProducts />} />
            <Route path="user-subscriptions" element={<UserSubscriptions />} />
          </Route>
          <Route path="/profile" element={<ProfilePage />}>
            <Route index element={<MyWares />} />
            <Route path="mywares" element={<MyWares />} />
            <Route path="mypurchases" element={<MyPurchases />} />
            <Route path="myreviews" element={<MyReviews />} />
            <Route path="mysettings" element={<MySettings />} />
            <Route path="mysales" element={<MySales />} />
          </Route>
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
