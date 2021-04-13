function recommendationsKeeper(store) {
    window.localStorage.setItem('recommendations_data', JSON.stringify({
        'filters': store.state.filters,
        'recommendations': store.state.recommendations,
        'active_track': store.state.activeTrack,
        'genres': store.state.selected_genres,
    }))
}
function lastDirectiveKeeper(directive) {
    window.localStorage.setItem('lastDirective', directive)
    console.log(`lastDirective set to ${directive}`)
}

export { recommendationsKeeper, lastDirectiveKeeper }