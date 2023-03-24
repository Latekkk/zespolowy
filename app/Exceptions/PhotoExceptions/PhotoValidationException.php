<?php

namespace App\Exceptions\PhotoExceptions;

use Exception;

class PhotoValidationException extends Exception
{
    public function __construct(string $message)
    {
        parent::__construct('Validation photo: '. $message);
    }
}
