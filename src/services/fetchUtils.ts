export function makeOptions(method: string, body: object | null = null, addToken: boolean = false): RequestInit {
    const opts: RequestInit = {
      method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (body) opts.body = JSON.stringify(body);
    if (addToken) opts.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return opts;
  }
  
  export async function handleHttpErrors(res: Response) {
    if (!res.ok) {
      const errorResponse = await res.json();
      const msg = errorResponse.message || "No details provided";
      throw new Error(msg);
    }
    return res.json();
  }
  