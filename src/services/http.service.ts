import { ErrorAPI } from "../models";
import { getEnvironments, getLocalStorage } from "../utils";

const { VITE_BASE_URL_WITH_API, VITE_BASE_URL_WITHOUT_API } = getEnvironments();

type HttpType = {
  url: string;
  data?: any;
  method?: string;
  urlWithApi?: boolean;
  isPrivate?: boolean;
};

type HeadersTypes = {
  "Content-Type": string;
  accept: string;
  Authorization?: string;
};

type CustomErrorType = {
  messageText: string;
  response: unknown;
  error: any;
  statusCode: number;
  status: string;
  titleText: string;
};

const getHeaders = (isPrivate: boolean | undefined) => {
  const getToken = isPrivate ? getLocalStorage("USER_TK") : null;

  const headers: HeadersTypes = {
    "Content-Type": "application/json",
    accept: "application/json",
  };

  if (getToken?.userToken) {
    headers.Authorization = `Bearer ${getToken.userToken}`;
  }

  return headers;
};

const sendDataToAPI = async ({
  url,
  data,
  method,
  urlWithApi,
  isPrivate,
}: HttpType) => {
  try {
    const controller = new AbortController();

    const endpointHasApi = urlWithApi
      ? VITE_BASE_URL_WITH_API
      : VITE_BASE_URL_WITHOUT_API;

    setTimeout(() => {
      controller.abort();
    }, 5000);

    const response = await fetch(`${endpointHasApi}${url}`, {
      method,
      headers: getHeaders(isPrivate),
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    return handleResponse(response);
  } catch (error) {
    console.error("ERROR", error);

    const customError: CustomErrorType = {
      messageText:
        "Error processing the request. Please try again later or contact administrator",
      response: (error as any).response,
      error,
      status: "ERROR",
      statusCode: 500,
      titleText:
        (error as any).name === "AbortError"
          ? "Service is not available"
          : "Internal Error",
    };
    const response = customError;
    return handleError(response);
  }
};

const handleError = async (response: any) => {
  // TODO: COMPLETAR manejo errores cuando la API lo tenga

  if (response.status >= 400 && response.status < 500) {
    const error = await response.json();

    return {
      status: "ERROR",
      titleText: "An error ocurred",
      messageText: error.message.split(":")[1].trim(),
      statusCode: response.status,
    };
  }

  if (response.status >= 500)
    return {
      status: "ERROR",
      titleText: response.titleText,
      statusCode: 500,
      messageText: response.messageText,
    };

  // response.status >= 500 -> "internal error"
  // response.status >= 400 y < 500 -> "error comunicating with API "
};

const handleResponse = (response: any) => {
  if (response.status >= 400) return handleError(response);

  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  return response.json();
};

const adaptingReponseByStatus = (data: any) => {
  const adaptingData = {
    status: data.Status,
    ...data,
  };

  if ("Status" in data) {
    delete adaptingData.Status;
    return adaptingData;
  }

  return data;
};

const useFetchService = {
  get: async ({ url, urlWithApi, isPrivate = false }: HttpType) => {
    const endpointHasApi = urlWithApi
      ? VITE_BASE_URL_WITH_API
      : VITE_BASE_URL_WITHOUT_API;

    const response = await fetch(`${endpointHasApi}${url}`, {
      headers: getHeaders(isPrivate),
    });
    return handleResponse(response);
  },
  post: async ({ url, data, urlWithApi, isPrivate = false }: HttpType) => {
    console.log("POST", { url, data, urlWithApi, isPrivate });

    const response = await sendDataToAPI({
      url,
      data,
      method: "POST",
      urlWithApi,
      isPrivate,
    });

    console.log("response en POST", response);

    if (response.Status !== "SUCCESS") {
      const messageText =
        response?.message || response?.messageText || response?.Status || null;
      const titleText = response?.titleText || null;
      const statusCode = response?.statusCode || null;
      return new ErrorAPI({ messageText, titleText, statusCode });
    }

    return adaptingReponseByStatus(response);
  },
  put: async ({ url, data, urlWithApi, isPrivate = false }: HttpType) => {
    const response = await sendDataToAPI({
      url,
      data,
      method: "PUT",
      urlWithApi,
      isPrivate,
    });
    return response;
  },
};

const http = {
  get: useFetchService.get,
  post: useFetchService.post,
  put: useFetchService.put,
};

export default http;
