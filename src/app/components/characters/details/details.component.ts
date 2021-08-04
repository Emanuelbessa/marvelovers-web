/* eslint-disable prefer-destructuring */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../characters.service';
import { CharacterDto } from '../dto/character.dto';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  character: CharacterDto;

  isLoaded: boolean = false
  ;

  constructor(
    private characterService: CharactersService,
    private route: ActivatedRoute,
  ) { }

  marvelId: number = parseInt(this.route.snapshot.paramMap.get('id'), 10);

  ngOnInit(): void {
    this.characterService.getCharacterById(this.marvelId).subscribe(
      (character) => {
        this.character = character[0];
        this.isLoaded = true;
      },
    );
  }
}
