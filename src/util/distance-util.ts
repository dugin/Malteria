export class DistanceUtil {

    // This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    static calcCrow(lat1, lon1, lat2, lon2) {

        const R = 6371; // km
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        lat1 = this.toRad(lat1);
        lat2 = this.toRad(lat2);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    private static toRad(value) {
        return value * Math.PI / 180;
    }
}
