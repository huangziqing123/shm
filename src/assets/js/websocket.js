
import { Message } from 'element-ui'

var url = "ws://"+location.host+'/user?token=12138'
// "ws://"+location.host+'/user?token=12138
var websock = null
var tt;
let messageCallback = null
let errorCallback = null
var lockReconnect = false;//避免重复连接
var globalCallback = null;
var status_globalCallback = null;
var data1 = []
function webSocketOnMessage(e) {
  var str = JSON.parse(e.data)
  globalCallback(str);
  if (status_globalCallback !== null){
    status_globalCallback(str);
    
  }

}

function websocketSend(agentData) {
  // 加延迟是为了尽量让ws连接状态变为OPEN  
  setTimeout(() => {
    // 添加状态判断，当为OPEN时，发送消息
    if (websock.readyState === websock.OPEN) { // websock.OPEN = 1
      // 发给后端的数据需要字符串化
      websock.send(JSON.stringify(agentData))
    }
    if (websock.readyState === websock.CLOSED) { // websock.CLOSED = 3
      console.log('websock.readyState=3')

      errorCallback()
    }
  }, 500)
}

// 关闭ws连接
function websocketclose(e) {
  // e.code === 1000  表示正常关闭。 无论为何目的而创建, 该链接都已成功完成任务。
  // e.code !== 1000  表示非正常关闭。
  if (e && e.code !== 1000) {
    Message.error('ws连接异常，请稍候重试')
    errorCallback()
  }
}
// 建立ws连接
function websocketOpen(e) {
  // console.log('ws连接成功')
}

// 初始化weosocket
function initWebSocket() {
  if (typeof (WebSocket) === 'undefined') {
    Message.error('您的浏览器不支持WebSocket，无法获取数据')
    return false
  }
  console.log("new websocet")

  websock = new WebSocket(url)

  websock.onmessage = function (e) {
    if(e!=undefined){

      webSocketOnMessage(e);
    }
  }
  websock.onopen = function () {
    websocketOpen()
  }
  websock.onerror = function () {
    Message.error('ws连接异常，请稍候重试')
    errorCallback()
  }
  websock.onclose = function (e) {
    websocketclose(e)
  }
}

/**
 * 发起websocket请求函数
 * @param {string} url ws连接地址
 * @param {Object} agentData 传给后台的参数
 * @param {function} successCallback 接收到ws数据，对数据进行处理的回调函数
 * @param {function} errCallback ws连接错误的回调函数
 */

export function setStatusCallBackFun(callback) {
  status_globalCallback = callback;
}

export function sendWebsocket(agentData, callback) {
  if (!websock) {
    initWebSocket()

  }
  globalCallback = callback;
  websocketSend(agentData)

  websock.onmessage()
}
export function getdata(callback) {
  if (!websock) {
    initWebSocket()

  }
  globalCallback = callback;
  //websock.onmessage()
}
/**
 * 关闭websocket函数
 */
export function getmessage() {
  websock.onmessage(e)
  var str = JSON.parse(e.data)
  return str

}
export default {
  initWebSocket,
  websock
}
export function closeWebsocket() {
  if (websock) {
    console.log("断开连接")
    websock.close() // 关闭websocket
    websock.onclose() // 关闭websocket
  }
}