import RecommendationsComponent from "@/components/RecommendationComponent";

const routes = [
    { path: '', redirect: { name: 'recommendations' }},
    {
        path: '/',
        component: RecommendationsComponent,
        name: 'recommendations'
    }
]

export default routes