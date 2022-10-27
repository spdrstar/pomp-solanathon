import React from 'react';
import { Container, Row, Text, Button } from "@nextui-org/react"

const Upload = ({ uploadedImage, setUploadedImage, setHeight, setWidth }) => (
  <Container>
    <Text h1>Upload Image</Text>
    <Row>
      <Text>
        Click on the upload icon to upload image. You can repeat this step to choose another image.
      </Text>
      <div>
          <Button htmlFor="contained-button-file" >
            Upload
          </Button>
        <input
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          id='contained-button-file'
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setUploadedImage(URL.createObjectURL(e.target.files[0]));
              const i = new Image();
              i.onload = function () {
                const imageDimensions = [
                  {
                    height: i.height,
                    width: i.width,
                  },
                ];
                setHeight(imageDimensions[0].height);
                setWidth(imageDimensions[0].width);
              };

              i.src = URL.createObjectURL(e.target.files[0]);
            }
          }}
        />
      </div>
    </Row>
  </Container>
);

export default Upload;
