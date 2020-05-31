import Login from './pages/Login';
import Home from './pages/Home';

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
  }
];

export default Routes;