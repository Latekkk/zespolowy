<?php

namespace App\Exceptions\PhotoExceptions;

use Exception;

class PhotoRemoveException extends Exception
{
    public function __construct(string $message)
    {
        parent::__construct('Error when remove a photo: '. $message);
    }
}
