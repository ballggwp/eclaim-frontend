import useSWR, { KeyedMutator } from 'swr';

interface ErrorResponse { message: string; }

const fetcher = async ([url, token]: [string, string]) => {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    const err: ErrorResponse = await res.json();
    throw new Error(err.message);
  }
  return res.json();
};

export function useProtected<T = any>(
  path: string,
  token: string | null
): {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
  mutate: KeyedMutator<T>;
} {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  const swr = useSWR<T, Error>(token ? [url, token] : null, fetcher);

  return {
    data: swr.data,
    error: swr.error,
    loading: !swr.data && !swr.error,
    mutate: swr.mutate,      // now TS knows about mutate
  };
}
