import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces';

const pathMethods = ['get', 'post', 'put', 'patch', 'delete'] as const;

const generalResponses = {
  404: { description: 'Not found' },
  422: { description: 'Unprocessable entity' },
  500: { description: 'Server error' },
};

const authResponses = {
  401: { description: 'Not authenticated' },
  403: { description: 'Access denied' },
};

const deleteResponses = {
  204: { description: 'No content' },
};

const mediaResponses = {
  415: { description: 'Unsupported Media Type' },
};

export class SwaggerHelper {
  static setDefaultResponses(document: OpenAPIObject): void {
    for (const key of Object.keys(document.paths)) {
      for (const method of pathMethods) {
        // перебераємо методи з третього рядка і знаходимо сам роут
        const route = document.paths[key]?.[method];
        // знаходимо сам роут в нього є шлях document.paths та [key]?(ставимо ?-бо шлях може не мати методу) з 26 рядка та по [method] його викликаємо
        // console.log(method);
        if (route) {
          // Якщо роут є то йому кладаться generalResponses з п'ятого рядка
          Object.assign(route.responses, generalResponses);

          if (route.security) {
            Object.assign(route.responses, authResponses);
          }

          if (method === 'delete') {
            delete route.responses[200]; // видаляємо 200 респонс
            Object.assign(route.responses, deleteResponses);
          }
          if (method === 'post' || method === 'put' || method === 'patch') {
            // Додаємо mediaResponses для POST, PUT та PATCH методів
            Object.assign(route.responses, mediaResponses);
          }
        }
      }
    }
  }
}
