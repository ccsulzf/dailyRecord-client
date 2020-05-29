import { Component, HostListener, OnInit, ViewContainerRef, AfterViewInit, ViewChild, ElementRef, TemplateRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('overlayMessage', { static: false }) overlayMessage: TemplateRef<any>;
    @ViewChild('content', { static: false }) content: ElementRef<HTMLInputElement>;
    overlayRef: OverlayRef;
    messageSub: Subscription;
    constructor(
        private http: HttpClient,
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef,
        private messageService: MessageService,
        public router: Router
    ) { }
    @HostListener('body:keydown', ['$event'])
    /**
     * ArrowDown 40
     * ArrowUp 38
     * ArrowLeft 37
     * ArrowRight 39
     * Tab 9
     * shiftKey true key Tab 9
     */
    hotKeyEvent(e) {

    }

    ngOnInit() {
        console.log(this.router.url);
    }


    ngAfterViewInit() {
        const strategy = this.overlay
            .position()
            .connectedTo(this.content, { originX: 'center', originY: 'top' }, { overlayX: 'start', overlayY: 'top' });

        this.overlayRef = this.overlay.create({
            positionStrategy: strategy
        });

        this.messageSub = this.messageService.getMessage().subscribe((data: any) => {
            if (this.overlayRef && this.overlayRef.hasAttached()) {
                this.overlayRef.detach();
            }
            this.overlayRef.attach(new TemplatePortal(this.overlayMessage, this.viewContainerRef, { messageObj: data }));
            setTimeout(() => {
                if (this.overlayRef && this.overlayRef.hasAttached()) {
                    this.overlayRef.detach();
                }
            }, data.time);
        });
    }

    ngOnDestroy() {
        if (this.messageSub) {
            this.messageSub.unsubscribe();
        }
    }
}