// miniprogram/pages/hitCard/index.js
Page({

     /**
      * 页面的初始数据
      */
     data: {
          imgsrc: "../../images/left.png",
          currentDate: "",
          weeks: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          days: [],
          blockDays: [],
          eachWidth: "",
          currentYear: "",
          currentMonth: "",
          currentDay: "",
          currentIndex:"",
          daytextWidth:""
     },

     /**
      * 设置宽度
      */
     setWidth: function() {
          var that = this;
          var pageWidth = wx.getSystemInfoSync().windowWidth;
          that.setData({
               eachWidth: (pageWidth - 10) / 7 + 'px',
               daytextWidth: (pageWidth - 10) / 14 +'px'
          })
     },
     //设置头部日期
     setCurrentDay: function(thisDate) {
          var that = this;
          var currentY = thisDate.getFullYear();
          var currentM = thisDate.getMonth() + 1;
          var currentD = thisDate.getDate();
          that.setData({
               currentYear: currentY,
               currentMonth: currentM,
               currentDay: currentD
          })
     },
     isRunNian: function(_year) {
          if (_year % 400 === 0 || (_year % 4 === 0 && _year % 100 !== 0)) {
               return true;
          } else {
               return false;
          }
     },

     dayClick: function(e) {
          var that = this;
          var tapFlag = e.currentTarget.dataset.tap;
          var eDate = e.currentTarget.dataset.date;
          var eDay = e.currentTarget.dataset.day;
          var eIndex = e.currentTarget.dataset.index;
          if(tapFlag){
               var preActiveName = 'days[' + that.data.currentIndex + '].active';
               var currentActiveName = 'days[' + eIndex + '].active';
               var currentCardName = 'days[' + eIndex + '].isCard';

               that.setData({
                    currentDay:eDay,
                    currentIndex: eIndex,
                    [preActiveName]: false,
                    [currentActiveName]: true,
                    [currentCardName]: true
               })
          }else{
               return false;
          }
          

     },
     getDaysOfEveryMonth: function(y,m) { //返回天数
          var that = this;
          var baseMonthsDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //各月天数
          var thisYear = y; //今年
          var thisMonth = m; //今月
          var thisMonthDays = []; //这个月有多少天,用于返回echarts用
          //判断是闰年吗？闰年2月29天
          function isRunYear(fullYear) {
               return (fullYear % 4 == 0 && (fullYear % 100 != 0 || fullYear % 400 == 0));
          }

          function getThisMonthDays(days) { //传天数，返天数数组
               var arr = [];
               for (var i = 1; i <= days; i++) {
                    if(i<=9){
                         arr.push('0'+i);
                    }else{
                         arr.push(i);
                    }
                    
               }
               return arr;
          }

          if (isRunYear(thisYear) && thisMonth == 1) { //闰年2月29天
               thisMonthDays = getThisMonthDays(baseMonthsDay[thisMonth] + 1);
          } else {
               thisMonthDays = getThisMonthDays(baseMonthsDay[thisMonth]);
          }
          var daysArr = [];
          for (var i = 0; i < thisMonthDays.length;i++){
               var dayObj = {};
               if (thisMonthDays[i] === that.data.currentDay){
                    dayObj={
                         active:true,
                         day: thisMonthDays[i],
                         isCard:true,
                         canTap:true,
                         isFinish:false
                    };
                    that.setData({
                         currentIndex:i
                    })
               } else if (thisMonthDays[i] < that.data.currentDay){
                    dayObj = {
                         active: false,
                         day: thisMonthDays[i],
                         isCard: false,
                         canTap: true,
                         isFinish: false
                    }  
               } else if (thisMonthDays[i] > that.data.currentDay){
                    dayObj = {
                         active: false,
                         day: thisMonthDays[i],
                         isCard: false,
                         canTap: false,
                         isFinish: false
                    } 
               }
               daysArr.push(dayObj);
          }
          // return thisMonthDays;
          that.setData({
               days: daysArr
          })
     },

     /**
      * 获取一号是周几
      */
     firstDayWeek: function(year, month) {
          var that = this;
          var d = new Date();
          d.setYear(year);
          d.setMonth(month - 1);
          d.setDate(1);
          var blackArr = [];
          for (var i = 0; i < d.getDay()-1;i++){
               blackArr.push(i);
          }
          that.setData({
               blockDays:blackArr
          })
     },




     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function(options) {
          var that = this;
          var today = new Date();
          that.setWidth();
          that.setCurrentDay(today);
          that.getDaysOfEveryMonth(today.getFullYear(),today.getMonth());
          that.firstDayWeek(that.data.currentYear,that.data.currentMonth)
     },

     /**
      * 生命周期函数--监听页面初次渲染完成
      */
     onReady: function() {

     },

     /**
      * 生命周期函数--监听页面显示
      */
     onShow: function() {

     },

     /**
      * 生命周期函数--监听页面隐藏
      */
     onHide: function() {

     },

     /**
      * 生命周期函数--监听页面卸载
      */
     onUnload: function() {

     },

     /**
      * 页面相关事件处理函数--监听用户下拉动作
      */
     onPullDownRefresh: function() {

     },

     /**
      * 页面上拉触底事件的处理函数
      */
     onReachBottom: function() {

     },

     /**
      * 用户点击右上角分享
      */
     onShareAppMessage: function(res) {
          return {
               title:"自定义",
               path:"/pages/hitCard/index"
          }
     }
})