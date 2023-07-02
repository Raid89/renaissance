import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss']
})
export class SeekerComponent {
  @Input() title!: string;
  @Input() controlName!: string;

}
