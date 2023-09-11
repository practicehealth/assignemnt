type ReportWebVitalsCallback = (metric: {
  name: string;
  value: number;
  id?: string;
  startTime?: number;
  duration?: number;
}) => void;

const reportWebVitals = (onPerfEntry: ReportWebVitalsCallback | undefined): void => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
