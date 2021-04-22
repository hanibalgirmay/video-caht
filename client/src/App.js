import { Typography, AppBar } from "@material-ui/core";
import VideoPlayer from "./components/VideoPlayer";
import Notification from "./components/Notification";
import Options from "./components/Options";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    border: "2px solid black",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  image: {
    marginLeft: "15px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

function App() {
  const style = useStyles();

  return (
    <div className={style.wrapper}>
      <AppBar className={style.appBar} position="static">
        <Typography variant="h2" align="center">
          Video Chat
        </Typography>
      </AppBar>

      {/* video */}
      <VideoPlayer />
      {/* options */}
      <Options>
        <Notification />
      </Options>
    </div>
  );
}

export default App;
