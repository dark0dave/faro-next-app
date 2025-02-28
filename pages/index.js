import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    console.info("LOADING")
    try {
      const faro = initializeFaro({
          url: process.env.NEXT_PUBLIC_FARO_URL,
          app: {
            name: 'faro-next-app',
            version: '1.0.0',
            environment: 'production'
          },
          instrumentations: [
            // Mandatory, overwriting the instrumentations array would cause the default instrumentations to be omitted
            ...getWebInstrumentations(),
        
            // Initialization of the tracing package.
            // This packages is optional because it increases the bundle size noticeably. Only add it if you want tracing data.
            new TracingInstrumentation(),
          ],
        });

      console.info('hello world');

      // push log explicitly
      faro.api.pushLog(['hello world']);

      // push error manually
      faro.api.pushError(new Error('oh no'));
    } catch (e) {
      console.info(e)
    }
  }, []);
  return (
    <div>
      <h1>Hello Faro</h1>
    </div>
  );
}