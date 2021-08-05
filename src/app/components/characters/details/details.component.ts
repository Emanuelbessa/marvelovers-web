/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CharactersService } from '../characters.service';
import { CharacterDto, CharacterFavs } from '../dto/character.dto';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  character: CharacterDto;

  characterFavs: CharacterFavs[];

  isLoaded: boolean = false;

  constructor(
    private characterService: CharactersService,
    private route: ActivatedRoute,
  ) { }

  marvelId: number = parseInt(this.route.snapshot.paramMap.get('id'), 10);

  ngOnInit(): void {
    this.characterService
      .readAllCharactersFavs()
      .subscribe(
        (favs) => {
          this.characterFavs = favs;
        },
        (err) => {
          console.log(err);
        },
      );
    this.characterService.getCharacterById(this.marvelId).subscribe(
      (character) => {
        this.character = character[0];
        const isFavorited = this.characterFavs
          .find((favorite) => favorite.cod_marvelid_cha === this.character.id);
        if (isFavorited) {
          this.character.favorited = true;
        }
        this.isLoaded = true;
      },
    );
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
