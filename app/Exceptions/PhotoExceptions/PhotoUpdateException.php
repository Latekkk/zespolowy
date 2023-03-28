<?php

namespace App\Exceptions\PhotoExceptions;

use Exception;

class PhotoUpdateException extends Exception
{
    public function __construct(string $message)
    {
        parent::__construct('Error update photo: '. $message);
    }
}
