import { Router } from "express";
import home from './home.route.js'
const router = Router();

const defaultRoutes = [
    {
        path: "/home",
        route: home,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;