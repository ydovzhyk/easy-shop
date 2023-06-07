import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loader from 'components/Loader';
import PublicRoute from './PublicRoutes';
import PrivateRoute from './PrivateRoutes';
import Register from 'components/Register/Register';
import Login from 'components/Login/Login';

const HomePage = lazy(() => import('pages/HomePage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));
const BasketPage = lazy(() => import('pages/BasketPage'));
const FavoritesPage = lazy(() => import('pages/FavoritesPage'));
const ProfilePage = lazy(() => import('pages/ProfilePage'));
const MyWares = lazy(() => import('../Profile/MyWares'));
const MyShoppings = lazy(() => import('../Profile/MyShoppings'));
const MyReviews = lazy(() => import('../Profile/MyReviews'));
const AddProductPage = lazy(() => import('pages/AddProductPage'));
const AuthPage = lazy(() => import('pages/AuthPage'));
const MySettings = lazy(() => import('../Profile/MySettings/MySettings'));
const PhoneVerification = lazy(() => import('../Profile/PhoneVerification'));

const UserRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/easy-shop-test" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />}>
            <Route index element={<Login />} />
            <Route path="registration" element={<Register />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />}>
            <Route path="mywares" element={<MyWares />} />
            <Route path="myshoppings" element={<MyShoppings />} />
            <Route path="myreviews" element={<MyReviews />} />
          </Route>
          <Route path="/mysettings" element={<MySettings />} />
          <Route path="/phone-verification" element={<PhoneVerification />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;