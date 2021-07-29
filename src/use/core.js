import axios from 'axios';
import Vue from 'vue';
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch,
} from '@vue/composition-api';
import { useLocalStorage } from '@vueuse/core';

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
});

const user = Vue.observable({
  value: null,
});

export function useUser() {
  const storedUser = useLocalStorage('user', null);
  return computed({
    get() {
      if (user.value === null) {
        user.value = JSON.parse(storedUser.value);
      }
      return user.value;
    },

    set(val) {
      user.value = val;
      storedUser.value = JSON.stringify(val);
    },
  });
}

export function useVM() {
  return getCurrentInstance()?.proxy;
}

export function useHttp() {
  const router = useRouter();

  async function request(promise) {
    try {
      return (await promise).data;
    } catch (e) {
      if (e.response.status === 401) {
        router.push({ name: '401' });
      }
      throw e;
    }
  }

  return {
    unwrapped: http,
    resolve(...paths) {
      if (!paths?.length) {
        return '';
      }
      return `${http.defaults.baseURL}/${paths.join('/')}`;
    },
    async request(config) {
      return request(http.request(config));
    },
    async get(url, config = null) {
      return request(http.get(url, config));
    },
    async delete(url, config = null) {
      return request(http.delete(url, config));
    },
    async post(url, data = null, config = null) {
      return request(http.post(url, data, config));
    },
    async put(url, data = null, config = null) {
      return request(http.put(url, data, config));
    },
  };
}

export function useRoute() {
  return useVM().$route;
}

export function useRouter() {
  return useVM().$router;
}

export function useForm(form) {
  const data = reactive({ ...form });
  const errors = reactive({ ...form });

  function clearForm() {
    Object.assign(data, form);
  }

  function clearErrors() {
    Object.keys(form).forEach((key) => {
      errors[key] = [];
    });
  }

  function setErrors(newErrors) {
    clearErrors();
    Object.assign(errors, newErrors);
  }

  clearErrors();
  return {
    form: data,
    errors,
    clearForm,
    clearErrors,
    setErrors,
  };
}

let categoriesCache = [];

export function useCategories() {
  const categories = ref([...categoriesCache]);
  if (categoriesCache.length === 0) {
    const client = useHttp();
    client.get('/categories/all')
      .then((data) => {
        categoriesCache = data;
        categories.value = [...data];
      });
  }
  return categories;
}

export function useQuery(url, params = {}, syncQuery = true) {
  const route = useRoute();
  const data = ref([]);
  const query = reactive({
    page: route.params?.page ?? 1,
    size: route.params?.size ?? 15,
    sort: ['-id', 'name'],
    ...params,
  });
  const meta = reactive(
    {
      totalPages: 1,
      totalItems: 0,
      loading: false,
      initialized: false,
    },
  );

  watch(
    query,
    (val) => fetchData(val),
    { deep: true },
  );

  const router = useRouter();
  const client = useHttp();

  async function fetchData(queryParams = {}) {
    meta.loading = true;
    try {
      const newParams = { ...query, ...queryParams };
      const res = await client.get(url, { params: newParams });

      data.value = res.data;
      Object.assign(meta, res.meta);
      query.page = res.meta.currentPage;
      query.size = res.meta.perPage;

      if (syncQuery) {
        await router.push({ query: newParams });
      }
    } finally {
      meta.loading = false;
    }
  }

  onMounted(async () => {
    await fetchData();
    meta.initialized = true;
  });

  return {
    data,
    meta,
    query,
    fetchData,
  };
}
