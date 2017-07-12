/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppointmentServiceService } from './appointment.service';

describe('AppointmentServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppointmentServiceService]
    });
  });

  it('should ...', inject([AppointmentServiceService], (service: AppointmentServiceService) => {
    expect(service).toBeTruthy();
  }));
});
