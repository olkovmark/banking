const url = "http://localhost:4000";
export const Login = async (email: string, password: string) => {
  const res = await fetch(url + "/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) return await res.json();
  throw await res.json();
};

export const Registration = async (email: string, password: string) => {
  const res = await fetch(url + "/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) return await res.json();
  throw await res.json();
};

export const SendCode = async (email: string, code: string) => {
  const res = await fetch(url + "/signup-confirm", {
    method: "POST",
    body: JSON.stringify({ email, code }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) return await res.json();
  throw await res.json();
};

export const RecoveryPassword = async (email: string) => {
  const res = await fetch(url + "/recovery", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) return await res.json();
  throw await res.json();
};

export const SendRecoveryCode = async (password: string, code: string) => {
  const res = await fetch(url + "/recovery-confirm", {
    method: "POST",
    body: JSON.stringify({ password, code }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) return await res.json();
  throw await res.json();
};

export const getBalance = async (token: string) => {
  const res = await fetch(url + "/balance", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  if (res.ok) return await res.json();
  throw await res;
};
