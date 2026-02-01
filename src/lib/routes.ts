import {BookAIcon, House, type Icon as IconType } from 'lucide-svelte'
export const routes = [
    {
        name: 'Home',
        path: '/',
        public: true,
    },
    {
        name: 'Posts',
        path: '/posts',
        public: true,
    }
];
export interface Route {
    path?: string;
    fn?: (callback?: () => void) => void | Promise<void>;
    style?: string;
    name: string;
    icon?: typeof IconType | undefined;
    public?: boolean;
    role?: string;
    subRoutes?: Route[];
}
