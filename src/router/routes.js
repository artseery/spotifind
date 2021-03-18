import RecommendationsComponent from "@/components/RecommendationComponent";

const routes = [
    { path: '', redirect: { name: 'recommendations' }},
    {
        path: '/recommendations',
        component: RecommendationsComponent,
        name: 'recommendations'
    }
]

export default routes