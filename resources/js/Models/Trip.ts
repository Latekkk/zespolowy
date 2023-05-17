import {MountainSection} from "@/Models/MountainSection";

export interface Trip {
    id: string;
    name: string;
    mountainSection :MountainSection[];
}
