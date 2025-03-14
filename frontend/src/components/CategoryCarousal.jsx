import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { setSearchJobText } from "../redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CategoryCarousal = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickHandler = (query) => {
      dispatch(setSearchJobText(query));
    navigate("/browse");
  };
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
  ];

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, idx) => {
            return (
              <div key={idx} onClick={() => {
              
                onClickHandler(cat);
              }}>
              <CarouselItem
                
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Button variant="outline" className="rounded-full">
                  {cat}
                </Button>
              </CarouselItem>

              </div>
            );
          })}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </div>
  );
};

export default CategoryCarousal;
