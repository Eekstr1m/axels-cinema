import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import type { RefreshTokenResponse } from "../interfaces/auth.interface";
import { clearCredentials, setCredentials } from "../redux/authSlice";
import { store } from "../redux/store";

export const authInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  let isRefreshing = false;
  let refreshQueue: Array<(token: string | null) => void> = [];

  function resolveQueue(token: string | null) {
    refreshQueue.forEach((callback) => callback(token));
    refreshQueue = [];
  }

  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const originalConfig = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            refreshQueue.push((token) => {
              if (!token) return reject(error);
              originalConfig.headers = originalConfig.headers ?? {};
              originalConfig.headers.Authorization = `Bearer ${token}`;
              resolve(instance.request(originalConfig));
            });
          });
        }

        isRefreshing = true;
        try {
          const refreshResponse: AxiosResponse<RefreshTokenResponse> =
            await instance.post("/auth/refresh");
          const newAccessToken = refreshResponse.data.accessToken;
          if (!newAccessToken) throw error;

          store.dispatch(setCredentials({ accessToken: newAccessToken }));
          resolveQueue(newAccessToken);

          originalConfig.headers = originalConfig.headers ?? {};
          originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;

          return instance.request(originalConfig);
        } catch (error) {
          resolveQueue(null);
          store.dispatch(clearCredentials());
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};
