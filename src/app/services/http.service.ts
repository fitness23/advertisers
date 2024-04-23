import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, map, Observable, catchError, throwError } from 'rxjs';

import { CombinedAdvertisersDetails } from '../interfaces/combined-advertisers-details-interface';

import { AdvertisersPayload } from '../interfaces/advertisers-payload-interface';
import { Advertisers } from '../interfaces/advertisers-interface';

import { AdvertisersAddressPayload } from '../interfaces/advertisers-address-payload-interface';
import { AdvertisersAddress } from '../interfaces/advertisers-address-interface';

import { FormData } from '../interfaces/form-data-interface';


@Injectable()
export class HttpService {

    constructor(private http: HttpClient) {
    }

    getCombinedData(): Observable<CombinedAdvertisersDetails[]> {
      return forkJoin({
        advertisers: this.getAdvertisersList(),
        addresses: this.getAdvertisersAddressesList()
      }).pipe(
        map(({ advertisers, addresses }) => {
    
          // Turn the address array into an object so I can map it easier when mapping to advertisers later START
          const addressMap = addresses.reduce((map, addressDetails) => {
            map[addressDetails.lookupId] = addressDetails;
            return map;
          }, {} as { [key: string]: AdvertisersAddress });
          // Turn the address array into an object so I can map it easier when mapping to advertisers later END
    
          return advertisers.map((advertiser) => ({
            id: advertiser.id,
            name: advertiser.name,
            url: advertiser.url,
            telephone: advertiser.telephone,
            address: addressMap[advertiser.addressLookupId]?.address || '',
            city: addressMap[advertiser.addressLookupId]?.city || '',
            postcode: addressMap[advertiser.addressLookupId]?.postcode || ''
          }));
    
        }),
        catchError((err) => {
          return this.errorHandler(err);
        })
      );
    }

      getAdvertisersList(): Observable<Advertisers[]> {
        return this.http
          .get<AdvertisersPayload>(`https://1ea1bea0-214d-4c02-8e97-d5e259ec08b2.mock.pstmn.io/advertisers`, { responseType: 'json' })
          .pipe(
            map((clients) =>
              clients['hydra:member'].map((client) => (
                {
                  id: client.id,
                  name: client.name,
                  url: client.orgurl,
                  telephone: client.telephone,
                  addressLookupId: client.address
                }))
            ),
            catchError((err) => {
              return this.errorHandler(err);
            })
          );
      }

      getAdvertisersAddressesList(): Observable<AdvertisersAddress[]> {
        return this.http
          .get<AdvertisersAddressPayload>(`https://1ea1bea0-214d-4c02-8e97-d5e259ec08b2.mock.pstmn.io/addresses`, { responseType: 'json' })
          .pipe(
            map((clients) =>
              clients['hydra:member'].map((client) => (
                {
                  id: client.id,
                  lookupId: client["@id"], // I need to use the @id because all the usual "ids" at present have the same value of 1
                  address: client.address,
                  city: client.city,
                  postcode: client.postcode
                }))
            ),
            catchError((err) => {
              return this.errorHandler(err);
            })
          );
      }

      submitFormAdvertisers(payload: FormData): Observable<number> {
        return this.http
          .post<number>(`https://1ea1bea0-214d-4c02-8e97-d5e259ec08b2.mock.pstmn.io/advertisers`, payload, { responseType: 'json' })
          .pipe(
            map(() => 6), // This returns the next id of the newly added advertiser
            catchError((err) => {
              return this.errorHandler(err);
            })
          );
      }

      submitFormAddresses(payload: FormData): Observable<string> {
        return this.http
          .post<string>(`https://1ea1bea0-214d-4c02-8e97-d5e259ec08b2.mock.pstmn.io/addresses`, payload, { responseType: 'json' })
          .pipe(
            map(() => "Success"),
            catchError((err) => {
              return this.errorHandler(err);
            })
          );
      }

    
      errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || 'server error.');
      }

}