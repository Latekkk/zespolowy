<?php

namespace App\Exceptions\PointExceptions;

use Exception;

class PointExceptionsSaveWithMountainMainParts extends Exception
{
    public function __construct(string $message)
    {
        parent::__construct('error when saving point with mountain main part: '. $message);
    }
}
