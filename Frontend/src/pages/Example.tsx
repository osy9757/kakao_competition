import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

const Example: React.FC = () => {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setSelectedFile(event.target.files[0]);
  //   }
  // };

  // const onUpload = async () => {
  //   if (!selectedFile) {
  //     console.error("No file selected");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("files", selectedFile);

  //   try {
  //     const response = await axios.post(
  //       "http://43.202.138.58:8000/kyh/",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     console.log("File uploaded successfully", response.data);
  //   } catch (error) {
  //     console.error("Error uploading the file", error);
  //   }
  // };

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      {/* <input type="file" onChange={onFileChange} />
      <button onClick={onUpload}>Upload</button> */}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>질문1</Typography>
          <Typography sx={{ color: "text.secondary" }}>질문1 ?????</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>질문 1 대답</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>질문2</Typography>
          <Typography sx={{ color: "text.secondary" }}>질문2 ?????</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>질문2 대답</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>질문3</Typography>
          <Typography sx={{ color: "text.secondary" }}>질문3 ??????</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>질문3 대답</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>질문4</Typography>
          <Typography sx={{ color: "text.secondary" }}>질문4 ??????</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>질문4 대답</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Example;
