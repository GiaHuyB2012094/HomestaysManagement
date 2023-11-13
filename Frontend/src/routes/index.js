// user
import Contact from '~/pages/Contact';
import Home from '~/pages/Home';
import Room from '~/pages/Room';
import Service from '~/pages/Service';
import News from '~/pages/News';
import RoomDetail from '~/pages/RoomDetail';
import Login from '~/pages/Login';
import Register from '~/pages/Register'
import Profile from '~/pages/Profile';
import ListBooked from '~/pages/ListBooked';
// admin
// import Admin from '~/pages/Admin';
import Booking from '~/pages/Admin/List/Booking';
import User from '~/pages/Admin/List/User';
import RoomAdmin from '~/pages/Admin/List/RoomAdmin'
import Convenient from '~/pages/Admin/Sub/Convenient';
import Nearbytouristspot from '~/pages/Admin/Sub/Nearbytouristspot';
import Branch from '~/pages/Admin/Sub/Branch';
import Employee from '~/pages/Admin/List/Employee';
import Dashboard from '~/pages/Admin/Main/Dashboard';
// import Receipt from '~/pages/Admin/Receipt';
import Receipt from '~/pages/Admin/Receipt/receipt';
import Receiptionist from '~/pages/Admin/Receiptionist/receiptionist';
// layout
import { HeaderOnly} from '~/components/Layout';

export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/News', component: News },
    { path: '/Room', component: Room },
    { path: '/Contact', component: Contact },
    { path: '/Service', component: Service },
    { path: '/ListBooked', component: ListBooked },
    { path: '/Profile', component: Profile },
    { path: '/Book/:roomid/:fromdate/:todate', component: RoomDetail },
    { path: '/Login', component: Login, layout: HeaderOnly },
    { path: '/Register', component: Register, layout: HeaderOnly },
];
export const privateRoutes = [
    // { path: '/Admin', component: Admin},
    { path: '/Admin/List/Booking', component: Booking},
    { path: '/Admin/List/User', component: User},
    { path: '/Admin/List/Room', component: RoomAdmin},
    { path: '/Admin/List/Employee', component: Employee},
    { path: '/Admin/Sub/Convenient', component: Convenient},
    { path: '/Admin/Sub/Nearbytouristspot', component: Nearbytouristspot},
    { path: '/Admin/Sub/Branch', component: Branch},
    { path: '/Admin/Receipt', component: Receipt},
    { path: '/Admin/Receiptionist', component: Receiptionist},
    { path: '/Admin', component: Dashboard},

];
