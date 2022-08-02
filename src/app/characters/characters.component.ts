import { Component, OnInit, ViewChild } from '@angular/core';
import { MarvelAPIService } from '../Service/mapi.service';
import { MyBootstrapModalComponent } from '../modals/modal-comic/modal-comic.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  constructor(private service:MarvelAPIService, private modalService: NgbModal) { }

  
  title = 'angular-bootstrap-modal';
  config: any;
  allCharacters:any=[];
  comics:any=[];
  showComics: boolean = false;
  characterName:string = '';
  showSearchResult:boolean = false;
  searchedCharacter:any=[];
  page:number = 0;
  orderBy:string = '';
  favComics:any=[];

  @ViewChild('content') content: any;


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

comicsByCharacter(characterId:string)
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

  openModal(comic:any) {
    const modalRef = this.modalService.open(MyBootstrapModalComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
      });

    let data = comic;

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

  saveFav(comic:any){
    this.favComics.push(comic)
  }

  deleteFav(comic:any){
    this.favComics.forEach((element:any,index:any)=>{
      if(element===comic) this.favComics.splice(index,1);
   });
  }

}
