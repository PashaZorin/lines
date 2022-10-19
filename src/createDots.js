export const createDots = (context, moveDots, stateDots) => {
  console.log("createdots");
  if (Object.keys(moveDots).length > 0) {
    context.beginPath();
    context.lineWidth = 2;
    context.fillStyle = "red";
    context.strokeStyle = "red";
    context.fill();

    context.arc(moveDots.x, moveDots.y, 5, 0.001, false);
    context.stroke();
  }
  if (stateDots.length > 0) {
    stateDots.forEach((dot) => {
      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = "red";
      context.fill();
      context.arc(dot.x, dot.y, 5, Math.PI * 2, false);
      context.fillRect(dot.x, dot.y, 2, 2);
      context.stroke();
    });
  }
};
