// take a feature id and move it from one source to another
export default function (id, origin, destination) {
    let feature = {}, newOriginFeatures = [], newDestinationFeatures = [];

    feature = origin.features.find( feature => feature.id === id)
    newOriginFeatures = origin.features.filter((feature) => feature.id != id);
    newDestinationFeatures = [...destination.features, feature];

    const newOrigin = { ...origin, features: newOriginFeatures};
    const newDestination = { ...destination, features: newDestinationFeatures};

    return {
        newOrigin,
        newDestination,
    }
}