/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./App.css";
import Slider from "./components/Slider";
import Api from "./assets/api/cars.json";
import "bootstrap/dist/css/bootstrap.min.css";
import carrot from "./assets/chevron-small.svg";
import FilterForm from "./components/form/form";
import { Card, CardContent, Spinner, useTheme, View } from "vcc-ui";
import NotFound from "./assets/images/not_found.jpg";
const SliderProps = {
  zoomFactor: 30,
  slideMargin: 10,
  maxVisibleSlides: 5,
  pageTransition: 500,
};

export interface CarsModel {
  id: string;
  bodyType: string;
  imageUrl: string;
  modelName: string;
  modelType: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<CarsModel[]>([]);
  const [carsData, setCarData] = useState<CarsModel[]>([]);
  const theme = useTheme();

  useEffect(() => {
    getData();
  }, [data]);

  const getData = () => {
    const data: CarsModel[] = Api;
    setData(data);
    setCarData(data);
  };

  const onFilter = (value: string) => {
    const shallowCopyCars = [...data];

    if (value !== "") {
      const filterData = shallowCopyCars.filter((car) => {
        return car.bodyType.toLowerCase().match(value.toLowerCase());
      });
      setCarData(filterData);
    } else {
      setCarData(shallowCopyCars);
    }
  };

  if (data.length < 1)
    return (
      <React.Fragment>
        <Spinner size={60} color="blue" />
      </React.Fragment>
    );
  return (
    <>
      <View
        extend={{
          background: theme.color.background.secondary,
          height: "100vh",
        }}
      >
        <FilterForm onFilter={onFilter} />
        {carsData && carsData.length > 0 ? (
          <Slider {...SliderProps}>
            {carsData.map((cars) => (
              <div className="cars" key={cars.id}>
                <h5 className="text-secondary">{cars.bodyType}</h5>
                <h5>
                  {cars.modelName}&nbsp;
                  <span>{cars.modelType}</span>
                </h5>

                <img src={cars.imageUrl} alt={cars.modelName} />
                <div className="links flex">
                  <a
                    onClick={() =>
                      window.history.pushState({}, "", `/learn/${cars.id}`)
                    }
                    className="text-decoration-none"
                  >
                    <span>
                      Learn
                      <img src={carrot} width={20} alt="learn" />
                    </span>
                  </a>
                  <a
                    onClick={() =>
                      window.history.pushState({}, "", `/shop/${cars.id}`)
                    }
                    className="text-decoration-none"
                  >
                    <span>
                      Shop
                      <img src={carrot} width={20} alt="shop" />
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <Card>
            <CardContent className="d-block text-center">
              <img src={NotFound} alt="not-found" />
            </CardContent>
          </Card>
        )}
      </View>
    </>
  );
};

export default App;
