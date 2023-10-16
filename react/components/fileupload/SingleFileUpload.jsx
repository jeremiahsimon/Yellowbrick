import React from "react";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import fileService from "services/fileService";

// EXAMPLE IMPLEMENTATION OF THIS CODE IS PROVIDED IN USERSETTINGS.JSX

function SingleFileUpload({handleUpload}) {
  const _logger = debug.extend("SingleFile");

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const fileData = new FormData();
    fileData.append("files", file);
    fileService.upload(fileData).then(onUploadSuccess).catch(onUploadError);
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
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        id="singleUpload"
        className="form-control"
        onChange={onFileChange}
      />
    </div>
  );
}
SingleFileUpload.propTypes = {
  handleUpload: PropTypes.func.isRequired,
};
export default SingleFileUpload;
