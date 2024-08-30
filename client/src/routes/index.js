import Home from '~/pages/Home'
import ListPost from '~/pages/ListPost'
import Event from '~/pages/Event'
import About from '~/pages/About'
import Academic from '~/pages/Academic'


const publicRoutes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/danh-sach-bai-viet',
        component: ListPost
    },
    {
        path: '/su-kien',
        component: Event
    },
    {
        path: '/gioi-thieu',
        component: About
    },
    {
        path: '/hoc-thuat',
        component: Academic
    }

]
const privateRoutes = [

]
export { publicRoutes, privateRoutes }