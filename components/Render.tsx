import React, { useState, useRef } from 'react';

// Libraries
import useImage from 'use-image';
import styled from 'styled-components';
//import tw from 'twin.macro';

// Components
//import Inputs from '../components/frameControllers/DetailsInput';
//import Download from '../components/toolbox/Download';
import POMPStage from './Stage';
import Upload from './Upload';

// Assets
//import frameData from '../../config/frameData';

// const Container3 = styled.h1`
//   ${tw`
//    w-94
//    pt-2
//    m-auto
//    sm:w-full
// `}
// `;

// const C1 = styled.div`
//   ${tw`
//   mt-5
//   mlg:mt-0
//   `}

//   background-color: #333333;
//   padding: 1rem;
//   border-radius: 4px;
//   width: 100%;
// `;

// const C4 = styled.div`
//   ${tw`
//   pt-8
//   pl-5
//   mlg:flex justify-center m-0
//   `}
// `;

// const C3 = styled.div`
//   ${tw`
//   `}
// `;

// const C2 = styled.div`
//   ${tw`
//     flex
//     gap-20
//     mt-18
//     mlg:grid
//     mlg:gap-0
//   `}
// `;

// const Container = styled.div`
//   ${tw`
//     bg-color-secondary
//     h-full
//     grid
//     font-roboto
//     justify-center
//     text-center
//     justify-items-center
//     items-center
//     p-5
//     overflow-y-hidden
//     `}
// `;

// const Heading = styled.div`
//   ${tw`
//     font-roboto
//     text-6xl
//     flex
//     justify-center
//     items-center
//     gap-4
//     -mt-10
//     mlg:hidden
//     `}
// `;

// const Yellow = styled.span`
//   ${tw`
//     text-frame-yellow
//     `}
// `;

// const SlimText = styled.span`
//   ${tw`
//     font-light
//     text-white
//     `}
// `;

//<Container>
//    <C2>
//        <C1>
//        {typeof window !== 'undefined' && (
//            <POMPStage
//            stageRef={stageRef}
//            frameImg={frameImg}
//            image={image}
//            alignment={alignment}
//            bgColor={bgColor}
//            height={height}
//            width={width}
//            />
//        )}
//        </C1>
//        <C3>
//        <Container3>
//        </Container3>
//       {/* <Download stageRef={stageRef} /> */}
//        </C3>
//    </C2>
//</Container>

const align = ['center', 'left', 'right'];
let i = 0;

const Render = () => {
  const [selectedFrame, setSelectedFrame] = useState("/fincPOMP.png");
  const [uploadedImage, setUploadedImage] = useState("");
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [bgColor, setBgColor] = useState(null);
  const [alignment, setAlignment] = useState(align[0]);

  const handleAlignment = () => {
    setAlignment(align[i + 1]);
    // eslint-disable-next-line no-const-assign
    i += 1;

    if (i === 3) {
      setAlignment(align[i - 3]);
      i = 0;
    }
  };

  const stageRef = useRef(null);
  const [frameImg] = useImage(selectedFrame, 'anonymous');
  const [image] = useImage(uploadedImage, 'anonymous');

  return (
    <>
     <POMPStage
        stageRef={stageRef}
        frameImg={frameImg}
        image={image}
        alignment={alignment}
        bgColor={bgColor}
        height={height}
        width={width}
     />
    <Upload 
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        setHeight={setHeight}
        setWidth={setWidth}
    />
    </>
  );
};

export default Render;



