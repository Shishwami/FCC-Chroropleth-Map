const educationDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const countryDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

const width = 960;
const height = 600;

const colorRange = ["#ADD8E6",  // Light blue
    "#A4C9D3",
    "#94B0BF",
    "#8497AB",
    "#75809A",
    "#67708A",
    "#5A6080",
    "#4D506F",
    "#3F405E",
];
let colorScale;

const svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "orange");
;

const path = d3.geoPath();

Promise.all([d3.json(educationDataUrl), d3.json(countryDataUrl)])
    .then(([educationData, countryData]) => {
        // console.log(educationData);
        // console.log(countryData);

        drawMap(countryData, educationData);
        drawLegend(countryData, educationData);
    });

function drawMap(countryData, educationData) {

    colorScale = d3.scaleQuantize()
        .domain([0, d3.max(educationData, d => d.bachelorsOrHigher)])
        .range(colorRange);

    const educationByFips = {};
    educationData.forEach(d => {
        educationByFips[d.fips] = d.bachelorsOrHigher;
    });

    const counties = topojson.feature(countryData, countryData.objects.counties).features;

    svg.selectAll("path")
        .data(counties)
        .enter().append("path")
        .attr("d", path)
        .attr("class", "county")
        .attr("data-fips", d => d.id)
        .attr("data-education", d => educationByFips[d.id] || 0)
        .style("fill", d => colorScale(educationByFips[d.id] || 0))
        .style("stroke", "darkgray") // Black outline for the counties
        .style("stroke-width", "1px") // Thin border
        .on("mouseover", (event, d) => {
            const education = educationByFips[d.id] || "No data";
            d3.select("#tooltip")
                .style("opacity", 1)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY - 20}px`)
                .attr("data-education", education)
                .html(`FIPS: ${d.id}<br>Education: ${education}%`);
        })
        .on("mouseout", () => {
            d3.select("#tooltip").style("opacity", 0);
        });

    d3.select("body")
        .append("div")
        .attr("id", "tooltip")
        .style("position", "absolute")
        .style("background", "white")
        .style("border", "1px solid #ccc")
        .style("padding", "5px")
        .style("border-radius", "5px")
        .style("opacity", 0);
}


function drawLegend(countryData, educationData) {

    const legendWidth = 300;
    const legendHeight = 15;
    const margin = 15;
    
    const legendScale = d3.scaleLinear()
        .domain([d3.min(educationData, d => d.bachelorsOrHigher), d3.max(educationData, d => d.bachelorsOrHigher)])
        .range([0, legendWidth]);
    
    const tickValues = Array.from({ length: colorRange.length + 1 }, (_, i) => {
        const step = (legendScale.domain()[1] - legendScale.domain()[0]) / colorRange.length;
        return legendScale.domain()[0] + step * i;
    });
    
    const legendAxis = d3.axisBottom(legendScale)
        .tickSize(10)
        .tickValues(tickValues)
        .tickFormat(d => `${Math.round(d)}%`);
    
    const legend = d3.select("#legend").append("svg")
        .attr("width", legendWidth + 2 * margin)
        .attr("height", legendHeight + margin + 40)
        .append("g")
        .attr("id", "legend")
        .attr("transform", `translate(${margin}, ${margin})`);
    
    legend.selectAll("rect")
        .data(colorRange)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * (legendWidth / colorRange.length))
        .attr("y", 0)
        .attr("width", legendWidth / colorRange.length)
        .attr("height", legendHeight)
        .style("fill", d => d);
    
    legend.append("g")
        .attr("transform", `translate(0, ${legendHeight})`)
        .call(legendAxis)
        .selectAll("text")
        .style("font-size", "12px")
        .style("fill", "#000");
    
}
