import React from "react";
import FilesUpload from "./FilesUpload";
import debug from "sabio-debug";
import toastr from "toastr";

function FilesUploadExample() {
  const _logger = debug.extend("FilesUpload");

  const handleUpload = (response) => {
    _logger(response);
    toastr.success("Files Were Successfully Uploaded");
  };

  return (
    <div>
      <h1 className="mb-1 h2 fw-bold">File Uploader</h1>
      <div className="card bg-white">
        <div className="row">
          <div className="col-10">
            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <div className="ms-3 mt-3">
                <FilesUpload handleUpload={handleUpload} isMultiple={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilesUploadExample;
