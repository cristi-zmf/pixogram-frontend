import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CurrentUserService} from "../login/current-user.service";
import {SkillService} from "../skill/skill.service";
import {Skill} from "../skill/skill";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingSearchResult} from "../training/training-search-result";
import {DialogComponent} from "../shared/dialog/dialog.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username: string;
  skills: Array<Skill>;
  dataSource: MatTableDataSource<Skill>;
  displayedColumns: string[] = ['skillName'];
  private newSkillName: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private currentUserService: CurrentUserService, private skillsService: SkillService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.username = this.currentUserService.getCurrentUser().username;
    this.getSkillsData();
  }


  private getSkillsData() {
    this.skillsService.getSkills().subscribe(data => {
      this.skills = data;
      this.dataSource = new MatTableDataSource(this.skills);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {name: '', placeholder: 'Skill name'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.newSkillName = result;
        this.addSkill(this.newSkillName);
      }
    });
  }

  private addSkill(newSkillName: string) {
    let skillCreateCommand: { skillName: string } = {skillName: ''};
    skillCreateCommand.skillName = newSkillName;
    this.skillsService.addSkill(skillCreateCommand).subscribe(
      () => this.getSkillsData()
    );
  }
}


