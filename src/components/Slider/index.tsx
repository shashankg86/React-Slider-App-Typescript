import React, { useState, useEffect, useRef } from "react";
import SliderItem from "./SliderItem";
import { StyledSliderWrapper, StyledSlider } from "./SliderStyles";
import CircleSvg from "./../../assets/chevron-circled.svg";
import { Block } from "vcc-ui";
type SliderProps = {
  children?: any;
  zoomFactor: number;
  slideMargin: number;
  maxVisibleSlides: number;
  pageTransition: number;
};

const numberOfSlides = (maxVisibleSlides: number, windowWidth: number) => {
  if (windowWidth > 1200) return maxVisibleSlides;
  if (windowWidth > 992) return 4;
  if (windowWidth > 768) return 3;
  return 1;
};

const Slider: React.FC<SliderProps> = ({
  children,
  zoomFactor,
  slideMargin,
  maxVisibleSlides,
  pageTransition,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [transformValue, setTransformValue] = useState(`-${zoomFactor / 2}%`);
  const [scrollSize, setScrollSize] = useState(0);

  const sliderRef = useRef<any>(null);

  const visibleSlides = numberOfSlides(maxVisibleSlides, scrollSize);
  const totalPages: number = Math.ceil(children.length / visibleSlides) - 1;

  useEffect(() => {
    //@ts-ignore
    const resizeObserver = new ResizeObserver((entries) => {
      setScrollSize(entries[0].contentRect.width);
    });
    resizeObserver.observe(sliderRef?.current);
  }, [sliderRef]);

  useEffect(() => {
    if (sliderRef && sliderRef.current) {
      if (currentPage > totalPages) setCurrentPage(totalPages);
      sliderRef.current.style.transform = `translate3D(-${
        currentPage * scrollSize
      }px, 0, 0)`;
    }
  }, [sliderRef, currentPage, scrollSize, totalPages]);

  const disableHoverEffect = () => {
    if (sliderRef.current) sliderRef.current.style.pointerEvents = "none";
    setTimeout(() => {
      if (sliderRef.current) sliderRef.current.style.pointerEvents = "all";
    }, pageTransition);
  };

  const handleSlideMove = (forward: boolean) => {
    disableHoverEffect();
    setCurrentPage(currentPage + (forward ? 1 : -1));

    if (sliderRef.current)
      sliderRef.current.style.transform = `translate3D(-${
        (currentPage + (forward ? 1 : -1)) * scrollSize
      }px, 0, 0)`;
  };

  const handleMouseOver = (id: number) => {
    if (id % visibleSlides === 1) setTransformValue("0%"); // left
    if (id % visibleSlides === 0) setTransformValue(`-${zoomFactor}%`); // right
  };

  const handleMouseOut = () => {
    setTransformValue(`-${zoomFactor / 2}%`);
  };

  const assignSlideClass = (index: number, visibleSlides: number) => {
    const classes = ["right", "left"];
    return classes[index % visibleSlides] || "";
  };

  return (
    <StyledSliderWrapper zoomFactor={zoomFactor} visibleSlides={visibleSlides}>
      <StyledSlider
        visibleSlides={visibleSlides}
        transformValue={transformValue}
        zoomFactor={zoomFactor}
        slideMargin={slideMargin}
        pageTransition={pageTransition}
        ref={sliderRef}
      >
        {children.map((child: any, i: any) => (
          <>
            <SliderItem
              key={i}
              slideMargin={slideMargin}
              visibleSlides={visibleSlides}
              zoomFactor={zoomFactor}
              slideClass={assignSlideClass(i + 1, visibleSlides)}
              id={i + 1}
              callback={handleMouseOver}
              callbackOut={handleMouseOut}
            >
              {child}
            </SliderItem>
          </>
        ))}
      </StyledSlider>
      <Block className="dotsWrapper">
        {children.map((child: any, i: any) => (
          <Block
            key={i}
            extend={{
              width: 10,
              borderRadius: 20,
              marginLeft: 5,
              height: 10,
              background: currentPage === i ? "black" : "lightgrey",
            }}
          ></Block>
        ))}
      </Block>
      <Block extend={{ margin: "5px" }}>
        <Block className="button-wrapper forward">
          <img
            src={CircleSvg}
            alt="back"
            className="button forward"
            onClick={() => handleSlideMove(true)}
          />
        </Block>
        <Block
          className="button-wrapper back"
          onClick={() => currentPage >= 1 && handleSlideMove(false)}
        >
          <img className="button back" alt="forward" src={CircleSvg} />
        </Block>
      </Block>
      <div className="m-5"></div>
    </StyledSliderWrapper>
  );
};

export default Slider;
