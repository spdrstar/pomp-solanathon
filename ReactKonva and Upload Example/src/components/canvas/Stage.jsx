import React, { useState } from 'react';

/// Components
import { Stage, Layer, Image, Group } from 'react-konva';
import TransformableImage from './TransformableImage';
import Webcam from "react-webcam";

const CanvasStage = ({
  stageRef,
  frameImg,
  image,
  width,
  height,
}) => {
  const groupDimensions = {
    height: 272,
    width: 273,
  };
  const groupHeight = groupDimensions.height;
  const aspectRatio = width / height;
  const imageRenderWidth = aspectRatio * groupDimensions.height;
  const imageRenderHeight = groupDimensions.height;
  const imagePositionX = 38.5;
  const imagePositionY = 38;
  const rect = [
    {
      x: 50,
      y: 50,
      id: 'rect1',
    },
    {
      x: 100,
      y: 100,
      id: 'rect2',
    },
  ];

  const renderImg = [
    {
      x: imagePositionX,
      y: imagePositionY,
      id: 'renderImg1',
    },
  ];

  const [tranImg, setTranImg] = useState(renderImg);
  const [selectedId1, selectShape1] = useState(null);
  const [rectangles, setRectangles] = useState(rect);
  const [selectedId, selectShape] = useState(null);
  const [camera, setCamera] = useState(true);

  const checkDeselect = () => {
    selectShape1(null);
    selectShape(null);
  };

  const webcamRef = React.useRef(null);

  const videoConstraints = {
    width: 350,
    height: 350,
    facingMode: "user"
  };

  const startCamera = () => {
    setCamera(true);
  }

  // const stopCam = () => {
  //   if (camera) {
  //     let stream = webcamRef.current?.stream;
  //     const tracks = stream.getTracks();
  //     tracks.forEach((track: { stop: () => any; }) => track.stop());
  //     setCamera(false);
  //   }
  // }

  return (
    <Stage 
      ref={stageRef} 
      width={350} 
      height={350} 
      x={0} 
      style={{ margin: 'auto', borderRadius: "500px" }}
    >
      <Layer>
        <Group
          clipX={imagePositionX}
          clipY={imagePositionY}
          clipWidth={groupDimensions.width}
          clipHeight={groupHeight}
        >
          {/* <TransformableImage
            image={image}
            imageWidth={imageRenderWidth}
            imageHeight={imageRenderHeight}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            isSelected={renderImg[0].id === selectedId1}
            onSelect={() => {
              selectShape1(renderImg[0].id);
            }}
            onChange={(newAttrs) => {
              const imgs = tranImg.slice();
              imgs[0] = newAttrs;
              setTranImg(imgs);
            }}
          /> */}
          <Webcam 
            style={{ borderRadius: "500px", position: "relative" }} 
            audio={false} 
            videoConstraints={videoConstraints} 
            ref={webcamRef} 
            onUserMedia={startCamera} 
          />
        </Group>
        <Image
          image={frameImg}
          width={350}
          height={350}
          style={{ zIndex: '100', position: 'absolute', borderRadius: '500px' }}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          listening={false}
        />
      </Layer>
    </Stage>
  );
};

export default CanvasStage;
