"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [userData, setUserData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUser();
        if (data.message === "Success") {
          setUserData(data.result);
        } else if (data.code === 1006) {
          console.log("Tai khoan chua xac thuc");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const getUser = async () => {
    const token = getToken();
    try {
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
    } catch (error) {
      router.push("/login");
    }
  };

  const displayUserData = (users: never[]) => {
    console.log(users);
    return <>{users.username}</>;
    // return users.map((user) => (
    //   <div key={user.id} className="user">
    //     <p>ID: {user.id}</p>
    //     <p>Username: {user.username}</p>
    //     <p>Address: {user.address || "N/A"}</p>
    //     <p>Date of Birth: {user.dob || "N/A"}</p>
    //     <p>First Name: {user.firstname || "N/A"}</p>
    //     <p>Last Name: {user.lastname || "N/A"}</p>
    //     <p>Phone: {user.phone || "N/A"}</p>
    //     <p>Roles: {user.roles.join(", ")}</p>
    //   </div>
    // ));
  };

  return (
    <div>
      Hello World!
      <div id="userData">{displayUserData(userData)}</div>
    </div>
  );
}
