import React, { useEffect, useRef, useState } from "react";
const App = () => {
  const canvas_Ref = useRef(null);
  const context_Ref = useRef(null);
  const [canvasIsDrawing, setCanvasIsDrawing] = useState(false);
  const [startPosLine, setStartPosLine] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvas_Ref.current;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "red";
    context.lineWidth = 2;
    context_Ref.current = context;
  }, []);
  const handleMouseDown = (e) => {
    if (e.button === 0) {
      if (!canvasIsDrawing) {
        const { clientX, clientY } = e;
        setStartPosLine({ x: clientX, y: clientY });
        context_Ref.current.beginPath();
        //context_Ref.current.moveTo(clientX, clientY);
        setCanvasIsDrawing((prev) => !prev);
      } else if (canvasIsDrawing) {
        context_Ref.current.closePath();
        setCanvasIsDrawing((prev) => !prev);
      }
    } else {
      e.preventDefault();
      context_Ref.current.lineTo(0, 0);
      //context_Ref.current.lineTo(0, 0);
      console.log(e, "e");
    }
  };
  const handleMouseMove = (e) => {
    if (canvasIsDrawing) {
      const { clientX, clientY } = e;
      context_Ref.current.moveTo(startPosLine.x, startPosLine.y);
      //const add = canvas_Ref.current.getBoundingClientRect();

      context_Ref.current.lineTo(clientX, clientY);
      context_Ref.current.stroke();
      e.preventDefault();
    }
  };
  const clearCanvas = () => {
    context_Ref.clearRect(0, 0, 0, 0);
  };

  return (
    <div className="canvas__conteiner">
      <canvas
        className="canvas"
        width={"500px"}
        height={"300vh "}
        ref={canvas_Ref}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        Canvas
      </canvas>
      <button onClick={clearCanvas}>Clear</button>
    </div>
  );
};
export default App;
