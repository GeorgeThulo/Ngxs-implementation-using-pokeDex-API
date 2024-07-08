export class FetchPokemons {
  static readonly type = '[Pokemon] Fetch';
}

export class FetchPokemonsSuccess {
  static readonly type = '[Pokemon] Fetch Success';
  constructor(public response: string[]) {}
}

export class FetchPokemonsFail {
  static readonly type = '[Pokemon] Fetch Fail';
  constructor(public error: unknown) {}
}

export class ClearPokemons {
  static readonly type = '[Pokemon] Clear';
}
