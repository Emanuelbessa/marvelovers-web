/* eslint-disable no-param-reassign */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ComicsService } from '../comics.service';
import { ComicFavs } from '../dto/comic.dto';

@Component({
  selector: 'app-favorited',
  templateUrl: './favorited.component.html',
  styleUrls: ['./favorited.component.scss'],
})
export class FavoritedComponent implements OnInit {
  comicsFavs: ComicFavs[];

  favoritesFiltered: ComicFavs[];

  p: number = 1;

  total: number;

  constructor(
    private comicService: ComicsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.comicService
      .readAllComicsFavs()
      .subscribe(
        (favs) => {
          this.comicsFavs = favs.map((comic) => ({ ...comic, favorited: true }));
          this.favoritesFiltered = this.comicsFavs;
        },
        () => {
        },
      );
  }

  getPage(page: number, title?: string) {
    Swal.showLoading();
    this.favoritesFiltered = this.comicsFavs
      .filter((comic) => comic.des_name_com
        .toLowerCase()
        .startsWith(title));
    this.total = this.favoritesFiltered.length;
    this.p = page;
    Swal.close();
  }

  searchComics(titleComic: string): void {
    this.getPage(1, titleComic);
  }

  favorite(comic: ComicFavs) {
    const comicFav: ComicFavs = {
      cod_marvelid_com: comic.cod_marvelid_com,
      des_description_com: comic.des_description_com,
      des_name_com: comic.des_name_com,
      des_thumbnail_com: comic.des_thumbnail_com,
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
