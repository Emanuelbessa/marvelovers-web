/* eslint-disable no-param-reassign */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ComicsService } from '../comics.service';
import { ComicDto, ComicFavs } from '../dto/comic.dto';
import { Params } from '../dto/params.dto';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss'],
})
export class ComicsComponent implements OnInit {
  comics: ComicDto[];

  comicsFavs: ComicFavs[];

  p: number = 1;

  total: number;

  isLoaded: boolean = false;

  constructor(
    private comicService: ComicsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.comicService
      .readAllComicsFavs()
      .subscribe(
        (favs) => {
          this.comicsFavs = favs;
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
      orderBy: 'title',
    };

    if (name) {
      params.titleStartsWith = name;
    }
    this.comicService
      .readAllComics(params)
      .subscribe(
        (comics) => {
          this.comics = comics.results;
          this.total = comics.total;
          this.p = page;
          this.comics.forEach((comic) => {
            const isFavorited = this.comicsFavs
              .find((favorite) => favorite.cod_marvelid_com === comic.id);
            if (isFavorited) {
              comic.favorited = true;
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

  searchComics(nameComic: string): void {
    this.getPage(1, nameComic);
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
