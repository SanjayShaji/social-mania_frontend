import * as React from "react";
import Box from "@mui/material/Box";
import Upload from "./Upload";
import Popup from "./Popup";
export default function CropImage({image, setImage}) {
  const [open, setOpen] = React.useState(false);
//   const [image, setImage] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Box my={2}>
          <img src={image} alt="cropped" height={300} width={400}/>
        </Box>

        <Upload
          getUploadedFile={(image) => {
            setOpen(true);
            setImage(image);
          }}
        />
        <Popup
          open={open}
          handleClose={handleClose}
          image={image}
          getCroppedFile={(image) => {
            setImage(image);
            handleClose();
          }}
        />
      </Box>
    </div>
  );
}
