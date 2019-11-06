import Vue from 'vue';
import {baseUrl} from './env'

/**
 * @params url 访问Mapping
 * @params data 提交数据
 * @params type 提交方式（主要用于区分是否有数据提交）
 * @params Authorization 是否需要登录验证
 */
export default async (url = '', data = {}, type = 'GET', Authorization=false)=>{
  type = type.toUpperCase();
  url = baseUrl + url;
  // console.log(url);
  // console.log(data);
  // console.log(type);
  var result = null;
  
  switch(type){
    case 'GET':
      // 请求数据
      await Vue.http.get(url).then(response=>{
        // console.log(response);
        result = response.body;
      },error=>{
        console.log(error);
        // throw new Error(error);
      })
    break;
    case 'POST':
      // 提交数据，返回结果
      // data = JSON.stringify(data);
      // console.log(data)
      if(Authorization){
        var loginToken = Vue.$store.state.token;
        var secret = Vue.$store.state.tokenSecret;
        await Vue.http.post(url, data, {
          emulateJSON: true,
          headers:{
            Authorization: loginToken,
            tokenSecret: secret
          }
        }).then(response=>{
          result = response.body;
        },error=>{
          console.log(error)
          // throw new Error(error);
        })
      }else{
        await Vue.http.post(url, data, {emulateJSON: true}).then(response=>{
          result = response.body;
        },error=>{
          console.log(error)
          // throw new Error(error);
        })
      }
    break;
  }

  // console.log(result);
  return result;

  
}