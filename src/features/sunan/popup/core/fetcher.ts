export interface PrefiewFetcher {
  url: string;
  text_content: string;
  response: Response;
}

export default async function prefiew_fetch(url: string): Promise<PrefiewFetcher> {
  const response = await fetch(url);

  if (!response.ok) throw Error('response of "' + url + '" is not ok.');

  const response_text = await response.text();
  
  return {
    response,
    text_content: response_text,
    url,
  };
}
