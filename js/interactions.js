const createTooltip = (data) => {

  const tooltipWidth = 180;
  const tooltipHeight = 190;
  const textColor = "#494e4f";

  const tooltip = innerChart
    .append('g')
      .attr('class', 'tooltip')
      .style('font-size', '14px');
  const tooltipLine = tooltip
    .append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', -1 * (margin.top - tooltipHeight))
      .attr('y2', innerHeight)
      .attr('stroke', textColor)
      .attr("stroke-width", 2)
      .attr('stroke-dasharray', '6 4');
  const tooltipYear = tooltip
    .append('text')
      .attr("class", "tooltip-year")
      .attr('x', 0)
      .attr('y', innerHeight + 25)
      .style('font-size', '16px')
      .style('font-weight', 700)
      .style("fill", textColor)
      .attr('text-anchor', 'middle');

  const tooltipBackground = tooltip
    .append("rect")
      .attr("x", -1 * tooltipWidth/2)
      .attr("y", -1 * margin.top)
      .attr("width", tooltipWidth)
      .attr("height", tooltipHeight)
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("fill", "#dfe9ed");

  const tooltipContent = tooltip
    .append("text")
      .attr("class", "tooltip-content")
      .attr("x", -1 * tooltipWidth/2 + 20)
      .attr("y", -1 * margin.top + 30)
      .style("font-size", "14px")
      .style("font-weight", 500)
      .style("fill", textColor);

  const data1973 = data.find(item => item.year === 1973);
  let total1973 = 0;
  formatsInfo.forEach(format => {
    total1973 = total1973 + data1973[format.id];
  });

  tooltipContent
    .append("tspan")
      .attr("class", "sales-total")
      .text(`Total sales: ${d3.format(",.2r")(total1973)}M$`);;
  formatsInfo.forEach(format => {
    tooltipContent
      .append("tspan")
        .attr("class", `sales-${format.id}`)
        .attr("x", -1 * tooltipWidth/2 + 20)
        .attr("dy", 20)
        .text(`${format.label}: ${d3.format(",.2r")(data1973[format.id])}M$`);
  });

}

const handleMouseEvents = (data) => {

  d3.selectAll(".areas-container path")
    .on("mousemove", (e, d) => {

      // Set the position of the tooltip according to the x-position of the mouse
      // console.log(e);
      const xPosition = e.offsetX - margin.left;
      d3.select(".tooltip").attr('transform', `translate(${xPosition}, 0)`);

      // Get the year corresponding to the x-position and set the text of the tooltip's year label
      // scaleX is a continuous scale, which means it can return any floating number
      // Since the years are integers, we need to round the value returned by the scale
      const year = Math.round(xScale.invert(e.offsetX - margin.left)); 
      d3.select(".tooltip-year").text(year);

      // Populate the tooltip content
      // console.log("data", data);
      const yearData = data.find(item => item.year === year);
      console.log(yearData)
      let totalSales = 0;

      formatsInfo.forEach(format => {
        totalSales = totalSales + yearData[format.id];

        d3.select(`.sales-${format.id}`)
          .text(`${format.label}: ${d3.format(",.2r")(yearData[format.id])}M$`);
      });

      d3.select(".sales-total")
        .text(`Total sales: ${d3.format(",.2r")(totalSales)}M$`);

    });

}