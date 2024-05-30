import got from 'got';

type PackageInformation = any;
interface NpmDepResponse {
  versions: Record<string, PackageInformation>;
}

export const fetchAllVersions = async (dependency: string) => {
  const res = await got(`https://registry.npmjs.org/${dependency}`, {
    retry: { limit: 3 },
    responseType: 'json',
  }).json<NpmDepResponse>();
  return Object.keys(res.versions);
};

interface NpmDistTagsResponse {
  latest: string;
  canary: string;
}

export const fetchDistTags = async (dependency: string) => {
  return got(`https://registry.npmjs.org/-/package/${dependency}/dist-tags`, {
    retry: { limit: 3 },
    responseType: 'json',
  }).json<NpmDistTagsResponse>();
};

export const fetchLatestDistVersion = async (dependency: string) => {
  const res = await fetchDistTags(dependency);
  return res.latest;
};
