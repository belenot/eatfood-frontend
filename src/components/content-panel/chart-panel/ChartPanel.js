import React, { useContext } from 'react';
import { Grid, makeStyles } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { ResponsiveLine } from '@nivo/line';
import { AppContext } from '../../../App';
import { isWithinInterval, format } from 'date-fns';
import { isAfter } from 'date-fns/esm';

function defaultInterval() {
  const today = new Date();
  return {
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
  }
}

function convertToLineChartData(portions=[], interval=defaultInterval()){
  const dateFormat = 'yyyy-MM-dd'
  portions = portions
    .filter(portion=>isWithinInterval(portion.time, interval))
    .sort((portion1, portion2)=>isAfter(portion1.time, portion2.time))
    .map(portion=>({ ...portion, time: format(portion.time, dateFormat) }))
    .reduce((ac, portion) => {
      let { kcal, prot, carb, fat } = portion.food;
      const gram = portion.gram;
      kcal = Number(Number(ac[portion.time]&&ac[portion.time].kcal||0)+kcal * gram / 100).toFixed(2);
      prot = Number(Number(ac[portion.time]&&ac[portion.time].prot||0)+prot * gram / 100).toFixed(2);
      carb = Number(Number(ac[portion.time]&&ac[portion.time].carb||0)+carb * gram / 100).toFixed(2);
      fat = Number(Number(ac[portion.time]&&ac[portion.time].fat||0)+fat * gram / 100).toFixed(2);
      return ({ ...ac, [portion.time]: { kcal, prot, carb, fat } });
    }, {})
  return [
    {
      id: "Calories",
      data: Object.keys(portions).map(key=>({
        x: key,
        y: portions[key].kcal
      }))
    },
    {
      id: "Protein",
      data: Object.keys(portions).map(key=>({
        x: key,
        y: portions[key].prot
      }))
    },
    {
      id: "Carbohydrate",
      data: Object.keys(portions).map(key=>({
        x: key,
        y: portions[key].carb
      }))
    },
    {
      id: "Fat",
      data: Object.keys(portions).map(key=>({
        x: key,
        y: portions[key].fat
      }))
    }
  ]
}

const useStyles = makeStyles({
  chart: {
      height: "11vh",
      marginBottom: "20px"
  }
})

export function ChartPanel() {
  const { state, dispatch } = useContext(AppContext);
  const interval = {...(state.chart.interval||defaultInterval())};
  const data = convertToLineChartData(state.portions, interval);
  console.log(data);
  const classes = useStyles();
  function handleDateChange(key, date) {
    
      dispatch({type: "CHANGE_CHART_DATE_INTERVAL", payload: { interval: { ...interval, [key]: date} } });
  }
  return (
      <Grid container>
          <Grid container>
              <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    {['start', 'end'].map(key=>
                        <KeyboardDatePicker key={key}
                        format="dd-MMM-yyyy"
                        onChange={date=>handleDateChange(key, date)}
                        value={interval[key]}
                      />
                      )}
                  </MuiPickersUtilsProvider>
              </Grid>
          </Grid>
          {data.map((dataSet, index) => (
          <Grid container key={index} className={classes.chart}>
              <Grid item xs={8}>
              <ResponsiveLine
                  data={[data[index]]}
                  margin={{ top: 10, right: 110, bottom: 10, left: 60 }}
                  // margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
                  // xScale={{ type: 'linear' , min: 'auto', max: 'auto'}}
                  xScale={{type: 'time', format: '%Y-%m-%d', precision: 'day'}}
                  xFormat="time:%Y-%m-%d"
                  yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    format: '%b %d',
                    tickValues: 'every 2 days',
                    legend: 'time',
                    legendOffset: -12
                  }}
                  axisLeft={{
                      orient: 'left',
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: 'amount',
                      legendOffset: -40,
                      legendPosition: 'middle'
                  }}
                  colors={{ scheme: 'nivo' }}
                  pointSize={10}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  pointLabel="y"
                  pointLabelYOffset={-12}
                  useMesh={true}
                  legends={[
                      {
                          anchor: 'bottom-right',
                          direction: 'column',
                          justify: false,
                          translateX: 100,
                          translateY: 0,
                          itemsSpacing: 0,
                          itemDirection: 'left-to-right',
                          itemWidth: 80,
                          itemHeight: 20,
                          itemOpacity: 0.75,
                          symbolSize: 12,
                          symbolShape: 'circle',
                          symbolBorderColor: 'rgba(0, 0, 0, .5)',
                          effects: [
                              {
                                  on: 'hover',
                                  style: {
                                      itemBackground: 'rgba(0, 0, 0, .03)',
                                      itemOpacity: 1
                                  }
                              }
                          ]
                      }
                  ]}
              />  
              </Grid>
          </Grid>
          ))}
      </Grid>
  )
}