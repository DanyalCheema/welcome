import { Injectable } from '@angular/core';
import { Job } from '../_models/job.model';
// import { JobDataStorageService } from './job-data-storage.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { JOB_URL } from '../_helpers/configurationApi';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const BASE_URL = JOB_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  getAllJobs() { return this.http.get<Job[]>(BASE_URL); }

}