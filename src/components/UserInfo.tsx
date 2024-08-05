import { useRouter } from "next/navigation";

export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const getUser = async () => {
  const token = getToken();
  const response = await fetch("http://localhost:8080/user/myInfo", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};
