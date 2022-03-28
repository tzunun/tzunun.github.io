Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/alpha_shape.csv', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }
    
var words = 
['home',
'leader',
'door',
'sound',
'total',
'serious',
'never',
'need',
'officer',
'hospital',
'not',
'either',
'price',
'answer',
'much',
'similar',
'stage',
'receive',
'meet',
'case',
'court',
'despite',
'relationship',
'body',
'listen',
'rather',
'other',
'community',
'clear',
'cover',
'task',
'call',
'against',
'left',
'risk',
'recent',
'course',
'describe',
'measure',
'low',
'but',
'guy',
'walk',
'hard',
'myself',
'bank',
'experience',
'as',
'though',
'career',
'right',
'born',
'difference',
'speak',
'point',
'structure',
'present',
'put',
'lot',
'front',
'office',
'foreign',
'read',
'fast',
'gas',
'Mr',
'international',
'very',
'person',
'seven',
'employee',
'security',
'indeed',
'many',
'happy',
'administration',
'hear',
'rise',
'oil',
'participant',
'natural',
'heart',
'simple',
'card',
'base',
'take',
'which',
'poor',
'rock',
'week',
'than',
'anyone',
'challenge',
'cell',
'grow',
'surface',
'attention',
'appear',
'city',
'wish',
'only',
'use',
'common',
'shoulder',
'one',
'great',
'building',
'question',
'executive',
'win',
'decade',
'go',
'role',
'why',
'example',
'box',
'image',
'campaign',
'ready',
'large']

    var data = [{
        x: unpack(rows, 'x'),
        y: unpack(rows, 'y'),
        z: unpack(rows, 'z'),
        mode: 'text',
        text: words,
        //hoverinfo: w,
        type: 'scatter3d',
        marker: {
          color: 'rgb(23, 100, 100)',
          size: 2
        }
    },{
        alphahull: 7,
        opacity: 0.2,
        type: 'mesh3d',
        x: unpack(rows, 'x'),
        y: unpack(rows, 'y'),
        z: unpack(rows, 'z')
    }];

    var layout = {
        autosize: true,
        height: 900,
        scene: {
            aspectratio: {
                x: 1,
                y: 1,
                z: 1
            },
            camera: {
                center: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                eye: {
                    x: 1.25,
                    y: 1.25,
                    z: 1.25
                },
                up: {
                    x: 0,
                    y: 0,
                    z: 1
                }
            },
            xaxis: {
                type: 'linear',
                zeroline: false
            },
            yaxis: {
                type: 'linear',
                zeroline: false
            },
            zaxis: {
                type: 'linear',
                zeroline: false
            }
        },
        title: '3d word clustering',
        width: 900
    };

    Plotly.newPlot('myDiv', data, layout);

});