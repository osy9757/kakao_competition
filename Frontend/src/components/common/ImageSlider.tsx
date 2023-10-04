import Carousel from "react-material-ui-carousel";
import { Paper, Typography } from "@mui/material";

const MultipleItems = () => {
  return (
    <Carousel animation="slide" navButtonsAlwaysVisible={true} autoPlay={false}>
      <Paper style={{ display: "flex", position: "relative" }}>
        <img
          src="/img1.jpg"
          alt="popular tour place 1"
          style={{ width: "33.33%", minHeight: "132px" }}
        />
        <img
          src="/img2.jpg"
          alt="popular tour place 2"
          style={{ width: "33.33%", minHeight: "132px" }}
        />
        <img
          src="/img3.jpg"
          alt="popular tour place 3"
          style={{ width: "33.33%", minHeight: "132px" }}
        />
        <Typography
          align="left"
          variant="h6"
          style={{
            position: "absolute",
            top: "90%",
            left: "16.65%",
            transform: "translate(-50%, -50%)",
            color: "white",
            width: "31.33%",
            height: "20%",
            backgroundColor: "black",
            paddingLeft: "3%",
            fontSize: "20px",
            opacity: "0.6",
            fontWeight: "bold",
          }}
        >
          여행지 1
        </Typography>
        <Typography
          variant="h6"
          style={{
            position: "absolute",
            top: "90%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            width: "31.33%",
            height: "20%",
            backgroundColor: "black",
            paddingLeft: "3%",
            fontSize: "20px",
            opacity: "0.6",
            fontWeight: "bold",
          }}
        >
          여행지 2
        </Typography>
        <Typography
          variant="h6"
          style={{
            position: "absolute",
            top: "90%",
            left: "83.35%",
            transform: "translate(-50%, -50%)",
            color: "white",
            width: "31.33%",
            height: "20%",
            backgroundColor: "black",
            paddingLeft: "3%",
            fontSize: "20px",
            opacity: "0.6",
            fontWeight: "bold",
          }}
        >
          여행지 3
        </Typography>
      </Paper>
      <Paper style={{ display: "flex" }}>
        <img
          src="/img4.jpg"
          alt="popular tour place 4"
          style={{ width: "33.33%", minHeight: "132px" }}
        />
        <img
          src="/img5.jpg"
          alt="popular tour place 5"
          style={{ width: "33.33%", minHeight: "132px" }}
        />
        <img
          src="/img6.jpg"
          alt="popular tour place 6"
          style={{ width: "33.33%", minHeight: "132px" }}
        />
        <Typography
          align="left"
          variant="h6"
          style={{
            position: "absolute",
            top: "90%",
            left: "16.65%",
            transform: "translate(-50%, -50%)",
            color: "white",
            width: "31.33%",
            height: "20%",
            backgroundColor: "black",
            paddingLeft: "3%",
            fontSize: "20px",
            opacity: "0.6",
            fontWeight: "bold",
          }}
        >
          여행지 4
        </Typography>
        <Typography
          variant="h6"
          style={{
            position: "absolute",
            top: "90%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            width: "31.33%",
            height: "20%",
            backgroundColor: "black",
            paddingLeft: "3%",
            fontSize: "20px",
            opacity: "0.6",
            fontWeight: "bold",
          }}
        >
          여행지 5
        </Typography>
        <Typography
          variant="h6"
          style={{
            position: "absolute",
            top: "90%",
            left: "83.35%",
            transform: "translate(-50%, -50%)",
            color: "white",
            width: "31.33%",
            height: "20%",
            backgroundColor: "black",
            paddingLeft: "3%",
            fontSize: "20px",
            opacity: "0.6",
            fontWeight: "bold",
          }}
        >
          여행지 6
        </Typography>
      </Paper>
    </Carousel>
  );
};

export default MultipleItems;
