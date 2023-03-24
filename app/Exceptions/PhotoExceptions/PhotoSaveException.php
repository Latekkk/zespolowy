<?php

namespace App\Exceptions\PhotoExceptions;

use Exception;

class PhotoSaveException extends Exception
{
    public function __construct(string $message)
    {
        parent::__construct('Error saving photo: '. $message);
    }
}
