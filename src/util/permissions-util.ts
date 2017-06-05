import { Diagnostic } from '@ionic-native/diagnostic';



export class PermissionsUtil {

    public static LOCATION_DISABLED = 0;
    public static LOCATION_UNAUTHORIZED = 1;

    static diagnostic = new Diagnostic();


    static checkLocationPermission(): Promise<number> {

        return new Promise((resolve, reject) => {

            PermissionsUtil.diagnostic.isLocationEnabled().then((data) => {
                console.log('isLocationAvailable ' + data);

                if (!data) {

                    return resolve(this.LOCATION_DISABLED);

                } else {



                    PermissionsUtil.diagnostic.isLocationAuthorized().then((data) => {

                        if (!data) {
                            PermissionsUtil.diagnostic.requestLocationAuthorization().then((data: string) => {
                                console.log('requestLocationAuthorization: ' + data);


                                if (data.localeCompare(PermissionsUtil.diagnostic.permissionStatus.GRANTED) === 0 ||
                                    data.localeCompare('authorized_when_in_use') === 0)
                                    return resolve(-1);


                                else
                                    return resolve(this.LOCATION_UNAUTHORIZED);

                            });
                        }

                        else
                            resolve(-1);

                    });

                }
            });

        });


    }

    static redirectUser(permissionType: number) {
        switch (permissionType) {

            case this.LOCATION_DISABLED:
                PermissionsUtil.diagnostic.switchToLocationSettings();
                break;

            case this.LOCATION_UNAUTHORIZED:
                PermissionsUtil.diagnostic.switchToSettings();
                break;

            default:
                ;

        }

    }


}
