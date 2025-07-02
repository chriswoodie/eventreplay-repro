import { Component, OnInit } from '@angular/core';

import { SDKApplicationManager } from 'sdk';

@Component({
  standalone: true,
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrl: './foo.component.scss',
})
export class FooComponent implements OnInit {

  ngOnInit() {}
}