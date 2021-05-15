import axios from "axios";

async function beforeRequest(request) {
  return request;
}

async function onError(error) {
  return Promise.reject(error);
}

async function beforeResponse(response) {
  return response;
}

function createHttpClient() {
  const httpClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_DOMAIN_URL}`,
  });
  httpClient.interceptors.request.use(beforeRequest, onError);
  httpClient.interceptors.response.use(beforeResponse, onError);

  return httpClient;
}

export default createHttpClient();
