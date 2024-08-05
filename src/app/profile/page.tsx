"use client";

import React, { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "../services/api";
import { ProfileData } from "../interfaces"; // Import từ file interfaces.ts
import { useRouter } from "next/navigation";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData>({
    iduser: 0, // Chuyển thành số
    name: "",
    dateofbirth: "",
    nationalidno: 0, // Giữ nguyên kiểu number
    phoneno: "",
    email: "",
    address: "",
    drivinglicense: "",
    password: "",
    // role: '',
    // wallet: 0, // Giữ nguyên kiểu number
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProfile();
        console.log("Fetched profile:", data);
        setProfileData(data.result);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: ["iduser", "nationalidno", "wallet"].includes(name)
        ? Number(value)
        : value, // Chuyển đổi giá trị thành số nếu cần thiết
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await updateProfile(profileData.iduser, profileData);
      router.back();
      console.log("Profile updated:", data);
      // Hiển thị thông báo thành công hoặc cập nhật giao diện người dùng
    } catch (error) {
      console.error("Error updating profile:", error);
      // Hiển thị thông báo lỗi cho người dùng
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="dateofbirth">Date of Birth:</label>
          <input
            type="date"
            id="dateofbirth"
            name="dateofbirth"
            value={profileData.dateofbirth}
            onChange={handleInputChange}
            placeholder="Enter your date of birth"
          />
        </div>
        <div>
          <label htmlFor="nationalidno">National ID No:</label>
          <input
            type="number"
            id="nationalidno"
            name="nationalidno"
            value={profileData.nationalidno}
            onChange={handleInputChange}
            placeholder="Enter your national ID number"
          />
        </div>
        <div>
          <label htmlFor="phoneno">Phone No:</label>
          <input
            type="text"
            id="phoneno"
            name="phoneno"
            value={profileData.phoneno}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={profileData.address}
            onChange={handleInputChange}
            placeholder="Enter your address"
          />
        </div>
        <div>
          <label htmlFor="drivinglicense">Driving License:</label>
          <input
            type="text"
            id="drivinglicense"
            name="drivinglicense"
            value={profileData.drivinglicense}
            onChange={handleInputChange}
            placeholder="Enter your driving license"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={profileData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
        </div>
        {/* <div>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={profileData.role}
            onChange={handleInputChange}
            placeholder="Enter your role"
          />
        </div>
        <div>
          <label htmlFor="wallet">Wallet:</label>
          <input
            type="number"
            id="wallet"
            name="wallet"
            value={profileData.wallet}
            onChange={handleInputChange}
            placeholder="Enter your wallet amount"
          />
        </div> */}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
