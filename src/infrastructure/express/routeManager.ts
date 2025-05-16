import indexRouter from './routes/index';
import usersRouter from './routes/users';

export const routers = [
    { path: '/', routes: indexRouter },
    { path: '/api/users', routes: usersRouter }
];