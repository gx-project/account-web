import CircularProgress from "@material-ui/core/CircularProgress";

const style = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
};

export default function Loading() {
  return (
    <div style={style}>
      <div
        style={{
          ...style,
          flexDirection: "row"
        }}
      >
        <CircularProgress color="inherit" />
      </div>
    </div>
  );
}
