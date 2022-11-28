import React, { useState, useRef } from 'react';

// Libraries
import useImage from 'use-image';
import styled from 'styled-components';
import tw from 'twin.macro';
import Helmet from 'react-helmet';

// Components
import Inputs from '../components/frameControllers/DetailsInput';
import SelfieInputs from '../components/frameControllers/SelfieInput';
import Download from '../components/toolbox/Download';
import Mint from '../components/toolbox/Mint';
import CanvasStage from '../components/canvas/Stage';

// Assets
import frameData from '../../config/frameData';

const Container3 = styled.h1`
  ${tw`
   w-94
   pt-2
   m-auto
   sm:w-full
`}
`;

const C1 = styled.div`
  ${tw`
  mt-5
  mlg:mt-0
  `}

  background-color: #333333;
  padding: 1rem;
  border-radius: 4px;
  width: 100%;
`;

const C4 = styled.div`
  ${tw`
  pt-8
  pl-5
  mlg:flex justify-center m-0
  `}
`;

const C3 = styled.div`
  ${tw`
  `}
`;

const C2 = styled.div`
  ${tw`
    flex
    gap-20
    mt-18
    mlg:grid
    mlg:gap-0
  `}
`;

const Container = styled.div`
  ${tw`
    bg-color-secondary
    h-full
    grid
    font-roboto
    justify-center
    text-center
    justify-items-center
    items-center
    p-5
    overflow-y-hidden
    `}
`;

const FRAMES = {
  ONE: frameData.frames.ONE,
  TWO: frameData.frames.TWO,
  THREE: frameData.frames.THREE,
  FOUR:frameData.frames.FOUR,
};

const Frame = () => {
  const [selectedFrame, setSelectedFrame] = useState(FRAMES.ONE);
  const [uploadedImage, setUploadedImage] = useState();
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();

  const stageRef = useRef(null);
  const [frameImg] = useImage(selectedFrame, 'Anonymous');
  const [image] = useImage(uploadedImage, 'Anonymous');

  return (
    <>
      <Helmet>
        <title>Hack Week DAO - POMP</title>
        <meta name='Hack Week DAO - POMP' contect='Proof of membership for Hack Week' />
      </Helmet>

      <Container>
        <C2>
          <C1>
            {typeof window !== 'undefined' && (
              <CanvasStage
                stageRef={stageRef}
                frameImg={frameImg}
                image={image}
                height={height}
                width={width}
              />
            )}
          </C1>

          <C3>
            <Container3>
              <SelfieInputs
                uploadedImage={uploadedImage}
                setUploadedImage={setUploadedImage}
                setHeight={setHeight}
                setWidth={setWidth}
              />
            </Container3>
            <Container3>
              <Inputs
                uploadedImage={uploadedImage}
                setUploadedImage={setUploadedImage}
                setHeight={setHeight}
                setWidth={setWidth}
              />
            </Container3>
            <Download stageRef={stageRef} />
            <Mint stageRef={stageRef} />
          </C3>
        </C2>
      </Container>
    </>
  );
};

export default Frame;
