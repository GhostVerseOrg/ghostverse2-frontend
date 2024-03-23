enum Options {
  CMS = 'cms',
}

type GetEnvUrl = {
  [key in Options]: string;
};

export const getUrlFromEnv = (): GetEnvUrl => {
  const fallbackUrl = '/';

  return {
    cms: process.env.NEXT_PUBLIC_STRAPI_API_URL || fallbackUrl,
  };
};
