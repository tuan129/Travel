import DefaultLayoutEmployee from '~/components/Layout/DefaultLayoutEmployee';

// User
import { Home, Login, Register, Info, TicketPlane, InfoCustomer, Payment } from '~/pages';

//Employments
import { AddFlight, ListFilght, Statistics, Viewcustomer } from '~/pages';

const publicRoutes = [
    // User
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/info', component: Info, layout: null },
    { path: '/ticketPlane', component: TicketPlane },
    { path: '/infocustomer', component: InfoCustomer },
    { path: '/payment', component: Payment },

    //Employments
    { path: '/listfilght', component: ListFilght, layout: DefaultLayoutEmployee },
    { path: '/addflight', component: AddFlight, layout: DefaultLayoutEmployee },
    { path: '/statistics', component: Statistics, layout: DefaultLayoutEmployee },
    { path: '/viewcustomer', component: Viewcustomer, layout: DefaultLayoutEmployee },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
