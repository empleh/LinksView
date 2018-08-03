import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Links } from '../models/links';
import { LinksWrapper } from '../models/links-wrapper';
import 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  links: Array<Links>;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<LinksWrapper>('./assets/links.json').subscribe(links => {
      this.title = links.title;
      this.links = links.links;

      this.http.get<LinksWrapper>('./assets/local-links.json').pipe(first()).subscribe(localLinks => {
        this.links = this.links.concat(localLinks.links);
      });
    });

  }
}
