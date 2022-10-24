import React, { useEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm";

const generator = rough.generator();

const createElement = (x1, y1, x2, y2) => {
  const roughElement = generator.line(x1, y1, x2, y2);
  return { x1, y1, x2, y2, roughElement };
};

const Canvas = () => {
  const [elements, setElements] = useState([]);
  //const [newElements, setNewElements] = useState([]);

  const [stateDots, setStateDots] = useState([]);
  const [moveDots, setMoveDots] = useState({});
  const [driwing, setDriwing] = useState(false);
  const canvas_Ref = useRef(null);
  const canvas = canvas_Ref.current;
  const context = canvas?.getContext("2d");
  useEffect(() => {
    //canvas.width = window.innerWidth;
    //canvas.width = window.innerWidth;
    console.log(canvas);
  });
  useEffect(() => {
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const roughCanvas = rough.canvas(canvas);
      elements?.forEach(({ roughElement }) => {
        if (roughElement) {
          roughElement.options.stroke = "grey";
          roughElement.options.roughness = 0;
          roughElement.options.strokeWidth = 2;
          return roughCanvas.draw(roughElement);
        }
      });
    }

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
        setStateDots((prev) => [...prev, moveDots]);
        setMoveDots({});
      } else setDriwing(false);
    } else if (event.button === 2) {
      console.log("reigth");
      setElements((prevState) => [...prevState, prevState.pop()]);
      setDriwing(false);
      setMoveDots({});
    }
  };
  useEffect(() => {
    if (Object.keys(moveDots).length > 0) {
      context.beginPath();
      context.lineWidth = 2;
      context.fillStyle = "red";
      context.strokeStyle = "red";
      context.fill();
      context.arc(moveDots.x, moveDots.y, 2, Math.PI * 2, false);
      context.stroke();
    }
    if (stateDots.length > 0) {
      stateDots.forEach((dot) => {
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = "red";
        context.fill();
        context.arc(dot.x, dot.y, 2, Math.PI * 2, false);
        context.fillRect(dot.x, dot.y, 2, 2);
        context.stroke();
      });
    }
  }, [stateDots, moveDots]);

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
      for (let i = 0; i < elements.length; i++) {
        const lineA = elements[i];
        for (let j = 0; j < elements.length; j++) {
          const lineB = elements[j];

          lineSegmentsIntersect(
            lineA.x1,
            lineA.y1,
            lineA.x2,
            lineA.y2,
            lineB.x1,
            lineB.y1,
            lineB.x2,
            lineB.y2
          );
        }
      }
    }
  };
  //const move = (x, y) => {
  //  context.beginPath();
  //  context.lineWidth = 2;
  //  context.fillStyle = "red";
  //  context.strokeStyle = "red";
  //  context.fill();
  //  context.arc(x, y, 2, Math.PI * 2, false);
  //  context.stroke();
  //};
  const lineSegmentsIntersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    const a_dx = x2 - x1;
    const a_dy = y2 - y1;
    const b_dx = x4 - x3;
    const b_dy = y4 - y3;
    const s =
      (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
    const t =
      (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
      const u =
        ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
        ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
      const x = Math.round(x1 + u * (x2 - x1));
      const y = Math.round(y1 + u * (y2 - y1));
      setMoveDots({ x, y });
      return;
    }
  };

  const clearElements = () => {
    //const deleteEl = setInterval(() => {
    //  if (elements[0].x1 > 0) {
    //    const newElements = elements.map((e) => {
    //      return { ...e, x1: e.x1 - e.x1 * 0.5, x2: e.x2 - e.x2 * 0.5 };
    //    });
    //    console.log("newElements", newElements);
    //    setElements([...newElements, {}]);
    //  }
    //}, 500);
    //setTimeout(() => clearInterval(deleteEl), 1000);

    setElements([]);
    setStateDots([]);
    setMoveDots({});
  };
  return (
    <div className="canvas__conteiner">
      <canvas
        id="canvas"
        ref={canvas_Ref}
        resize={"resize"}
        className="canvas"
        width={"500px"}
        height={"300px "}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        Canvas
      </canvas>
      <button className="canvas__button" onClick={clearElements}>
        collapse lines
      </button>
    </div>
  );
};

export default Canvas;
