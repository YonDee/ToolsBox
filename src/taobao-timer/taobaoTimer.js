import React from 'react';
import axios from 'axios';
import './taobaoTimer.css';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      taobaoTime: '',
      taobaoTimeString: '',
      timer: 1000,
      errorDisplay: false
    };
    // methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.parseTimer = this.parseTimer.bind(this);
  }

  componentDidMount(){
    // this.setTimer(1000)
  }

  componentWillUnmount(){
    clearInterval(this.timerID)
  }

  setTimer(time){
    this.timerID = setInterval(() => {
      axios.post('/taobao/rest/api3.do?api=mtop.common.getTimestamp')
        .then(res => {
          this.setState({
            taobaoTime: res.data.data.t,
            taobaoTimeString: this.handleDate(res.data.data.t)
          });
        })
        .catch(error => {
          console.log(error)
        })
    }, time);
  }

  handleChange(event){
    this.state.errorDisplay = !event.target.value;
    this.setState({
      timer: event.target.value
    })
  }

  handleSubmit(event){
    clearInterval(this.timerID);
    this.setTimer(this.state.timer);
    event.preventDefault();
  }

  parseTimer(){
    clearInterval(this.timerID);
  }

  handleDate(time){
    if(time){
      let date = new Date(parseInt(time));
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = date.getDate() + ' ';
      let h = date.getHours() + ':';
      let m = date.getMinutes() + ':';
      let s = date.getSeconds() + ':';
      let mi = date.getMilliseconds();
      return (Y + M + D + h + m + s + mi)
    }
  }

  render(){
    return (
      <div className="App">
        <div>
          <b>淘宝时间：</b>
          <div>
            {this.state.taobaoTime}
          </div>
          <div>
            {this.state.taobaoTimeString}
          </div>
        </div>
        <div>
          <label>
            <div>设置请求频率（单位：毫秒）:</div>
            <div>
              <input type="text" value={this.state.timer} onChange={this.handleChange} />
            </div>
            <span style={{display: !this.state.errorDisplay && 'none'}}>请求时间不可以为空(0)</span>
          </label>
          <button onClick={this.handleSubmit}>开始</button>
          <button onClick={this.parseTimer}>暂停时间请求</button>
        </div>
        <hr />
        <div><b>标准时间：</b>{this.state.date.getTime()}</div>
      </div>
    )
  }
}

export default App;
