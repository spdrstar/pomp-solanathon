import React from 'react';

// Components
import Selfie from '../toolbox/Selfie';

const SelfieInputs = ({
  uploadedImage,
  setUploadedImage,
  setHeight,
  setWidth,
}) => (
  <div>
    <Selfie
      uploadedImage={uploadedImage}
      setUploadedImage={setUploadedImage}
      setHeight={setHeight}
      setWidth={setWidth}
    />
  </div>
);

export default SelfieInputs;
