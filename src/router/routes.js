import RecommendationsComponent from "@/components/RecommendationsComponent";
import SearchRecommendationsComponent from "@/components/SearchRecommendationsComponent";

const routes = [
    { path: '', component: SearchRecommendationsComponent},
    { path: '/recommendations/:trackId', component: RecommendationsComponent, props: true, name: 'recommendations'},
]

export default routes