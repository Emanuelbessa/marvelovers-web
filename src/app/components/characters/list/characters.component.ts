import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CharactersService } from '../characters.service';
import { CharacterDto } from '../dto/character.dto';
import { Params } from '../dto/params.dto';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  characters: CharacterDto[];

  p: number = 1;

  total: number;

  constructor(
    private characterService: CharactersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPage(1);
  }

  getPage(page: number, name?: string) {
    Swal.showLoading();
    const params: Params = {
      limit: 9,
      offset: (page - 1) * 9,
      orderBy: 'name',
    };

    if (name) {
      params.nameStartsWith = name;
    }
    this.characterService
      .readAllCharacters(params)
      .subscribe(
        (characters) => {
          this.characters = characters.results;
          this.total = characters.total;
          this.p = page;
          Swal.close();
        },
        (err) => {
          console.log(err);
        },
      );
  }

  searchCharacters(nameCharacter: string): void {
    this.getPage(1, nameCharacter);
  }
}
