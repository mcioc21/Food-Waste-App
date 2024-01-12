import Contact from "./views/Contact";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import UserList from "./views/User";
import UserEdit from "./views/UserEdit";

export const routes = Object.freeze([
    {
        path: "/",
        component: Home,
        name: "Home",
    },
    {
        path: "/Contact",
        component: Contact,
        name: "Contact",
    },
    {
        path: "/User",
        component: UserList,
        name: "User",
    },
    {
        path: "*",
        component: NotFound,
        name: null,
    },
    {
        path: "/NewUser",
        component: UserEdit,
        name: null,
    },
    {
        path: "/EditUser/:id",
        component: UserEdit,
        name: null,
    }
]  );