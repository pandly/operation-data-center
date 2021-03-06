const baseLine = (cfg, container, shape, transpose) => {
    const points = cfg.points;
    let path = []; 

    if(transpose){
        path.push(['M', points[0].x, points[0].y]);
        path.push(['L', points[1].x, 1]);
        path.push(['L', points[2].x, 1]);
        path.push(['L', points[3].x, points[3].y]);
    }else{
        path.push(['M', points[0].x, 1]);
        path.push(['L', points[1].x, points[1].y]);
        path.push(['L', points[2].x, points[2].y]);
        path.push(['L', points[3].x, 1]);
    }
    path.push('Z');
    path = shape.parsePath(path); // 将 0 - 1 转化为画布坐标
    const setting = transpose ? {
      x: path[0][1],
      y: path[2][2],
      width: path[2][1] - path[0][1],
      height: path[0][2] - path[2][2],
      fill: cfg.color,
      radius: path[2][1] - path[0][1] > path[0][2] - path[2][2] ? (path[0][2] - path[2][2]) / 2:0,
      opacity: 0.3,
    } : {
      x: path[1][1],
      y: path[1][2],
      width: path[2][1] - path[1][1],
      height: path[0][2] - path[1][2],
      fill: cfg.color,
      radius: path[0][2] - path[1][2] > path[2][1] - path[1][1] ? (path[2][1] - path[1][1]) / 2 : 0,
      opacity: 0.3,
    };
    return setting;
  };
  
  export default baseLine;
  