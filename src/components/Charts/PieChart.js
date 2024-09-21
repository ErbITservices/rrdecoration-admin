import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto' // this is required to use charts
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  flex: 1;
  background-color: white;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  padding: 1rem;
  margin: 0;
`

const Title = styled.h2`
  font-size: 1rem;
`


const PieChart = ({data, title}) => {
  console.log({data})
  const [chartData, setChartData] = useState({
    labels: data.map(d => d.title),
    datasets: [{
      label: "Purchase Count",
      data: data.map(d => d.purchasedCount),
      backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 141, 153, 0.6)',
          'rgba(77, 109, 243, 0.6)',
          'rgba(238, 130, 238, 0.6)',
          'rgba(64, 224, 208, 0.6)',
        ],
      hoverBorderWidth: 1,
      hoverBorderColor: '#000'
    }]
  });

  return (
    <Container>
      <Title>{title}</Title>
      <Pie data={chartData} />    
    </Container>
  );
};

export default PieChart;
