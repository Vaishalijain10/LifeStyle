import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function ImgMediaCard(props) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{ maxWidth: 345 }}
      className="transition-transform transform hover:scale-105 hover:border-2 hover:border-blue-500"
      onClick={() => {
        console.log("Product detail of : ", props.given._id);
        navigate(`/ProductDetails/${props.given._id}`);
      }}
    >
      {/* PRODUCT Category */}
      <h1 className="text-lg font-bold p-4">{props.given.ProductCategory}</h1>

      <CardMedia  
        component="img"
        alt="IMG CARD"
        height="140"
        image={props.given.images}
      />

      <CardContent>
        {/* Product name  */}
        <Typography gutterBottom variant="h5" component="div">
          {props.given.Name}
        </Typography>

        {/* Products Rating of product */}
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props.given.Rating}
        </Typography>

        {/* Products about Item */}
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props.given.AboutItem}
        </Typography>

        {/* Products Price and discount*/}
        <div className="flex flex-col gap-2">
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {props.given.Price}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {props.given.Discount}
          </Typography>
        </div>
      </CardContent>

      <CardActions>
        <Button size="small">Like</Button>
        <Button size="small">Add To Cart</Button>
      </CardActions>
    </Card>
  );
}
