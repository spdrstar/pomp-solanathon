import React from "react";
import { useState } from "react";
import Webcam from "react-webcam";
import { Container, Card, Row, Col, Text, Button } from "@nextui-org/react";
import Image from "next/image"

export default function Box() {

  const [camera, setCamera] = useState(false);
  const [image, setImage] = useState();
  const [isSelfieTaken, setIsSelfieTaken] = useState(false);
  const [isShowVideo, setIsShowVideo] = useState(false);
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
      setIsShowVideo(false);
    }
  }

  const capture = React.useCallback(
    () => {
      let temp = 3;
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
        setImage(webcamRef.current.getScreenshot());
        setIsSelfieTaken(true);
        setIsShowVideo(false);
        stopCam();
      }, 4000);

      },
      [webcamRef]
    );

  return (
    <Container xl>
      <Card >
        <Card.Body>
            <Row justify="center" align="center">
              <Webcam style={{ borderRadius: "500px", position: "relative" }} audio={false} videoConstraints={videoConstraints} ref={webcamRef} onUserMedia={startCamera} />
              <div style={{ position: "absolute"  }}>
                <Image src="/fincPOMP.svg" alt="POMP overlay" width="500px" height="500px" />
              </div>
            </Row>
        </Card.Body>
        <Card.Footer>
          <Button disabled={disabled} auto bordered css={{ px: "$13" }} onClick={capture}>{buttonText}</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}
