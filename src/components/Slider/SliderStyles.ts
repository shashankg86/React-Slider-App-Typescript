import styled from "styled-components";

type SliderWrapperProps = {
  zoomFactor: number;
  visibleSlides: number;
};

type SliderProps = {
  visibleSlides: number;
  transformValue: string;
  zoomFactor: number;
  slideMargin: number;
  pageTransition: number;
  ref: any;
};

export const StyledSliderWrapper = styled.div<SliderWrapperProps>`
  overflow: auto;
  overflow-x: hidden;
  position: relative;
  background: #fff;
  padding: ${(props) => (props.zoomFactor / props.visibleSlides) * 0.7 + "%"} 0;
  height: 100vh;

  .button-wrapper {
    position: relative;
    width: 55px;
    height: 100%;
    top: 70px;
    padding: 0;
    box-sizing: border-box;
    float: right;
  }

  .button {
    display: block;
    // background: rgb(0, 0, 0, 0.7);
    border: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 3rem;
    font-weight: 800;
    cursor: pointer;
    outline: none;
    transition: all 0.7s;
    user-select: none;

    :hover {
      opacity: 0.2;
    }
  }

  img.button.back {
    transform: rotate(180deg);
  }

  .back {
    left: 0;
  }

  .forward {
    right: 0;
  }
`;

export const StyledSlider = styled.div<SliderProps>`
  display: flex;
  padding: 0 50px;
  transition: transform ${(props) => props.pageTransition}ms ease;
`;
