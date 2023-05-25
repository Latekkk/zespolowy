<?php

namespace App\Enums;

use App\Traits\EnumToArray;

enum StatusEnum: string
{
    use EnumToArray;
    case  APPROVED = 'APPROVED';
    case  REJECTED = 'REJECTED';
    case  PENDING = 'PENDING';

}
