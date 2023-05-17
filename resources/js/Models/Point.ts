import {MountainMainPart} from "@/Models/MountainMainPart";

export interface Point {
    name: string;
    mountainPart: string;
    mountainMainPart: MountainMainPart[];
    lat: string;
    lng: string;
}
