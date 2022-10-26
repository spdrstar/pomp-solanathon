import React from "react";
import { useState } from "react";
import Webcam from "react-webcam";
import { Container, Card, Row, Col, Text, Button } from "@nextui-org/react";
import Image from "next/image"

export default function Box() {

  const [camera, setCamera] = useState(true);
  const [image, setImage] = useState();
  const [isSelfieTaken, setIsSelfieTaken] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Take your POMP")

  const webcamRef = React.useRef(null);

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
        setImage(webcamRef.current.getScreenshot());
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

  return (
    <Container sm>
      <Card >
        <Card.Body>
             <Row justify="center" align="center">
              {camera && <> 
                <Webcam style={{ borderRadius: "500px", position: "relative" }} audio={false} videoConstraints={videoConstraints} ref={webcamRef} onUserMedia={startCamera} />
                <div style={{ position: "absolute"  }}>
                  <Image src="/fincPOMP.svg" alt="POMP overlay" width="500px" height="500px" />
                </div> </> }
                {isSelfieTaken && <Image className="image-captured" src={image} width="500px" height="500px"></Image>}
            </Row>
        </Card.Body>
        <Row justify="center" align="center">
          <Button disabled={disabled} bordered css={{ px: "$13", width: "1em" }} size="md" onClick={capture}>{buttonText}</Button>
        </Row>
        <Card.Footer></Card.Footer>
      </Card>
    </Container>
  );
}
