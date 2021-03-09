import RecommendationsComponent from "@/components/RecommendationComponent";

const routes = [
    { path: '', component: RecommendationsComponent},
    { path: '/recommendations/:trackId', component: RecommendationsComponent, props: true, name: 'recommendations'},
]

export default routes