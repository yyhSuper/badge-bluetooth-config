import axios from 'axios';
import { loginreq, req } from './axiosFun';

// 登录接口
export const login = (params) => { return loginreq("post", "/ams-service/login", params) };


