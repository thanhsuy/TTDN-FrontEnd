"use client";

import React, { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "../services/api";
import { ProfileData } from "../interfaces";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Footer from "@/components/Footerowner";
import { getUser } from "@/components/UserInfo";
import Navbar from "../../components/Navbarowner";
import "../styles.css";
import "./profile.css";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ result: { name: string; role: string } } | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    iduser: 0,
    name: "",
    dateofbirth: "",
    nationalidno: 0,
    phoneno: "",
    email: "",
    address: "",
    drivinglicense: "",
    password: "",
    housenumber: "",
    ward: "",
    district: "",
    city: ""
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();

    const fetchData = async () => {
      try {
        const data = await fetchProfile();
        console.log("Fetched profile:", data);
        const addressParts = data.result.address.split(",");
        const addressReverse = addressParts.reverse();

        setProfileData({
          ...data.result,
          housenumber: addressReverse[3] || "",
          ward: addressReverse[2] || "",
          district: addressReverse[1] || "",
          city: addressReverse[0] || ""
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();

    // Open the Personal Information tab by default
    (document.getElementById("defaultOpen") as HTMLElement).click();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: ["iduser", "nationalidno", "wallet"].includes(name)
        ? Number(value)
        : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProfileData = {
        ...profileData,
        address: `${profileData.housenumber},${profileData.ward},${profileData.district},${profileData.city}`
      };
      const data = await updateProfile(profileData.iduser, updatedProfileData);
      router.back();
      console.log("Profile updated:", data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const openTab = (evt: React.MouseEvent<HTMLButtonElement>, tabName: string) => {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      (tabcontent[i] as HTMLElement).style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      (tablinks[i] as HTMLElement).className = tablinks[i].className.replace(" active", "");
    }
    (document.getElementById(tabName) as HTMLElement).style.display = "block";
    evt.currentTarget.className += " active";
  }

  return (
    <>
      <Head>
        <title>Wallet Details</title>
        <link rel="stylesheet" href="styles.css" />
      </Head>
      {user && <Navbar name={user.result.name} role={user.result.role} />}
      <div className="profile-container">
        <h2>My Profile</h2>
        <div className="tabs">
          <button className="tablinks" id="defaultOpen" onClick={(e) => openTab(e, 'PersonalInfo')}>Personal Information</button>
          <button className="tablinks" onClick={(e) => openTab(e, 'Security')}>Security</button>
        </div>
        <div id="PersonalInfo" className="tabcontent">
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateofbirth">Date of Birth:</label>
              <input
                type="date"
                id="dateofbirth"
                name="dateofbirth"
                value={profileData.dateofbirth}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={profileData.city}
                onChange={handleInputChange}
                placeholder="Enter your city"
              />
            </div>
            <div className="form-group">
              <label htmlFor="district">District:</label>
              <input
                type="text"
                id="district"
                name="district"
                value={profileData.district}
                onChange={handleInputChange}
                placeholder="Enter your district"
              />
            </div>
            <div className="form-group">
              <label htmlFor="ward">Ward:</label>
              <input
                type="text"
                id="ward"
                name="ward"
                value={profileData.ward}
                onChange={handleInputChange}
                placeholder="Enter your ward"
              />
            </div>
            <div className="form-group">
              <label htmlFor="housenumber">House Number:</label>
              <input
                type="text"
                id="housenumber"
                name="housenumber"
                value={profileData.housenumber}
                onChange={handleInputChange}
                placeholder="Enter your house number"
              />
            </div>
            <div className="form-group">
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
            <div className="form-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={() => router.back()}>Cancel</button>
            </div>
          </form>
        </div>
        <div id="Security" className="tabcontent">
          <form className="profile-form">
            <div className="form-group">
              <label htmlFor="password">New Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                // value={profileData.password}
                onChange={handleInputChange}
                placeholder="Enter your new password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmpassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                placeholder="Confirm your new password"
              />
            </div>
            <div className="form-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={() => router.back()}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProfilePage;
