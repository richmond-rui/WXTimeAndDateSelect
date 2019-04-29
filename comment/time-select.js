var dateTimePicker = require('/dateTimePicker.js');
var util = require('/util.js');

Component({
  properties: {
    startYear: Number,
    endYear: Number,
    date: String,
    time: String,
    width:Number,
    height:Number
  },
  data: {
    timeArray: null,
    selTime: null,
  },
  ready() {
 
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    this.setData({
        selTime: obj1.dateTime,
        timeArray: obj1.dateTimeArray
    });
  },
  methods: {
    //确定按钮
    bindMultiPickerChange: function (e) {
      try {
        console.log("bindMultiPickerChange", JSON.stringify(e));
        var arr = e.detail.value;
        var dateArr = this.data.timeArray;

        var newDate = dateArr[0][arr[0]].replace("年", "") + "-" + dateArr[1][arr[1]].replace("月", "") + "-" + dateArr[2][arr[2]].replace("日", "");
        var newTime = dateArr[3][arr[3]] + ":" + dateArr[4][arr[4]];
        this.setData({
          date: newDate,
          time: newTime
        })

        this.triggerEvent("timeSelectEnter",{
          date: newDate,
          time: newTime
        })
      } catch (error) {
        console.log("bindMultiPickerChange错误", JSON.stringify(error));
      }

    },
    //取消按钮
    bindMultiPickerColumnChange: function (e) {
      try {
        var pickerCurrentSel = this.data.pickerCurrentSel;
        var dateArr = this.data.timeArray;
        // console.log(JSON.stringify(e));
        pickerCurrentSel[e.detail.column] = e.detail.value; //column 代表修改的哪一列，value代表那一列修改的值。这一段是用来更新选定的时间

        if (e.detail.column === 0 || e.detail.column === 1) {
          dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][pickerCurrentSel[0]], dateArr[1][pickerCurrentSel[1]]); //不同月份和年，对应的日期不同。此处用来实时刷新
          this.setData({
            timeArray: dateArr
          });
        }
      } catch (error) {
        console.log("bindMultiPickerColumnChange错误", JSON.stringify(error));
      }



      // var arr = this.data.selTime;
      // var dateArr = this.data.timeArray;

      // arr[e.detail.column] = e.detail.value; //column 代表修改的哪一列，value代表那一列修改的值。这一段是用来更新选定的时间

      // dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]); //不同月份和年，对应的日期不同。此处用来实时刷新
      // if(arr[2]>=dateArr[2].length){
      //     arr[2]=dateArr[2].length-1;
      // }
      // this.setData({
      //     timeArray: dateArr,
      //     selTime: arr
      // });
    },
    bindMultiPickerCancel: function (e) {
      this.setTimePickerValue(this.data.date, this.data.time);
    }, setTimePickerValue: function (date, time) {

      var arr = this.data.selTime;
      var dateArr = this.data.timeArray;
     
      dateTimePicker.setDefultTime(dateArr, arr, date, time);
      console.log("arr===",arr);
      this.setData({
        timeArray: dateArr,
        selTime: arr,
        pickerCurrentSel: arr,
      });
    }
  }
})