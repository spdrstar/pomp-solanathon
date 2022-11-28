import React from 'react';

// Components
import Upload from '../toolbox/Upload';

const Inputs = ({
  uploadedImage,
  setUploadedImage,
  setHeight,
  setWidth,
}) => (
  <div>
    <Upload
      uploadedImage={uploadedImage}
      setUploadedImage={setUploadedImage}
      setHeight={setHeight}
      setWidth={setWidth}
    />
  </div>
);

export default Inputs;
