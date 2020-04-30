import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})

export class MessageService {
    private message$ = new Subject<Object>(); // 过滤条件改变
    public getMessage(): Observable<Object> {
        return this.message$;
    }

    public success(message, time = 3000) {
        this.message$.next({
            bgColor: 'rgba(109, 56, 181, .9)',
            color: '#fff',
            message,
            time
        });
    }

    public warn(message, time = 3000) {
        this.message$.next({
            bgColor: 'rgba(255, 213, 63, .9)',
            color: '#000',
            message,
            time
        });
    }

    public error(message, time = 3000) {
        this.message$.next({
            bgColor: 'rgba(255, 44, 22, .9)',
            color: '#fff',
            message,
            time
        });
    }
}
