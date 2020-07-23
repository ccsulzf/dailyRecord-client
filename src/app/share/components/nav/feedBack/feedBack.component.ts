import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
    selector: 'app-feedBack',
    templateUrl: './feedBack.component.html',
    styleUrls: ['./feedBack.component.scss']
})

export class FeedBackComponent implements OnInit {
    public user = JSON.parse(localStorage.getItem('userInfo'));
    feedBackTypeList = [{
        id: 1,
        value: 'BUG或系统错误'
    }, {
        id: 2,
        value: '系统建议'
    }];
    feedBackForm = new FormGroup({
        feedBackTypeControl: new FormControl('', [Validators.required]),
        memoInputControl: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    });
    constructor(
        public dialogRef: MatDialogRef<FeedBackComponent>
    ) { }

    ngOnInit() {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        console.log(this.feedBackForm.value);
    }
}
