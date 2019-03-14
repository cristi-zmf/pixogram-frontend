import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Skill} from "./skill";
import {SkillService} from "./skill.service";
import {MatSelectChange} from "@angular/material";

@Component({
  selector: 'app-skill-picker',
  templateUrl: './skill-picker.component.html',
  styleUrls: ['./skill-picker.component.css']
})
export class SkillPickerComponent implements OnInit {
  @Output() selectedSkillEmitter = new EventEmitter<Skill>();

  private skills: Array<Skill>;
  private selectedSkill: Skill;
  constructor(private skillService: SkillService) { }

  ngOnInit() {
    this.skillService.getSkills().subscribe(
      skills => this.skills = skills
    );
  }

  broadcastChange(selectedSkill: MatSelectChange) {
    this.selectedSkillEmitter.emit(selectedSkill.value);
  }

  unselect() {
    this.selectedSkill = null;
    this.selectedSkillEmitter.emit(this.selectedSkill);
  }
}
