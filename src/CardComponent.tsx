import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { userData } from "./Interface";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function CardComponent({
  userName,
  companyName,
  removeUser,
  buttonText
}: {
  userName: string;
  companyName: string;
  removeUser: (buttonText: string) => void;
  buttonText: string;
}) {
  return (
    <Card sx={{ width: 275, marginTop: "20px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {userName}
        </Typography>

        <Typography variant="body2">{companyName}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => removeUser(buttonText)}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}
