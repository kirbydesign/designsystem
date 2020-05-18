import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-chart-example-timeseries',
  template: `<kirby-card>
  <kirby-card-header title="Timeseries"></kirby-card-header>
  <kirby-chart
    [height]="240"
    type="timeseries"
    description="Accessibility description goes here"
    [data]="rates"
    [breaks]="breaks"
  >
  </kirby-chart>
</kirby-card>`,
};
@Component({
  selector: config.selector,
  template: config.template,
})
export class ChartExampleTimeseriesComponent {
  template = config.template;
  breaks = [
    {
      from: 1198914890000,
      to: 1199232000000,
      breakSize: 0,
    },
  ];

  rates = [
    [1198914890000, 0.6809],
    [1199232000000, 0.6809],
    [1199318400000, 0.6779],
    [1199404800000, 0.6791],
    [1199664000000, 0.6793],
    [1199750400000, 0.6801],
    [1199836800000, 0.6813],
    [1199923200000, 0.6821],
    [1200009600000, 0.6761],
    [1200268800000, 0.6715],
    [1200355200000, 0.6719],
    [1200441600000, 0.6761],
    [1200528000000, 0.6808],
    [1200614400000, 0.6816],
    [1200873600000, 0.6906],
    [1200960000000, 0.69],
    [1201046400000, 0.6863],
    [1201132800000, 0.6821],
    [1201219200000, 0.6801],
    [1201478400000, 0.6778],
    [1201564800000, 0.677],
    [1201651200000, 0.6753],
    [1201737600000, 0.6726],
    [1201824000000, 0.6717],
    [1202083200000, 0.6745],
    [1202169600000, 0.6809],
    [1202256000000, 0.684],
    [1202342400000, 0.6865],
    [1202428800000, 0.6891],
    [1202688000000, 0.6878],
    [1202774400000, 0.688],
    [1202860800000, 0.6857],
    [1202947200000, 0.6838],
    [1203033600000, 0.6816],
    [1203292800000, 0.6833],
    [1203379200000, 0.6784],
    [1203465600000, 0.6824],
    [1203552000000, 0.6787],
    [1203638400000, 0.6736],
    [1203897600000, 0.675],
    [1203984000000, 0.6724],
    [1204070400000, 0.6648],
    [1204156800000, 0.6614],
    [1204243200000, 0.6594],
    [1204502400000, 0.6579],
    [1204588800000, 0.6577],
    [1204675200000, 0.6582],
    [1204761600000, 0.6529],
    [1204848000000, 0.6487],
    [1205107200000, 0.652],
    [1205193600000, 0.6503],
    [1205280000000, 0.6462],
    [1205366400000, 0.6421],
    [1205452800000, 0.6427],
    [1205712000000, 0.6342],
    [1205798400000, 0.6342],
    [1205884800000, 0.6374],
    [1205971200000, 0.6485],
    [1206057600000, 0.6485],
    [1206316800000, 0.6485],
    [1206403200000, 0.6424],
    [1206489600000, 0.6366],
    [1206576000000, 0.6336],
    [1206662400000, 0.6332],
    [1206921600000, 0.6325],
    [1207008000000, 0.6387],
    [1207094400000, 0.6398],
    [1207180800000, 0.6442],
    [1207267200000, 0.6362],
    [1207526400000, 0.6373],
    [1207612800000, 0.6373],
    [1207699200000, 0.636],
    [1207785600000, 0.63],
    [1207872000000, 0.6317],
    [1208131200000, 0.6303],
    [1208217600000, 0.6319],
    [1208304000000, 0.6279],
    [1208390400000, 0.6301],
    [1208476800000, 0.6338],
    [1208736000000, 0.6291],
    [1208822400000, 0.6278],
    [1208908800000, 0.6275],
    [1208995200000, 0.6343],
    [1209081600000, 0.6413],
    [1209340800000, 0.64],
    [1209427200000, 0.6423],
    [1209513600000, 0.6436],
    [1209600000000, 0.6436],
    [1209686400000, 0.647],
    [1209945600000, 0.6469],
    [1210032000000, 0.6441],
    [1210118400000, 0.6482],
    [1210204800000, 0.6517],
    [1210291200000, 0.647],
    [1210550400000, 0.6482],
    [1210636800000, 0.6464],
    [1210723200000, 0.6478],
    [1210809600000, 0.6463],
    [1210896000000, 0.6453],
    [1211155200000, 0.6421],
    [1211241600000, 0.6395],
    [1211328000000, 0.6349],
    [1211414400000, 0.6348],
    [1211500800000, 0.6353],
    [1211760000000, 0.6346],
    [1211846400000, 0.6346],
    [1211932800000, 0.6388],
    [1212019200000, 0.6431],
    [1212105600000, 0.6449],
    [1212364800000, 0.6444],
    [1212451200000, 0.6414],
    [1212537600000, 0.6467],
    [1212624000000, 0.6494],
    [1212710400000, 0.6412],
    [1212969600000, 0.6337],
    [1213056000000, 0.6442],
    [1213142400000, 0.6446],
    [1213228800000, 0.6487],
    [1213315200000, 0.6522],
    [1213574400000, 0.647],
    [1213660800000, 0.6462],
    [1213747200000, 0.6456],
    [1213833600000, 0.6461],
    [1213920000000, 0.6407],
    [1214179200000, 0.6444],
    [1214265600000, 0.6424],
    [1214352000000, 0.6412],
    [1214438400000, 0.6358],
    [1214524800000, 0.6351],
    [1214784000000, 0.6345],
    [1214870400000, 0.634],
    [1214956800000, 0.6328],
    [1215043200000, 0.6296],
    [1215129600000, 0.6382],
    [1215388800000, 0.639],
    [1215475200000, 0.6376],
    [1215561600000, 0.6364],
    [1215648000000, 0.6367],
    [1215734400000, 0.6316],
    [1215993600000, 0.6311],
    [1216080000000, 0.6255],
    [1216166400000, 0.6295],
    [1216252800000, 0.6311],
    [1216339200000, 0.6324],
    [1216598400000, 0.6307],
    [1216684800000, 0.6283],
    [1216771200000, 0.6354],
    [1216857600000, 0.638],
    [1216944000000, 0.6357],
    [1217203200000, 0.6352],
    [1217289600000, 0.6368],
    [1217376000000, 0.6416],
    [1217462400000, 0.6407],
    [1217548800000, 0.6422],
    [1217808000000, 0.6425],
    [1217894400000, 0.6458],
    [1217980800000, 0.6462],
    [1218067200000, 0.6465],
    [1218153600000, 0.6635],
    [1218412800000, 0.6662],
    [1218499200000, 0.6709],
    [1218585600000, 0.6711],
    [1218672000000, 0.6709],
    [1218758400000, 0.679],
    [1219017600000, 0.6802],
    [1219104000000, 0.6814],
    [1219190400000, 0.6788],
    [1219276800000, 0.6751],
    [1219363200000, 0.6754],
    [1219622400000, 0.6773],
    [1219708800000, 0.6851],
    [1219795200000, 0.6773],
    [1219881600000, 0.6771],
    [1219968000000, 0.6788],
    [1220227200000, 0.684],
    [1220313600000, 0.689],
    [1220400000000, 0.6926],
    [1220486400000, 0.6903],
    [1220572800000, 0.702],
    [1220832000000, 0.7036],
    [1220918400000, 0.7071],
    [1221004800000, 0.7096],
    [1221091200000, 0.7178],
    [1221177600000, 0.711],
    [1221436800000, 0.7068],
    [1221523200000, 0.701],
    [1221609600000, 0.7031],
    [1221696000000, 0.6897],
    [1221782400000, 0.7025],
    [1222041600000, 0.6864],
    [1222128000000, 0.6789],
    [1222214400000, 0.6808],
    [1222300800000, 0.6804],
    [1222387200000, 0.6832],
    [1222646400000, 0.697],
    [1222732800000, 0.6993],
    [1222819200000, 0.7103],
    [1222905600000, 0.7194],
    [1222992000000, 0.723],
    [1223251200000, 0.7336],
    [1223337600000, 0.7337],
    [1223424000000, 0.7284],
    [1223510400000, 0.731],
    [1223596800000, 0.7365],
    [1223856000000, 0.7333],
    [1223942400000, 0.7273],
    [1224028800000, 0.734],
    [1224115200000, 0.7405],
    [1224201600000, 0.7461],
    [1224460800000, 0.745],
    [1224547200000, 0.7586],
    [1224633600000, 0.7787],
    [1224720000000, 0.7807],
    [1224806400000, 0.794],
    [1225065600000, 0.8027],
    [1225152000000, 0.7984],
    [1225238400000, 0.7832],
    [1225324800000, 0.7673],
    [1225411200000, 0.784],
    [1225670400000, 0.78],
    [1225756800000, 0.7801],
    [1225843200000, 0.7771],
    [1225929600000, 0.7832],
    [1226016000000, 0.784],
    [1226275200000, 0.7758],
    [1226361600000, 0.7846],
    [1226448000000, 0.7982],
    [1226534400000, 0.7985],
    [1226620800000, 0.7891],
    [1226880000000, 0.79],
    [1226966400000, 0.7904],
    [1227052800000, 0.7916],
    [1227139200000, 0.7974],
    [1227225600000, 0.7936],
    [1227484800000, 0.783],
    [1227571200000, 0.7807],
    [1227657600000, 0.7732],
    [1227744000000, 0.7753],
    [1227830400000, 0.7858],
    [1228089600000, 0.7932],
    [1228176000000, 0.7877],
    [1228262400000, 0.7923],
    [1228348800000, 0.7925],
    [1228435200000, 0.7897],
    [1228694400000, 0.7781],
    [1228780800000, 0.779],
    [1228867200000, 0.7738],
    [1228953600000, 0.7568],
    [1229040000000, 0.7497],
    [1229299200000, 0.7403],
    [1229385600000, 0.7306],
    [1229472000000, 0.7114],
    [1229558400000, 0.6843],
    [1229644800000, 0.7175],
    [1229904000000, 0.7159],
    [1229990400000, 0.7155],
    [1230076800000, 0.7141],
    [1230163200000, 0.7141],
    [1230249600000, 0.7141],
    [1230508800000, 0.7009],
    [1230595200000, 0.7094],
    [1230681600000, 0.7186],
    [1230768000000, 0.7186],
    [1230854400000, 0.7213],
    [1231113600000, 0.7364],
    [1231200000000, 0.7502],
    [1231286400000, 0.7357],
    [1231372800000, 0.7345],
  ];
}
