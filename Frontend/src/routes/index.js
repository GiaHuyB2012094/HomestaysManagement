// user
import Contact from 'src/pages/Contact';
import Home from 'src/pages/Home';
import Room from 'src/pages/Room';
import Service from 'src/pages/Service';
import News from 'src/pages/News';
import RoomDetail from 'src/pages/RoomDetail';
import Login from 'src/pages/Login';
import Register from 'src/pages/Register'
import Profile from 'src/pages/Profile';
import ListBooked from 'src/pages/ListBooked';
// admin
// import Admin from 'src/pages/Admin';
import Booking from 'src/pages/Admin/List/Booking';
import User from 'src/pages/Admin/List/User';
import RoomAdmin from 'src/pages/Admin/List/RoomAdmin'
import Convenient from 'src/pages/Admin/Sub/Convenient';
import Nearbytouristspot from 'src/pages/Admin/Sub/Nearbytouristspot';
import Branch from 'src/pages/Admin/Sub/Branch';
import Employee from 'src/pages/Admin/List/Employee';
import Dashboard from 'src/pages/Admin/Main/Dashboard';
// import Receipt from 'src/pages/Admin/Receipt';
import Receipt from 'src/pages/Admin/Receipt/receipt';
import Receiptionist from 'src/pages/Admin/Receiptionist/receiptionist';
// layout
import { HeaderOnly} from 'src/components/Layout';

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
