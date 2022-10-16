// take a feature id and move it from one source to another
export default function (id, originFeatures, destinationFeatures) {
    let feature = {}, newOriginFeatures = [], newDestinationFeatures = [];

    feature = originFeatures.find( feature => feature.id === id)
    newOriginFeatures = originFeatures.filter((feature) => feature.id != id);
    newDestinationFeatures = [...destinationFeatures, feature];

    return {
        newOriginFeatures,
        newDestinationFeatures,
    }
}