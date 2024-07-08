// app.component.ts
import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PokemonResponse } from './store/types/pokemon.types';
import { PokemonActions } from './store/actions/pokemon.index';
import { PokemonState } from './store/states/pokemon.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Select(PokemonState.getPokemon) pokemon$!: Observable<PokemonResponse[]>;
  @Select(PokemonState.isLoading) isLoading$!: Observable<boolean>;

  constructor(private store: Store) {}

  onSelectPokemon() {
    this.store.dispatch(new PokemonActions.FetchPokemons());
  }

  onClear() {
    this.store.dispatch(new PokemonActions.ClearPokemons());
  }
}
