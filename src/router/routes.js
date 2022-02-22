import RecommendationsComponent from "@/components/RecommendationComponent";
import NavPanel from "@/components/NavPanel";
import SearchMainPage from "@/components/SearchMainPage";
import ARImage from "@/components/ARImage";

const routes = [
    { path: '', redirect: { name: 'main' }},
    {
        path: '/',
        components: {
            default: SearchMainPage,
            navPanel: NavPanel
        },
        name: 'main',
        meta: {
            backgroundColor: 'transparent',
            logoIcon: false,
            searchElem: false
        }
    },
    {
        path: '/recommendations/:trackId',
        components: {
            default: RecommendationsComponent,
            navPanel: NavPanel
        },
        name: 'recommendations',
        meta: {
            backgroundColor: 'black',
            logoIcon: true,
            searchElem: true
        }
    },
    {
        path: '/camera',
        components: {
            default: ARImage
        },
        name: 'image',
    }

]

export default routes
