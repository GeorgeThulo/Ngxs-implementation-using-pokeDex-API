// pokemon.state.ts
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { PokemonService } from "../services/pokemon.services";
import { tap } from "rxjs/operators";
import * as PokemonActions from "../actions/pokemon.actions";
import { PokemonResponse } from "../types/pokemon.types";

interface PokemonStateModel {
  loading: boolean;
  error: any; // Adjust this type as per your error handling preference
  pokemon: PokemonResponse[] | null;
}

const defaults: PokemonStateModel = {
  loading: false,
  error: null,
  pokemon: null,
};

@State<PokemonStateModel>({
  name: 'pokemon',
  defaults: defaults
})
@Injectable()
export class PokemonState {
  constructor(private pokemonService: PokemonService) {}

  @Selector()
  static isLoading(state: PokemonStateModel) {
    return state.loading;
  }

  @Selector()
  static getPokemon(state: PokemonStateModel) {
    return state.pokemon;
  }

  @Action(PokemonActions.FetchPokemons)
  fetchPokemons(ctx: StateContext<PokemonStateModel>) {
    ctx.patchState({ loading: true });

    return this.pokemonService.fetchPokemons()
      .pipe(
        tap(
          (res: string[]) => ctx.dispatch(new PokemonActions.FetchPokemonsSuccess(res)),
          (error: any) => ctx.dispatch(new PokemonActions.FetchPokemonsFail(error))
        )
      );
  }

  @Action(PokemonActions.FetchPokemonsSuccess)
  fetchPokemonsSuccess(ctx: StateContext<PokemonStateModel>, action: PokemonActions.FetchPokemonsSuccess) {
    ctx.patchState({
      loading: false,
      error: null,
      pokemon: action.response.map(name => ({ name, url: '' })) // Assuming `action.response` is an array of names
    });
  }

  @Action(PokemonActions.FetchPokemonsFail)
  fetchPokemonsFail(ctx: StateContext<PokemonStateModel>, action: PokemonActions.FetchPokemonsFail) {
    ctx.patchState({
      loading: false,
      pokemon: null,
      error: action.error
    });
  }

  @Action(PokemonActions.ClearPokemons)
  clearPokemons(ctx: StateContext<PokemonStateModel>) {
    ctx.setState(defaults);
  }
}
