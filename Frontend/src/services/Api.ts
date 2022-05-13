import axios from "axios";

import { Reception, SelectedReception } from "../tsTypes/interfaces";

import { url } from "../collections";

const HttpMethods = {
  GET: "get",
  POST: "post",
  PATCH: "patch",
  DELETE: "delete",
};

const defaultUrl: string | undefined = url;

export class Api {
  static token: string | null = localStorage.getItem("token");
  static refreshToken: string | null = localStorage.getItem("refreshToken");

  static setToken() {
    this.token = localStorage.getItem("token");
    this.refreshToken = localStorage.getItem("refreshToken");
  }

  static clearToken() {
    this.token = null;
    this.refreshToken = null;
  }

  static async get(url: string, data?: string) {
    return this.makeRequest(HttpMethods.GET, url, data);
  }

  static async post(url: string, data?: any) {
    return this.makeRequest(HttpMethods.POST, url, data);
  }

  static async patch(url: string, data?: SelectedReception) {
    return this.makeRequest(HttpMethods.PATCH, url, data);
  }

  static async delete(url: string, data?: Reception) {
    return this.makeRequest(HttpMethods.DELETE, url, data);
  }

  private static makeRequest(method: any, url: string, data: any = {}) {
    this.setToken();
    const headers: any = {}; //Todo
    if (this.token) headers["access-token"] = this.token;
    if (this.refreshToken) headers["refresh-token"] = this.refreshToken;

    return axios({
      method: method,
      url: url,
      headers,
      data,
    })
      .then((result: any) => {
        return result;
      })
      .catch(async (error) => {
        this.clearToken();
        localStorage.clear();
        console.log("ошибка с бэка");
        if (error.response.status === 405) {
          console.log("ошибка с бэка 405");
          throw error;
        }
        // if (error.response.status === 401) {
        //   this.makeRequest(
        //     HttpMethods.POST,
        //     `${defaultUrl}/verifyRefreshToken`,
        //     data
        //   )
        //     .then((result: any) => {
        //       localStorage.setItem("token", result.data.newAccessToken);
        //       localStorage.setItem("refreshToken", result.data.newRefreshToken);
        //       return result;
        //     })
        //     .catch((error) => {
        //       this.clearToken();
        //       localStorage.clear();
        //       throw error;
        //     });
        // window.location.reload(); // Todo без перезагрузки все ломается
        // }
      });
  }
}
