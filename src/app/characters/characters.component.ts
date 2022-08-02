import { Component, OnInit } from '@angular/core';
import { MarvelAPIService } from '../Service/mapi.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  constructor(private service:MarvelAPIService) { }

  config: any;
  allCharacters:any=[];
  comics:any=[];
  showComics: boolean = false;
  characterName:string = '';
  showSearchResult:boolean = false;
  searchedCharacter:any=[];
  page:number = 0;
  orderBy:string = '';


  selectedValue: any;
  searchTxt: any;

  items = [{
    value : "name",
    viewValue : "Order by Name"
  },{
    value : "modified",
    viewValue : "Order by Date"
  }];



  ngOnInit(): void {

    
    this.getItems()

  }

  orderByE(event?:any){
   this.page = 0
   this.orderBy = event.value;
   console.log(this.orderBy);   
   this.service.allCharactersOrder(this.page,this.orderBy).subscribe((result)=>{
    if(result.data.count>0)
    {
      this.allCharacters = result.data.results; 
    }
  })
  }
  
  
  findCharacter(event:any)
{
   this.page = 0
   this.characterName = event;
   console.log(this.characterName);
   this.service.getCharacterByName(this.page,this.characterName).subscribe((result)=>{
     console.log(result);
     if(result.data.count>0)
     {
       this.allCharacters = result.data.results;
     }
     else{
       this.ngOnInit();
     }
   })
}

fetchComicsByCharacter(characterId:string)
  {
    console.log(characterId);
    this.service.getComicsByCharacter(characterId).subscribe((result)=>{

      if(result.data.count>0)
      {
        this.comics = result.data.results;
        this.showComics = true;
      }
    })
  }

  getItems(){
    this.service.allCharacters(this.page).subscribe((result)=>{
      console.log(result);
      this.allCharacters = result.data.results;      
    })
  }

  nextPage(){
    this.page = this.page + 1;
    if (this.orderBy === '' && this.characterName === ''){
      this.getItems();
    }else{
      if (this.characterName === ''){
        this.service.allCharactersOrder(this.page,this.orderBy).subscribe((result)=>{
          if(result.data.count>0)
          {
            this.allCharacters = result.data.results; 
          }
        })
      }else{
        this.service.getCharacterByNameOrd(this.page, this.characterName, "name").subscribe((result)=>{
          if(result.data.count>0)
          {
            this.allCharacters = result.data.results; 
          }
        })
      }
      
    }
    
  }

  prevPage(){
    this.page = this.page - 1;
    if (this.orderBy === '' && this.characterName === ''){
      this.getItems();
    }else{
      if (this.characterName === ''){
        this.service.allCharactersOrder(this.page,this.orderBy).subscribe((result)=>{
          if(result.data.count>0)
          {
            this.allCharacters = result.data.results; 
          }
        })
      }else{
        this.service.getCharacterByNameOrd(this.page, this.characterName, "name").subscribe((result)=>{
          if(result.data.count>0)
          {
            this.allCharacters = result.data.results; 
          }
        })
      }
      
    }
  }
}
