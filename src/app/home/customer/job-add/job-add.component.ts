import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/_services/job.service';
import { Job } from 'src/app/_models/job.model';
import { Observable } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.scss']
})
export class JobAddComponent implements OnInit {

  public allJobs: Job[] = [];

  constructor(
    private jobService: JobService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe(data => {
      console.log(data);
      this.allJobs = data;
    });
  }
  opendialog(job){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.disableClose= false;
    dialogConfig.data = job;

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
  }
}
