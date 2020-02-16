import { useState, useEffect, useCallback } from "react";
import { observer } from "mobx-react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import { useDropzone } from "react-dropzone";

import { stylesHook, BottomContent } from "../style/login";
import RichInput from "./richInput";
import AvatarEditor from "react-avatar-editor";

import State from "../stores/register";
import StepButton from "./stepButton";

function PictureStep({ onResult, title = true, current, ...props }) {
  const { container, flexColumn, button } = stylesHook();
  const [changed, setChanged] = useState(false);
  const [file, setFile] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [editor, setEditor] = useState();
  const onDrop = useCallback(([file]) => {
    setChanged(true);
    setFile(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleZoom = (event, zoom) => {
    !changed && setChanged(true);
    setZoom(zoom);
  };

  useEffect(() => {
    current && setFile(current);
  }, [current]);

  return (
    <div {...props}>
      {title && (
        <div className={`${container} ${flexColumn}`}>
          <Typography style={{ margin: "5% 0" }} component="h1" variant="h5">
            Foto de perfil
          </Typography>
        </div>
      )}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <StepButton fullWidth={false}>Escolher</StepButton>
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
            color={[238, 238, 238]} // RGBA
            scale={zoom}
            rotate={0}
            style={{
              display: "block",
              margin: "0 auto",
              borderRadius: "50%"
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
            onClick={() => {
              const el = editor.getImageScaledToCanvas();
              el.toBlob(async blob => {
                const result = await State.sendPicture(blob);
                setChanged(false);
                onResult && onResult(result);
              });
            }}
            loading={State.loading}
          >
            salvar
          </StepButton>
        </>
      )}
    </div>
  );
}

export default observer(PictureStep);
