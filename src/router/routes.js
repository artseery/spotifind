import RecommendationsComponent from "@/components/RecommendationsComponent";
import SearchComponent from "@/components/SearchComponent";

const routes = [
    { path: '', component: SearchComponent},
    { path: '/recommendations/:trackId', component: RecommendationsComponent, props: true, name: 'recommendations'},
]

export default routes