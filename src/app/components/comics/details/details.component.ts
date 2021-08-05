/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ComicsService } from '../comics.service';
import { ComicDto, ComicFavs } from '../dto/comic.dto';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  comic: ComicDto;

  comicsFavs: ComicFavs[];

  isLoaded: boolean = false;

  constructor(
    private comicService: ComicsService,
    private route: ActivatedRoute,
  ) { }

  marvelId: number = parseInt(this.route.snapshot.paramMap.get('id'), 10);

  ngOnInit(): void {
    this.comicService
      .readAllComicsFavs()
      .subscribe(
        (favs) => {
          this.comicsFavs = favs;
        },
        (err) => {
          console.log(err);
        },
      );
    this.comicService.getComicById(this.marvelId).subscribe(
      (comic) => {
        this.comic = comic[0];
        const isFavorited = this.comicsFavs
          .find((favorite) => favorite.cod_marvelid_com === this.comic.id);
        if (isFavorited) {
          this.comic.favorited = true;
        }
        this.isLoaded = true;
      },
    );
  }

  favorite(comic: ComicDto) {
    const comicFav: ComicFavs = {
      cod_marvelid_com: comic.id,
      des_description_com: comic.description,
      des_name_com: comic.title,
      des_thumbnail_com: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
    };

    this.comicService
      .favorite(comicFav)
      .subscribe(
        () => {
          comic.favorited = !comic.favorited;
          Swal.fire({
            icon: 'success',
            title: `Comic ${comic.favorited ? '' : 'des'}favoritado!`,
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
