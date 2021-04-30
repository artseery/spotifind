import RecommendationsComponent from "@/components/RecommendationComponent";
import NavPanel from "@/components/NavPanel";
import SearchMainPage from "@/components/SearchMainPage";

const routes = [
    { path: '', redirect: { name: 'main' }},
    {
        path: '/',
        components: {
            default: SearchMainPage,
        },
        name: 'main'
    },
    {
        path: '/recommendations',
        components: {
            default: RecommendationsComponent,
            navPanel: NavPanel
        },
        name: 'recommendations'
    }
]

export default routes