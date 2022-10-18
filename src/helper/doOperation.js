import * as turf from "@turf/turf";

export default function (operation, ...features) {
    switch (operation) {
        case 'union': 
        return turf.union(features[0], features[1]);
    
        case 'intersect':
            return turf.intersect(features[0], features[1]);

        default:
            break;
    }
}