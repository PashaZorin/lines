import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
//import getStroke from "perfect-freehand";

const generator = rough.generator();

const createElement = (x1, y1, x2, y2) => {
  const roughElement = generator.line(x1, y1, x2, y2);
  return { x1, y1, x2, y2, roughElement };
};

const Canvas = () => {
  const [elements, setElements] = useState([]);
  //  const [dots, setDots] = useState([]);
  const [driwing, setDriwing] = useState(false);
  const canvas = useRef("");
  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);
    elements.forEach(({ roughElement }) => {
      roughElement.options.stroke = "red";
      roughElement.options.roughness = 0;
      roughElement.options.strokeWidth = 2;
      return roughCanvas.draw(roughElement);
    });
    const prDef = (event) => {
      event.preventDefault();
    };
    document.addEventListener("contextmenu", prDef);
    return document.addEventListener("contextmenu", prDef);
  }, [elements]);

  const handleMouseDown = (event) => {
    if (event.button === 0) {
      if (!driwing) {
        setDriwing(true);
        const { clientX, clientY } = event;
        const element = createElement(clientX, clientY, clientX, clientY);
        setElements((prevState) => [...prevState, element]);
      } else setDriwing(false);
    } else if (event.button === 2) {
      console.log("reigth");
      setElements((prevState) => [...prevState, prevState.pop()]);
      setDriwing(false);
    }
  };

  const handleMouseMove = (event) => {
    if (!driwing) return;
    const { clientX, clientY } = event;
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    const updateElement = createElement(x1, y1, clientX, clientY);

    const elementsCopy = [...elements];
    elementsCopy[index] = updateElement;
    setElements(elementsCopy);
    if (elements.length >= 2) {
      //	дописать перебор масива (может 2)
    }
  };
  const handleMouseUp = () => {
    //  setDriwing(!driwing);
  };
  const clearElements = () => {
    setElements([]);
  };
  return (
    <div className="canvas__conteiner">
      <canvas
        id="canvas"
        ref={canvas}
        resize={"resize"}
        className="canvas"
        width={"500px"}
        height={"300px "}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        Canvas
      </canvas>
      <button onClick={clearElements}>clear</button>
    </div>
  );
};

export default Canvas;
