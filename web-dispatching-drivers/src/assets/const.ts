import { LatLngLiteral } from '@agm/core';

export class Constants {
  public static get DEFAULT_ADDRESS(): LatLngLiteral
                    { return { lat: 50.421097, lng: 14.915461 }; }
  public static get DEFAULT_AIRPORT_ADDRESS(): LatLngLiteral
                    { return { lat: 50.109670, lng: 14.275326 }; }
}
