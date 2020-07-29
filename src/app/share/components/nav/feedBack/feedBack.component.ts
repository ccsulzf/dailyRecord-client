import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageService,BaseDataService } from '../../../../services';
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
        type: new FormControl('', [Validators.required]),
        memo: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    });
    constructor(
        public dialogRef: MatDialogRef<FeedBackComponent>,
        public messageService: MessageService,
        public baseDataService:BaseDataService
    ) { }

    ngOnInit() {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        this.baseDataService.addFeedBack(this.feedBackForm.value).then((data)=>{
            this.messageService.success('反馈成功！');
            this.dialogRef.close();
        })
    }
}
