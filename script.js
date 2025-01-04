const educationDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const countryDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

const width = 960;
const height = 600;

const colorRange = ["#f0f0f0", "#d0e0e0", "#a0c0c0", "#70a0a0", "#409080"];

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
    });

function drawMap(countryData, educationData) {

    const colorScale = d3.scaleQuantize()
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