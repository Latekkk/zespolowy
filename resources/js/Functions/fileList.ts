import { useState } from 'react'

export default function useFiles() {
    const [files, setFiles] = useState([])

    function addFiles(newFiles) {
        const newUploadableFiles = [...newFiles]
            .map((file) => new UploadableFile(file))
            .filter((file) => !fileExists(file.id))
        setFiles((prevFiles) => prevFiles.concat(newUploadableFiles))
    }

    function fileExists(otherId) {
        return files.some(({ id }) => id === otherId)
    }

    function removeFile(file) {
        setFiles((prevFiles) => prevFiles.filter((f) => f.id !== file.id))
    }

    function addFile(newFiles) {
        const newUploadableFiles = [...newFiles]
            .map((file) => new UploadableFile(file))
            .filter((file) => !fileExists(file.id))
        setFiles(newUploadableFiles)
    }

    function getFiles() {
        return files
    }

    function clear() {
        setFiles([])
    }

    return { files, addFiles, removeFile, addFile, getFiles, clear }
}

class UploadableFile {
    constructor(file) {
        this.file = file
        this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
        this.url = URL.createObjectURL(file)
        this.type = `${file.type}`
        this.status = null
    }
}
