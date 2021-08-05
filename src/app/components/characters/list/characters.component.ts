/* eslint-disable no-param-reassign */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CharactersService } from '../characters.service';
import { CharacterDto, CharacterFavs } from '../dto/character.dto';
import { Params } from '../dto/params.dto';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  characters: CharacterDto[];

  charactersFavs: CharacterFavs[];

  p: number = 1;

  total: number;

  isLoaded: boolean = false;

  constructor(
    private characterService: CharactersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.characterService
      .readAllCharactersFavs()
      .subscribe(
        (favs) => {
          this.charactersFavs = favs;
        },
        () => {
        },
      );
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
          this.characters.forEach((charac) => {
            const isFavorited = this.charactersFavs
              .find((favorite) => favorite.cod_marvelid_cha === charac.id);
            if (isFavorited) {
              charac.favorited = true;
            }
          });
          this.isLoaded = true;
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

  favorite(character: CharacterDto) {
    const characterFav: CharacterFavs = {
      cod_marvelid_cha: character.id,
      des_description_cha: character.description,
      des_name_cha: character.name,
      des_thumbnail_cha: `${character.thumbnail.path}.${character.thumbnail.extension}`,
    };

    this.characterService
      .favorite(characterFav)
      .subscribe(
        () => {
          character.favorited = !character.favorited;
          Swal.fire({
            icon: 'success',
            title: `Personagem ${character.favorited ? '' : 'des'}favoritado!`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
        },
        (err) => {
          console.log(err);
        },
      );
  }
}
