import React, {useState, useCallback} from "react";
import {useDropzone} from "react-dropzone";
import "./files.css";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import fileService from "services/fileService";
import FilePreview from "./FilePreview";

// EXAMPLE IMPLEMENTATION OF THIS CODE IS PROVIDED IN FilesUploadExample.JSX

function FilesUpload({handleUpload, isMultiple}) {
  const [files, setFiles] = useState({
    filesToUpload: {},
    previewFiles: [],
  });

  const _logger = debug.extend("FilesUpload");

  const handleFilesUpload = (acceptedFiles) => {
    setFiles((prevState) => {
      const fileList = {...prevState};
      fileList.filesToUpload = acceptedFiles;
      fileList.previewFiles = acceptedFiles.map((file) =>
        Object.assign(file, {preview: URL.createObjectURL(file)})
      );
      return fileList;
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    handleFilesUpload(acceptedFiles);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple: isMultiple,
  });

  const mapPreview = (file) => {
    return <FilePreview file={file} key={file.name} />;
  };

  const onSubmit = () => {
    const filesData = new FormData();

    for (let idx = 0; idx < files.filesToUpload.length; idx++) {
      const currentFile = files.filesToUpload[idx];
      filesData.append("files", currentFile);
    }

    _logger("Submitting:::", filesData);
    fileService.upload(filesData).then(onUploadSuccess).catch(onUploadError);
  };

  const onUploadSuccess = (response) => {
    _logger("Upload Success:", response);
    handleUpload(response);
  };

  const onUploadError = (err) => {
    _logger("Upload Failed:", err);
  };

  return (
    <div className="mb-3">
      <div className="d-flex align-items-center">
        <div
          {...getRootProps()}
          className={`form-control dropzone ${isDragActive ? "drag-active" : ""}`}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the {isMultiple ? "files" : "file"} here...</p>
          ) : (
            <p className="mt-2">
              Drag n drop {isMultiple ? "some files" : "a file"} here, or click to select{" "}
              {isMultiple ? "files" : "a file"}
            </p>
          )}
        </div>
        <button className="btn btn-primary ms-2" type="button" onClick={onSubmit}>
          {" "}
          Upload
        </button>
      </div>
      <ul className="horizontal">{files.previewFiles.map(mapPreview)}</ul>
    </div>
  );
}
FilesUpload.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  isMultiple: PropTypes.bool,
};

FilesUpload.defaultProps = {
  isMultiple: true,
};
export default FilesUpload;
