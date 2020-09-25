var penguinPromise= d3.json("../classData.json");

var successFCN= function(penguins)
{
    console.log("Data Collected", penguins);
    initGraph(penguins);
}

var failFCN= function(errormessage)
{
    console.log("Something Went Wrong",errormessage);
}
penguinPromise.then(successFCN,failFCN);

var finalGrade = function(penguin)
{
    return penguin.final[0].grade
}

var getHomeworkGrade = function(penguin)
{  
    var homeworkGrade = penguin.homework.map(function(homework)
    {
        return homework.grade
    })
    var meanHomeworkGrade = d3.mean(homeworkGrade)
    return meanHomeworkGrade
}

var getQuizMean = function(penguin)
{
    var quizGrade = penguin.quizes.map(function(quiz)
    {
        return quiz.grade
    })
    var meanQuizGrade = d3.mean(quizGrade)
    return meanQuizGrade
}

var initGraph = function(grades)
{
    var screen = {width:"500", height:"500"}
    
    d3.select("#graph")
      .attr("width", screen.width)
      .attr("height", screen.height)
    
    var xScale = d3.scaleLinear()
                    .domain([0, 100])
                    .range([0, screen.width])
    
    var yScale = d3.scaleLinear()
                    .domain([0, 100])
                    .range([screen.height, 0])
    drawPlot(grades, screen, xScale, yScale)
    onClick(grades, screen, xScale, yScale)
    onClick2(grades, screen, xScale, yScale)
}
    
var drawPlot = function(grades, screen, xScale, yScale)
    {   console.log(grades)
        d3.select("#graph")
            .selectAll("circle")
            .data(grades)
            .enter()
            .append("circle")
            .attr("cx", function(grade)
                 {
                    return xScale(finalGrade(grade));
                 })
            .attr("cy", function(grade)
                 {
                    return yScale(getHomeworkGrade(grade));
                 })
            .attr("r", 5)
            .on("mouseenter", function(penguin)
               {
                    var xPos = d3.event.pageX;
                    var yPos = d3.event.pageY;
            
            d3.select("#tooltip")
                .classed("hidden", false)
                .style("top", yPos+"px")
                .style("left", xPos+"px")
            
            d3.select("#penguin")
                .attr("src", "../imgs/"+penguin.picture)
        })
    } 

var drawPlot2 = function(penguins, screen, xScale, yScale)
{
    d3.select("#graph")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx", function(penguin)
         {
            return xScale(finalGrade(penguin));
    })
    .attr("cy", function(penguin)
         {
            return yScale(getHomeworkGrade(penguin));
    })
    .attr("r", 5)
}

var initGraph2 = function(grades)
{
    var screen = {width:"500", height:"500"}
    
    d3.select("#graph")
      .attr("width", screen.width)
      .attr("height", screen.height)
    
    var xScale = d3.scaleLinear()
                    .domain([0, 100])
                    .range([0, screen.width])
    
    var yScale = d3.scaleLinear()
                    .domain([0, 100])
                    .range([screen.height, 0])
    drawPlot2(penguins, screen, xScale, yScale)
}

var onClick = function(penguins, screen, xScale, yScale)
{   
    console.log("Final vs Homework Mean", );
    d3.select("#button1")
        .on("click", function()
    {
      d3.selectAll("svg *")
        .remove()
    return drawPlot2(penguins, screen, xScale, yScale)
    })
}

var drawPlot3 = function(penguins, screen, xScale, yScale)
{
    d3.select("#graph")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx", function(penguin)
         {
            return xScale(getHomeworkGrade(penguin));
    })
    .attr("cy", function(penguin)
         {
            return yScale(getQuizMean(penguin));
    })
    .attr("r", 5)
}

var onClick2 = function(penguins, screen, xScale, yScale)
{   
    console.log("Homework Mean vs Quiz Mean", );
    d3.select("#button2")
        .on("click", function()
    {
      d3.selectAll("svg *")
        .remove()
    return drawPlot3(penguins, screen, xScale, yScale)
    })
}
