import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MarvelAPIService {

  constructor(private http:HttpClient) {

   }
   num:Number = 0;
   publicKey = 'e14a916a3730d6b3657457fbff0bd6d1';
   hashKey = 'ab7ac842dd51d51b447d7d616887ebfb';
   BaseUrl = `https://gateway.marvel.com:443/v1/public/characters?limit=10&ts=1&apikey=${this.publicKey}&hash=${this.hashKey}`;

  allCharacters(pag:number):Observable<any>
  {    
    this.num = 10*pag;
    return this.http.get(this.BaseUrl+`&offset=${this.num}`);
  }
  allCharactersOrder(pag:number, ord:string):Observable<any>
  {    
    this.num = 10*pag;
    return this.http.get(this.BaseUrl+`&offset=${this.num}&orderBy=${ord}`);
  }

  allComics():Observable<any>
  {    
    const comicUrl =`https://gateway.marvel.com:443/v1/public/comics?limit=10&ts=1&apikey=${this.publicKey}&hash=${this.hashKey}`;
    ;
    return this.http.get(comicUrl);
  }

  getComicsByCharacter(characterId:string):Observable<any>
  {
    const comicByCharacterUrl = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?ts=1&apikey=${this.publicKey}&hash=${this.hashKey}`;
    return this.http.get(comicByCharacterUrl);
  }

  getCharacterByName(pag:number, characterName:string):Observable<any>
  { 
    this.num = 10*pag;
    const characterBYNameUrl = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${characterName}&limit=10&ts=1&apikey=${this.publicKey}&hash=${this.hashKey}`;
    return this.http.get(characterBYNameUrl+`&offset=${this.num}`);
  }
  
  getCharacterByNameOrd(pag:number, characterName:string, ord:string):Observable<any>
  { 
    this.num = 10*pag;
    const characterBYNameUrl = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${characterName}&limit=10&ts=1&apikey=${this.publicKey}&hash=${this.hashKey}`;
    return this.http.get(characterBYNameUrl+`&offset=${this.num}&orderBy=${ord}`);
  }  


}
