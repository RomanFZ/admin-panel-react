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
    const headers: any = {};

    return axios({
      method: method,
      url: url,
      data,
    })
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        console.log("ошибка сервера");
        throw error;
      });
  }
}
