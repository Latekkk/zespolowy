import {Point} from "@/Models/Point";

export interface MountainSection {
    name: string;
    entry_points: string;
    points_for_descent: string;
    start_point: Point;
    end_point: Point;
}

