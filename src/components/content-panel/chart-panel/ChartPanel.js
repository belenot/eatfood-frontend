import React, { useContext } from 'react';
import { Grid, makeStyles } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { ResponsiveLine } from '@nivo/line';
import { AppContext } from '../../../App';

function defaultInterval() {
  return {
    start: new Date(),
    end: new Date()
  }
}

function convertToLineChartData(portions=[], interval=defaultInterval()){
  return [
  ]
  return testData; 
}

const useStyles = makeStyles({
  root: {
      height: "50vh"
  }
})

export function ChartPanel() {
  const { state, dispatch } = useContext(AppContext);
  const data = convertToLineChartData(state.portions);
  const interval = {...state.chart.interval};
  const classes = useStyles();
  return (
      <Grid container>
          <Grid container>
              <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker />
                      <KeyboardDatePicker />
                  </MuiPickersUtilsProvider>
              </Grid>
          </Grid>
          <Grid container className={classes.root}>
              <Grid item xs={8}>
              <ResponsiveLine
                  data={data}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                      orient: 'bottom',
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: 'transportation',
                      legendOffset: 36,
                      legendPosition: 'middle'
                  }}
                  axisLeft={{
                      orient: 'left',
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: 'count',
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
      </Grid>
  )
}

var testData = [
    {
      "id": "japan",
      "color": "hsl(285, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 263
        },
        {
          "x": "helicopter",
          "y": 127
        },
        {
          "x": "boat",
          "y": 131
        },
        {
          "x": "train",
          "y": 27
        },
        {
          "x": "subway",
          "y": 63
        },
        {
          "x": "bus",
          "y": 226
        },
        {
          "x": "car",
          "y": 231
        },
        {
          "x": "moto",
          "y": 188
        },
        {
          "x": "bicycle",
          "y": 56
        },
        {
          "x": "horse",
          "y": 66
        },
        {
          "x": "skateboard",
          "y": 286
        },
        {
          "x": "others",
          "y": 214
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(320, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 264
        },
        {
          "x": "helicopter",
          "y": 163
        },
        {
          "x": "boat",
          "y": 94
        },
        {
          "x": "train",
          "y": 280
        },
        {
          "x": "subway",
          "y": 177
        },
        {
          "x": "bus",
          "y": 271
        },
        {
          "x": "car",
          "y": 42
        },
        {
          "x": "moto",
          "y": 282
        },
        {
          "x": "bicycle",
          "y": 32
        },
        {
          "x": "horse",
          "y": 232
        },
        {
          "x": "skateboard",
          "y": 226
        },
        {
          "x": "others",
          "y": 186
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(151, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 190
        },
        {
          "x": "helicopter",
          "y": 8
        },
        {
          "x": "boat",
          "y": 94
        },
        {
          "x": "train",
          "y": 255
        },
        {
          "x": "subway",
          "y": 125
        },
        {
          "x": "bus",
          "y": 105
        },
        {
          "x": "car",
          "y": 182
        },
        {
          "x": "moto",
          "y": 287
        },
        {
          "x": "bicycle",
          "y": 184
        },
        {
          "x": "horse",
          "y": 249
        },
        {
          "x": "skateboard",
          "y": 176
        },
        {
          "x": "others",
          "y": 275
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(257, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 63
        },
        {
          "x": "helicopter",
          "y": 195
        },
        {
          "x": "boat",
          "y": 229
        },
        {
          "x": "train",
          "y": 135
        },
        {
          "x": "subway",
          "y": 27
        },
        {
          "x": "bus",
          "y": 4
        },
        {
          "x": "car",
          "y": 150
        },
        {
          "x": "moto",
          "y": 114
        },
        {
          "x": "bicycle",
          "y": 156
        },
        {
          "x": "horse",
          "y": 80
        },
        {
          "x": "skateboard",
          "y": 84
        },
        {
          "x": "others",
          "y": 272
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(221, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 67
        },
        {
          "x": "helicopter",
          "y": 213
        },
        {
          "x": "boat",
          "y": 259
        },
        {
          "x": "train",
          "y": 135
        },
        {
          "x": "subway",
          "y": 223
        },
        {
          "x": "bus",
          "y": 0
        },
        {
          "x": "car",
          "y": 253
        },
        {
          "x": "moto",
          "y": 118
        },
        {
          "x": "bicycle",
          "y": 77
        },
        {
          "x": "horse",
          "y": 13
        },
        {
          "x": "skateboard",
          "y": 89
        },
        {
          "x": "others",
          "y": 111
        }
      ]
    }
  ]