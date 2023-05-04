<?php

namespace App\Services;

use App\Exceptions\PhotoExceptions\PhotoRemoveException;
use App\Exceptions\PhotoExceptions\PhotoSaveException;
use App\Exceptions\PhotoExceptions\PhotoUpdateException;
use App\Exceptions\PhotoExceptions\PhotoValidationException;
use App\Models\Photo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use PhpParser\Node\Expr\AssignOp\Mod;

class PhotoService
{
    /**
     * @throws PhotoSaveException
     */
    public function savePhoto(UploadedFile $file, Model $model): Photo
    {
        DB::beginTransaction();

        try {
            $this->validateImage($file);

            $photo = new Photo();
            $filename = $this->generateFileName($file);
            $photo->file_name = $filename;
            $photo->imageable_type = get_class($model);
            $photo->imageable_id = $model->id;
            $photo->save();

            $model->photos()->save($photo);
            Storage::putFileAs('photos', $file, $filename);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();

            if (isset($photo)) {
                Storage::delete($photo->file_name);
            }

            throw new PhotoSaveException($e->getMessage());
        }

        return $photo;
    }

    /**
     * @throws PhotoRemoveException
     */
    public function deletePhoto(Photo $photo): void
    {
        DB::beginTransaction();

        try {
            $photo->deleteImage();
            $photo->delete();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();

            throw new PhotoRemoveException( $e->getMessage());
        }
    }

    /**
     * @throws PhotoUpdateException
     */
    public function updatePhoto(UploadedFile $file, Photo $photo, Model $model): Photo
    {
        DB::beginTransaction();

        try {
            $photo->deleteImage();
            $this->savePhoto($file, $model);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();

            Storage::delete($photo->file_name);

            throw new PhotoUpdateException('Error updating photo: ' . $e->getMessage());
        }

        return $photo;
    }

    private function generateFileName(UploadedFile $file): string
    {
        $extension = $file->getClientOriginalExtension();
        $filename = Str::uuid() . '.' . $extension;
        $timestamp = date('Y-m-d-H-i-s');
        return "{$timestamp}-{$filename}";
    }

    /**
     * @throws PhotoValidationException
     */
    private function validateImage($file): void
    {
        $validator = Validator::make(['file' => $file], [
            'file' => 'required|file|mimes:jpg,png|max:4096',
        ]);

        if ($validator->fails()) {
            throw new PhotoValidationException($validator->errors()->first());
        }

    }
}
