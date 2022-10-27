import React from "react";
import { useState } from "react";
import Webcam from "react-webcam";
import { Container, Card, Row, Col, Text, Button } from "@nextui-org/react";
import Image from "next/image"
import html2canvas from "html2canvas";

export default function Box() {

  const [camera, setCamera] = useState(true);
  const [image, setImage] = useState();
  const [isSelfieTaken, setIsSelfieTaken] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Take your POMP")

  const webcamRef = React.useRef(null);
  const captureRef = React.useRef();

  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "user"
  };

  const startCamera = () => {
    setCamera(true);
  }

  const stopCam = () => {
    if (camera) {
      let stream = webcamRef.current.stream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setCamera(false);
    }
  }

  const capture = React.useCallback(
    () => {
      let temp = 3;
      setCamera(true);
      setIsSelfieTaken(false);
      setDisabled(true);
      for(let i=0; i < 4; i++){
        setTimeout(() => {
          if(temp == 0) {
            setButtonText("Cheese!")
          }
          else {
            setButtonText(temp);
          }
          temp -= 1;
        }, i*1000);
      }
      setTimeout(function(){
        // Capture and Show Image
        //setImage(webcamRef.current.getScreenshot());
        handleImage();
        setIsSelfieTaken(true);

        // Stop Camera
        setCamera(false);
        stopCam();

        // Set Button
        setDisabled(false);
        setButtonText("Retake POMP")
      }, 4000);

      },
      [webcamRef]
    );

    const handleImage = async () => {
      const element = captureRef.current;
      const canvas = await html2canvas(element, {
        width: 500,
        height: 500
      });
      const data = canvas.toDataURL('image/png');
      setImage(data);
      //const link = document.createElement('a');

      // if (typeof link.download === 'string') {
      //   link.href = data;
      //   link.download = 'image/png';

      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);
      // } else {
      //   window.open(data);
      // }
    }

  return (
    <Container sm>
      <Card >
        <Card.Body>
          <div ref={captureRef}>
            <Row justify="center" align="center">
                {camera && <> 
                  <Webcam style={{ borderRadius: "500px", position: "relative" }} audio={false} videoConstraints={videoConstraints} ref={webcamRef} onUserMedia={startCamera} />
                  <div style={{ position: "absolute"  }}>
                    <Image src="/fincPOMP.png" alt="POMP overlay" width="500px" height="500px" />
                  </div> </> }
                  {isSelfieTaken && <Image className="image-captured" src={image} width="500px" height="500px"></Image>}
              </Row>
          </div>
        </Card.Body>
        <Row justify="center" align="center">
          <Button disabled={disabled} bordered css={{ px: "$13", width: "1em" }} size="md" onClick={capture}>{buttonText}</Button>
        </Row>
        <Card.Footer></Card.Footer>
      </Card>
    </Container>
  );
}
