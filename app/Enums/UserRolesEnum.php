<?php

namespace App\Enums;

enum UserRolesEnum: string
{
    case  ADMIN = 'admin';
    case  USER = 'user';
    case PATHUSER = 'pathuser';
    case SQUADUSER = 'squaduser';

    public static function toArray(): array
    {
        return array_map(static fn($case) => $case->value, self::cases());

        //TODO: można kiedyś zrobić globalnie
    }
}
