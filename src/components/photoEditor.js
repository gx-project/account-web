import { useState, useEffect, useCallback } from "react";
import { observer } from "mobx-react";
import { useDropzone } from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { Dashboard, Register } from "../stores";

import StepButton from "./stepButton";

function PictureStep({ onResult, onSend, current, theme, classes, ...props }) {
  const [changed, setChanged] = useState(false);
  const [file, setFile] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [editor, setEditor] = useState();
  const onDrop = useCallback(([file]) => {
    setChanged(true);
    setFile(file);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleZoom = (event, zoom) => {
    !changed && setChanged(true);
    setZoom(zoom);
  };

  useEffect(() => {
    current && setFile(current);
  }, [current]);

  return (
    <div {...props}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <StepButton className={classes.button} fullWidth={false}>
          Escolher
        </StepButton>
      </div>
      {file && (
        <>
          <AvatarEditor
            ref={editor => setEditor(editor)}
            image={file}
            width={230}
            height={230}
            border={0}
            borderRadius={230}
            color={theme.palette.type === "dark" ? [0, 0, 0] : [238, 238, 238]} // RGBA
            scale={zoom}
            rotate={0}
            style={{
              display: "block",
              margin: "0 auto",
              borderRadius: "50%",
              border: "2px solid",
              borderColor:
                theme.palette.type === "dark"
                  ? theme.palette.secondary.main
                  : theme.palette.grey[100],
              boxShadow: `0px 0px 100px -30px ${theme.palette.primary.main}`
            }}
          />
          <Slider
            value={zoom}
            onChange={handleZoom}
            style={{ width: "80%", margin: "0 auto", display: "block" }}
            min={1}
            max={2}
            step={0.1}
          />
          <StepButton
            disabled={!changed}
            fullWidth={false}
            className={classes.button}
            onClick={() => {
              const el = editor.getImageScaledToCanvas();
              el.toBlob(async photo => {
                setChanged(false);
                const result = await Dashboard.Account.setUpdate(
                  "photo",
                  { photo },
                  true
                );
                onResult && onResult(result);
              });
            }}
            loading={Register.loading}
          >
            salvar
          </StepButton>
        </>
      )}
    </div>
  );
}

export default withStyles(
  theme => ({
    button: {
      display: "block",
      margin: `${theme.spacing(2)}px auto`
    }
  }),
  { withTheme: true }
)(observer(PictureStep));
