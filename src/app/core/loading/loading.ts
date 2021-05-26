import { BehaviorSubject } from "rxjs";

export class Loading {
    static state: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}