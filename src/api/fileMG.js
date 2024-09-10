import axios from 'axios';
import { req } from './axiosFun';
/**
 * 商品管理
 **/
// /user/put-presigned-url
// 获取文件上传签名URL，默认有效期2分钟
export const getFileUrl = (params) => {
  return req("get", "/badge-center-service/user/put-presigned-url", params );
};
// /user/get-presigned-url
// 获取文件外链，默认2小时后过期
export const getFileLink = (params) => {
  return req("get", "/badge-center-service/user/get-presigned-url", params );
};
