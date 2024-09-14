import * as React from "react";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { useNavigate } from "react-router-dom";

export default function MediaCard(props) {
  // const navigate = useNavigate();
  const details = props.given;
  const url = `http://localhost:1008/${details.images[0]}`;

  return (
    <div className="min-w-[150px] h-[300px] w-[200px] bg-violet-400 rounded-[10px] border-2 border-black 0 ">
      <div id="image" className="p-3 bg-yellow-200 rounded-[30px]">
        <img
          src={url}
          alt={"Don't cry baby"}
          className="w-[170px] h-[120px] border-[3px] border-red-300"
        />
      </div>
      <div id="contents" className="bg-white">
        <h1 className="px-2 text-[14px] font-semibold font-mono">
          {details.Name}
        </h1>
        <h1 className="px-2 text-[12px] font-semibold font-mono bg-green-500 w-fit rounded-[10px] mx-2">
          {details.CountryOfOrigin}
        </h1>
        <div className="flex px-2 justify-between">
          <h1 className="text-[15px] text-green-700 font-semibold font-mono">
            USD {(100 - details.Discount) * 0.01 * details.Price}
          </h1>
          <h1 className=" text-[12px] text-green-700 font-semibold font-mono">
            Discount {details.Discount}%
          </h1>
        </div>
        <h1 className="px-1 text-[12px] font-semibold font-mono w-fit mx-2 text-red-500">
          {details.MaterialType}
        </h1>
        <h1 className="px-1 text-[12px] font-serif w-fit mx-1 line-clamp-3 ">
          {details.AboutItem}
        </h1>
      </div>
         
    </div>

    // <Card
    //   sx={{ maxWidth: 345 }}
    //   className="transition-transform transform hover:scale-105 hover:border-2 hover:border-blue-500"
    //   onClick={() => {
    //     console.log("Product detail of : ", props.given._id);
    //     navigate(`/ProductDetails/${props.given._id}`);
    //   }}
    // >
    //   <h1 className="text-lg font-bold p-4">{props.given.ProductCategory}</h1>

    //   {/* Product category */}
    //   <CardMedia
    //     component="img"
    //     className="h-[300px] w-[250px]" // Updated to match the height attribute
    //     alt="IMG CARD"
    //     image={UrlImg}
    //   />

    //   <CardContent>
    //     {/* Product name  */}
    //     <Typography gutterBottom variant="h5" component="div">
    //       {props.given.Name}
    //     </Typography>

    //     {/* Products Rating of product */}
    //     <Typography variant="body2" sx={{ color: "text.secondary" }}>
    //       {props.given.Rating}
    //     </Typography>

    //     {/* Products about Item */}
    //     <Typography variant="body2" sx={{ color: "text.secondary" }}>
    //       {props.given.AboutItem}
    //     </Typography>

    //     {/* Products Price and discount*/}
    //     <div className="flex flex-col gap-2">
    //       <Typography variant="body2" sx={{ color: "text.secondary" }}>
    //         {props.given.Price}
    //       </Typography>
    //       <Typography variant="body2" sx={{ color: "text.secondary" }}>
    //         {props.given.Discount}
    //       </Typography>
    //     </div>
    //   </CardContent>

    //   <CardActions>
    //     <Button size="small">Like</Button>
    //     <Button size="small">Add To Cart</Button>
    //   </CardActions>
    // </Card>
  );
}
