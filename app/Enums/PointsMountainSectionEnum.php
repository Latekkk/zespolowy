<?php

namespace App\Enums;

use App\Traits\EnumToArray;

enum PointsMountainSectionEnum: string
{
    use EnumToArray;
    case  ENTRY = 'ENTRY';
    case  DESCENT = 'DESCENT';

}
