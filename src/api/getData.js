import fetch from '../config/fetch'

/**
 * 登录相关
 */
export const login = (data) => fetch('/login',data,'POST');
export const checkLogin = () => fetch('/checkLogin');
export const logup = () => fetch('/logup');

/**
 * 注册相关
 */
export const register = (data) => fetch('/register',data,'POST');

/**
 * 获取表格数据
 */
export const getDepartment = () => fetch('/charts/getDepartment');
export const getHospitalRanksByDept = (data) => fetch('/charts/getHospitalRanksByDept',data,'POST');
export const getHospitalRanksData = () => fetch('/charts/getHospitalRanksData');

/**
 * 疾病信息相关
 */
export const getDiseaseList = (data) => fetch('/disease/getDiseaseList',data,'POST');
export const getAllDiseaseList = () => fetch('/disease/getAllDiseaseList');