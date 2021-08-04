/* eslint-disable no-param-reassign */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CharactersService } from '../characters.service';
import { CharacterFavs } from '../dto/character.dto';

@Component({
  selector: 'app-favorited',
  templateUrl: './favorited.component.html',
  styleUrls: ['./favorited.component.scss'],
})
export class FavoritedComponent implements OnInit {
  charactersFavs: CharacterFavs[];

  favoritesFiltered: CharacterFavs[];

  p: number = 1;

  total: number;

  constructor(
    private characterService: CharactersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.characterService
      .readAllCharactersFavs()
      .subscribe(
        (favs) => {
          this.charactersFavs = favs.map((char) => ({ ...char, favorited: true }));
          this.favoritesFiltered = this.charactersFavs;
        },
        () => {
        },
      );
  }

  getPage(page: number, name?: string) {
    Swal.showLoading();
    this.favoritesFiltered = this.charactersFavs
      .filter((character) => character.des_name_cha
        .toLowerCase()
        .startsWith(name));
    this.total = this.favoritesFiltered.length;
    this.p = page;
    Swal.close();
  }

  searchCharacters(nameCharacter: string): void {
    this.getPage(1, nameCharacter);
  }

  favorite(character: CharacterFavs) {
    const characterFav: CharacterFavs = {
      cod_marvelid_cha: character.cod_marvelid_cha,
      des_description_cha: character.des_description_cha,
      des_name_cha: character.des_name_cha,
      des_thumbnail_cha: character.des_thumbnail_cha,
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
