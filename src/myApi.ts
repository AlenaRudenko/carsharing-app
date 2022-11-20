/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface City {
  id: string;
  name: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface CreateCityDto {
  name: string;
}

export interface UpdateCityDto {
  id: string;
  name: string;
}

export interface DeleteCityDto {
  id: string;
}

export interface Variant {
  id: string;
  variant: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface CreateVariantDto {
  variant: string;
}

export interface DeleteVariantDto {
  id: string;
}

export interface CarVariant {
  id: string;
  color: string;
  imageUrl: string;
  carId: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  stateNumber: string;
  variants: CarVariant[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface CreateCarDto {
  brand: string;
  model: string;
  stateNumber: string;
}

export interface UpdateCarDto {
  id: string;
  imageUrl?: string;
  colors?: string[];
}

export interface DeleteCarDto {
  id: string;
}

export interface Tariff {
  id: string;
  type: string;
  price: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface CreateTariffDto {
  type: string;
  price: number;
}

export interface UpdateTariffDto {
  id: string;
  price: number;
}

export interface DeleteTariffDto {
  id: string;
}

export interface CreateCarVariantDto {
  color: string;
  /** @format binary */
  image: File;
}

export interface DeleteCarVariantDto {
  id: string;
}

export interface Order {
  id: string;
  status: string;
  /** @format date-time */
  startsAt: string;
  /** @format date-time */
  endsAt: string;
  tariff: Tariff;
  variant: Variant;
  car: Car;
  carVariant: CarVariant;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface CreateOrderDto {
  startsAt: string;
  endsAt: string;
  carId: string;
  carVariantId: string;
  cityId: string;
  variantId: string;
  tariffId: string;
}

export interface DeleteOrderDto {
  id: string;
}

export interface RegisterDto {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  fname: string;
  lname: string;
  email: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface UpdateUserDto {
  id: string;
  fname?: string;
  lname?: string;
}

export interface DeleteUserDto {
  id: string;
}

export interface Role {
  id: string;
  value: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Carsharing example
 * @version 1.0
 * @contact
 *
 * The carsharing API description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  uploads = {
    /**
     * No description
     *
     * @tags Common
     * @name AppControllerGetFile
     * @request GET:/uploads/{path}
     */
    appControllerGetFile: (path: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/uploads/${path}`,
        method: "GET",
        ...params,
      }),
  };
  cities = {
    /**
     * No description
     *
     * @tags Cities
     * @name CityControllerGetCities
     * @request GET:/cities
     */
    cityControllerGetCities: (params: RequestParams = {}) =>
      this.request<any, City[]>({
        path: `/cities`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cities
     * @name CityControllerCreateCity
     * @request POST:/cities
     * @secure
     */
    cityControllerCreateCity: (data: CreateCityDto, params: RequestParams = {}) =>
      this.request<City, any>({
        path: `/cities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cities
     * @name CityControllerUpdateCity
     * @request PATCH:/cities
     * @secure
     */
    cityControllerUpdateCity: (data: UpdateCityDto, params: RequestParams = {}) =>
      this.request<any, City>({
        path: `/cities`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cities
     * @name CityControllerGetCity
     * @request GET:/cities/{id}
     */
    cityControllerGetCity: (id: string, params: RequestParams = {}) =>
      this.request<any, City>({
        path: `/cities/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cities
     * @name CityControllerRemoveCity
     * @request DELETE:/cities/{id}
     * @secure
     */
    cityControllerRemoveCity: (id: string, params: RequestParams = {}) =>
      this.request<any, DeleteCityDto>({
        path: `/cities/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  variants = {
    /**
     * No description
     *
     * @tags Variants
     * @name VariantControllerGetVariants
     * @request GET:/variants
     * @secure
     */
    variantControllerGetVariants: (params: RequestParams = {}) =>
      this.request<any, Variant[]>({
        path: `/variants`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Variants
     * @name VariantControllerCreateVariant
     * @request POST:/variants
     * @secure
     */
    variantControllerCreateVariant: (data: CreateVariantDto, params: RequestParams = {}) =>
      this.request<Variant, any>({
        path: `/variants`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Variants
     * @name VariantControllerGetVariant
     * @request GET:/variants/{id}
     * @secure
     */
    variantControllerGetVariant: (id: string, params: RequestParams = {}) =>
      this.request<any, Variant>({
        path: `/variants/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Variants
     * @name VariantControllerRemoveVariant
     * @request DELETE:/variants/{id}
     * @secure
     */
    variantControllerRemoveVariant: (id: string, params: RequestParams = {}) =>
      this.request<any, DeleteVariantDto>({
        path: `/variants/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  cars = {
    /**
     * No description
     *
     * @tags Cars
     * @name CarControllerGetCars
     * @request GET:/cars
     */
    carControllerGetCars: (params: RequestParams = {}) =>
      this.request<any, Car[]>({
        path: `/cars`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cars
     * @name CarControllerCreateCar
     * @request POST:/cars
     * @secure
     */
    carControllerCreateCar: (data: CreateCarDto, params: RequestParams = {}) =>
      this.request<Car, any>({
        path: `/cars`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cars
     * @name CarControllerUpdateCar
     * @request PATCH:/cars
     * @secure
     */
    carControllerUpdateCar: (data: UpdateCarDto, params: RequestParams = {}) =>
      this.request<any, Car>({
        path: `/cars`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cars
     * @name CarControllerGetCar
     * @request GET:/cars/{id}
     */
    carControllerGetCar: (id: string, params: RequestParams = {}) =>
      this.request<any, Car>({
        path: `/cars/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cars
     * @name CarControllerRemoveCar
     * @request DELETE:/cars/{id}
     * @secure
     */
    carControllerRemoveCar: (id: string, params: RequestParams = {}) =>
      this.request<any, DeleteCarDto>({
        path: `/cars/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  tariffs = {
    /**
     * No description
     *
     * @tags Tariff
     * @name TariffControllerGetTariffs
     * @request GET:/tariffs
     * @secure
     */
    tariffControllerGetTariffs: (params: RequestParams = {}) =>
      this.request<any, Tariff[]>({
        path: `/tariffs`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tariff
     * @name TariffControllerCreateTariff
     * @request POST:/tariffs
     * @secure
     */
    tariffControllerCreateTariff: (data: CreateTariffDto, params: RequestParams = {}) =>
      this.request<Tariff, any>({
        path: `/tariffs`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tariff
     * @name TariffControllerUpdateTariff
     * @request PATCH:/tariffs
     * @secure
     */
    tariffControllerUpdateTariff: (data: UpdateTariffDto, params: RequestParams = {}) =>
      this.request<any, Tariff>({
        path: `/tariffs`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tariff
     * @name TariffControllerGetTariff
     * @request GET:/tariffs/{id}
     * @secure
     */
    tariffControllerGetTariff: (id: string, params: RequestParams = {}) =>
      this.request<any, Tariff>({
        path: `/tariffs/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tariff
     * @name TariffControllerRemoveTariff
     * @request DELETE:/tariffs/{id}
     * @secure
     */
    tariffControllerRemoveTariff: (id: string, params: RequestParams = {}) =>
      this.request<any, DeleteTariffDto>({
        path: `/tariffs/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  carVariants = {
    /**
     * No description
     *
     * @tags CarVariants
     * @name CarVariantControllerCreateVariant
     * @request POST:/car-variants/{id}
     * @secure
     */
    carVariantControllerCreateVariant: (id: string, data: CreateCarVariantDto, params: RequestParams = {}) =>
      this.request<CarVariant, any>({
        path: `/car-variants/${id}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CarVariants
     * @name CarVariantControllerRemoveVariant
     * @request DELETE:/car-variants/{id}
     * @secure
     */
    carVariantControllerRemoveVariant: (id: string, params: RequestParams = {}) =>
      this.request<any, DeleteCarVariantDto>({
        path: `/car-variants/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  orders = {
    /**
     * No description
     *
     * @tags Orders
     * @name OrderControllerGetOrders
     * @request GET:/orders
     * @secure
     */
    orderControllerGetOrders: (params: RequestParams = {}) =>
      this.request<any, Order[]>({
        path: `/orders`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrderControllerCreateOrder
     * @request POST:/orders
     * @secure
     */
    orderControllerCreateOrder: (data: CreateOrderDto, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/orders`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrderControllerGetOrder
     * @request GET:/orders/{id}
     * @secure
     */
    orderControllerGetOrder: (id: string, params: RequestParams = {}) =>
      this.request<any, Order>({
        path: `/orders/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrderControllerRemoveOrder
     * @request DELETE:/orders/{id}
     * @secure
     */
    orderControllerRemoveOrder: (id: string, params: RequestParams = {}) =>
      this.request<any, DeleteOrderDto>({
        path: `/orders/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @request POST:/auth/login
     */
    authControllerLogin: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/login`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRegister
     * @request POST:/auth/register
     */
    authControllerRegister: (data: RegisterDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UserControllerGetUsers
     * @request GET:/users
     * @secure
     */
    userControllerGetUsers: (params: RequestParams = {}) =>
      this.request<any, User[]>({
        path: `/users`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UserControllerUpdateUser
     * @request PATCH:/users
     * @secure
     */
    userControllerUpdateUser: (data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<any, User>({
        path: `/users`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UserControllerGetUser
     * @request GET:/users/{id}
     * @secure
     */
    userControllerGetUser: (id: string, params: RequestParams = {}) =>
      this.request<any, User>({
        path: `/users/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UserControllerRemoveUser
     * @request DELETE:/users/{id}
     * @secure
     */
    userControllerRemoveUser: (id: string, params: RequestParams = {}) =>
      this.request<any, DeleteUserDto>({
        path: `/users/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  roles = {
    /**
     * No description
     *
     * @tags Role
     * @name RoleControllerGetRoles
     * @request GET:/roles
     * @secure
     */
    roleControllerGetRoles: (params: RequestParams = {}) =>
      this.request<any, Role[]>({
        path: `/roles`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Role
     * @name RoleControllerGetRole
     * @request GET:/roles/{id}
     * @secure
     */
    roleControllerGetRole: (id: string, params: RequestParams = {}) =>
      this.request<any, Role>({
        path: `/roles/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Role
     * @name RoleControllerRemoveRole
     * @request DELETE:/roles/{id}
     * @secure
     */
    roleControllerRemoveRole: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/roles/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
