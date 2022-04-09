import React from "react";
import { Box, Grid } from "@mui/material";

class ImageUploadCard extends React.Component {
  state = {
    mainState: "initial", // initial,  uploaded
    imageUploaded: 0,
    selectedFile: null,
  };

  handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    var name = file.name;

    reader.onloadend = function (e) {
      this.setState({
        selectedFile: [reader.result],
      });
    }.bind(this);
    console.log(url); // see a path?

    this.setState({
      mainState: "uploaded",
      selectedFile: event.target.files[0],
      imageUploaded: 1,
    });
  };

  renderInitialState() {
    return (
      <React.Fragment>
        <Grid container justify="center" alignItems="center">
          <input
            accept="image/*"
            // id="contained-button-file"
            
            multiple
            type="file"
            onChange={this.handleUploadClick}
            style={{opacity: 0,  position: 'absolute'}}
          ></input>
          <button className="btn-upload">add image</button>
        </Grid>
      </React.Fragment>
    );
  }

  renderUploadedState() {
    return (
      <React.Fragment>
        <Box onClick={this.imageResetHandler}>
          <img width="100%" src={this.state.selectedFile} />
        </Box>
      </React.Fragment>
    );
  }

  imageResetHandler = (event) => {
    console.log("Click!");
    this.setState({
      mainState: "initial",
      selectedFile: null,
      imageUploaded: 0,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <Box className={this.props.cardName}>
            {(this.state.mainState === "initial" &&
              this.renderInitialState()) ||
              (this.state.mainState === "uploaded" &&
                this.renderUploadedState())}
          </Box>
        </div>
      </React.Fragment>
    );
  }
}

export default ImageUploadCard;
