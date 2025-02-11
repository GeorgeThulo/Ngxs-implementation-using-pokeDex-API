import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  fetchPokemons() {
    return this.http.get<string[]>('https://pokeapi.co/api/v2/pokemon?offset=10&limit=10');
  }
}
