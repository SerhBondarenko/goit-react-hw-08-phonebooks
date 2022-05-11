import { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
//import ContactsView from './views/ContactsView';
//import HomeView from './views/HomeView';
//import RegisterView from './views/RegisterView';
//import LoginView from './views/LoginView';
import Container from './components/Container';
import { authOperations, authSelectors } from './redux/auth';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import PublicRoute from 'components/PublicRoure/PublicRoute';

const HomeView = lazy(() => import('./views/HomeView'));
const RegisterView = lazy(() => import('./views/RegisterView'));
const LoginView = lazy(() => import('./views/LoginView'));
const ContactsView = lazy(() => import('./views/ContactsView'));

export default function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser=useSelector(authSelectors.getIsFetchingCurrentUser)

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return ( !isFetchingCurrentUser && <Container>
    <AppBar />

    <Suspense fullback={<p>Завантажуємо...</p>}>
    <Routes>
      <Route path="/" element={
            <PublicRoute >
           <HomeView/>
           </PublicRoute>
      } />
      <Route path="/register" element={
         <PublicRoute restricted>
           <RegisterView/>
         </PublicRoute>
      } />
      <Route path="/login" element={
            <PublicRoute restricted>
              <LoginView/>
            </PublicRoute>} />
            <Route
            path="contacts"
            element={
              <PrivateRoute>
                <ContactsView />
              </PrivateRoute>
            }
          />
          <Route path="*" element={
          <PublicRoute >
           <HomeView/>
           </PublicRoute>}
          />
      </Routes>
    </Suspense>
  </Container>
    
  );
}
