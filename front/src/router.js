import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';

const Routes = [
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/home',
    exact: true,
    component: Home
  },
  {
    path: '/signup',
    exact: true,
    component: SignUp
  }
];

export default Routes;