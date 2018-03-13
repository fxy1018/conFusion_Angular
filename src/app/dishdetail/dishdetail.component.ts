import { Component, OnInit, Input} from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  comment: Comment;

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Author Name is required',
      'minlength': 'Author Name must be at least 2 characters long',
      'maxlength': 'First Name cannot be more than 25 characters long'
    },
    'comment': {
      'required': 'Comment is required',
      'minlength': 'Last Name must be at least 2 characters long',
      'maxlength': 'Last Name cannot be more than 25 characters long'
    }
  };

  constructor(private dishService: DishService,
              private location: Location,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
                this.createForm();
              }

  ngOnInit() {
    this.dishService.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);

    this.route.params
    .switchMap((params: Params)=> this.dishService.getDish(+params['id']))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id)});
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];


  }
  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author:['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment:['', Validators.required],
      rating: 5
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return;}
    const form =this.commentForm;
    for (const field in this.formErrors){
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid){
        const messages = this.validationMessages[field];
        for (const key in control.errors){
          this.formErrors[field] += messages[key] + ' ';
        }

      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    const date = new Date();
    this.comment.date = date.toISOString();
    this.dish.comments.push(this.comment);


    console.log(this.comment);
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: 5
    })
  }






}
