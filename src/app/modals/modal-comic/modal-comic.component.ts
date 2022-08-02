import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-bootstrap-modal',
  templateUrl: './modal-comic.component.html',
  styleUrls: ['./modal-comic.component.css']
})
export class MyBootstrapModalComponent implements OnInit {

  @Input() fromParent: any;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    console.log(this.fromParent);    
  }

  closeModal(sendData:any) {
    this.activeModal.close(sendData);
  }

}
