import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  margin: 40px 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const CarouselWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${(props) => `translateX(-${props.index * 100}%)`};
  width: 100%;
`;

const CarouselItem = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const OverlayText = styled.div`
  position: absolute;
  top: 50%; 
  left: 20px;
  transform: translateY(-50%); 
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  z-index: 2; 
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 40px;
  color: white;
  cursor: pointer;
  ${(props) => (props.direction === 'left' ? 'left: 20px;' : 'right: 20px;')}
  user-select: none;
  z-index: 3; 
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff6347;
  }
`;

const Carousel = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselItems = [
    {
      img: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg',
      text: 'تعلم بطرق مبتكرة'
    },
    {
      img: 'https://images.pexels.com/photos/2781814/pexels-photo-2781814.jpeg',
      text: 'استمتع بالتعلم'
    },
    {
      img: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg',
      text: 'حقق أهدافك الدراسية'
    },
    {
      img: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5',
      text: 'قيم نفسك باستمرار'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1));
    }, 5000); // تغيير الصورة كل 5 ثوانٍ

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const handlePrev = () => {
    setCarouselIndex((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <CarouselContainer>
      <CarouselWrapper index={carouselIndex}>
        {carouselItems.map((item, index) => (
          <CarouselItem key={index}>
            <CarouselImage src={item.img} alt={item.text} />
            <OverlayText>{item.text}</OverlayText>
          </CarouselItem>
        ))}
      </CarouselWrapper>
      <Arrow direction="left" onClick={handlePrev}>
        ❮
      </Arrow>
      <Arrow direction="right" onClick={handleNext}>
        ❯
      </Arrow>
    </CarouselContainer>
  );
};

export default Carousel;